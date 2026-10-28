import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import type { Page, Route } from '@playwright/test';
import { adUnits } from '../src/ads/config';
import type { AdUnitName } from '../src/ads/config';

const article='/es/noticias/gta-6-19-november-2026/';
const requests=new WeakMap<Page,string[]>();
const fixtureOrigin='https://fixtures.fansgta.test';
const policy=readFileSync(new URL('../public/_headers',import.meta.url),'utf8').match(/^\s+Content-Security-Policy:\s*(.+)$/m)?.[1];
if(!policy)throw new Error('Advertising tests require the deployed Content-Security-Policy');

// These are representative provider bootstraps, never real creatives. They exercise
// origin/storage access, synchronous document.write and nested remote scripts.
function bootstrap(name:AdUnitName){
 const unit=adUnits[name];
 const probe=`if(window!==top||top.location.origin!==location.origin)throw new Error('Unexpected advertising wrapper');localStorage.setItem('fansgta:test-ad-storage','ok');document.cookie='fansgta_test_ad=ok; path=/; SameSite=Lax';if(!document.cookie.includes('fansgta_test_ad=ok'))throw new Error('Cookie access unavailable');`;
 if(name==='native')return `(()=>{${probe}const target=document.getElementById('container-${unit.key}');if(!target)throw new Error('Native target does not exist');target.dataset.fixtureStorage='ok';target.innerHTML='<div data-fixture-native style="height:420px">Native fixture content</div>';})()`;
 const creative=`<iframe data-fixture-unit="${name}" title="Fixture creative ${name}" width="${unit.width}" height="${unit.height}" src="${fixtureOrigin}/creative/${name}"></iframe>`;
 const nested=`<script src="${fixtureOrigin}/nested/${name}.js"></script>`;
 return `(()=>{${probe}const unit=window.atOptions;if(!unit||unit.key!=='${unit.key}'||unit.width!==${unit.width}||unit.height!==${unit.height})throw new Error('Wrong banner configuration');const target=document.currentScript.closest('.ad-provider');target.dataset.fixtureStorage='ok';target.dataset.fixtureKey=unit.key;document.write(${JSON.stringify(creative+nested)});})()`;
}
async function provider(route:Route){
 const key=new URL(route.request().url()).pathname.split('/').pop();
 const name=(Object.keys(adUnits) as AdUnitName[]).find(name=>adUnits[name].key===key);
 if(!name)throw new Error('Unexpected provider URL: '+route.request().url());
 await route.fulfill({status:200,contentType:'application/javascript',body:bootstrap(name)});
}
async function rendered(page:Page,name:AdUnitName){
 const slot=page.locator(`.ad-slot-${name}`);
 await slot.scrollIntoViewIfNeeded();
 if(name==='native'){
  await expect(slot.locator('[data-fixture-native]')).toBeVisible();
  await expect(slot.locator('iframe')).toHaveCount(0);
 }else{
  await expect(slot.locator(`iframe[data-fixture-unit="${name}"]`)).toHaveCount(1);
  await expect(slot.locator('.ad-provider')).toHaveAttribute('data-fixture-nested',adUnits[name].key);
 }
 await expect(slot.locator('[data-fixture-storage="ok"]')).toHaveCount(1);
 return slot;
}

test.beforeEach(async({page,browserName})=>{
 requests.set(page,[]);
 page.on('request',request=>requests.get(page)!.push(request.url()));
 // Vite preview does not apply Pages' _headers. Enforce the production CSP here
 // so passing fixtures cannot conceal a deployment-only script/frame block.
 await page.route('http://127.0.0.1:4173/**',async route=>{
  if(route.request().resourceType()!=='document')return route.continue();
  const response=await route.fetch();
  // WebKit upgrades even loopback assets, but this preview server uses HTTP.
  // Keep all resource restrictions; production retains the HTTPS upgrade too.
  const previewPolicy=browserName==='webkit'?policy!.replace(/;?\s*upgrade-insecure-requests\b/,''):policy!;
  await route.fulfill({response,headers:{...response.headers(),'content-security-policy':previewPolicy}});
 });
 await page.route('https://www.youtube-nocookie.com/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<html><body>Player fixture</body></html>'}));
 await page.route('https://bauval.org/**',provider);
 await page.route(`${fixtureOrigin}/creative/**`,route=>route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><html><body>Fixture creative</body></html>'}));
 await page.route(`${fixtureOrigin}/nested/**`,async route=>{
  const name=new URL(route.request().url()).pathname.split('/').pop()!.replace('.js','') as AdUnitName;
  await route.fulfill({status:200,contentType:'application/javascript',body:`if(!window.atOptions||window.atOptions.key!=='${adUnits[name].key}')throw new Error('Nested script lost unit configuration');document.currentScript.closest('.ad-provider').dataset.fixtureNested='${adUnits[name].key}';`});
 });
 await page.route('https://abscloud.org/**',route=>route.abort());
});
test.afterEach(async({page})=>{
 expect(requests.get(page)!.filter(url=>/abscloud\.org|\/ads\//.test(url))).toEqual([]);
});

test('banners load automatically without acceptance UI even with a legacy record',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('fansgta:ad-consent',JSON.stringify({choice:'rejected',version:1,expiresAt:Date.now()+86400000})));
 await page.goto(article);
 await expect(page.locator('.ad-consent')).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Aceptar publicidad',exact:true})).toHaveCount(0);
 await rendered(page,'rectangle');
 await page.goto('/es/cookies/');
 await expect(page.locator('.ad-information')).toContainText('automáticamente');
 await expect(page.getByRole('button',{name:'Rechazar publicidad',exact:true})).toHaveCount(0);
});

test('direct units render under production CSP with storage, nested writes and no duplicates',async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(article);
 // The lower native placement must not bootstrap before it approaches the viewport.
 expect(requests.get(page)!.some(url=>url===`https://bauval.org/21/${adUnits.native.key}`)).toBe(false);
 const mobile=info.project.name==='mobile';
 const units:AdUnitName[]=mobile?['mobile','rectangle','native']:['leaderboard','sidebar','rectangle','native'];
 for(const name of units){
  const slot=await rendered(page,name);
  if(name!=='native'){
   const frame=slot.locator('iframe');
   await expect(frame).not.toHaveAttribute('sandbox');
   await expect(frame).toHaveAttribute('src',`${fixtureOrigin}/creative/${name}`);
  }
 }
 const urls=requests.get(page)!.filter(url=>/^https:\/\/bauval\.org\/(21|22)\/[a-f0-9]+$/.test(url));
 expect(urls).toHaveLength(units.length);expect(new Set(urls).size).toBe(units.length);
 await expect(page.locator(`.ad-slot-${mobile?'leaderboard':'mobile'} script`)).toHaveCount(0);
 if(mobile)await expect(page.locator('.ad-slot-sidebar script')).toHaveCount(0);
 await expect.poll(()=>page.evaluate(()=>Object.prototype.hasOwnProperty.call(window,'atOptions'))).toBe(false);
 const native=page.locator('.ad-slot-native .ad-reserved');
 expect((await native.boundingBox())!.height).toBeGreaterThanOrEqual(420);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(errors).toEqual([]);
});

test('narrow screens skip fixed banners that do not fit and keep native fluid',async({page})=>{
 await page.setViewportSize({width:320,height:800});
 await page.goto(article);
 await rendered(page,'native');
 await expect(page.locator('.ad-slot-mobile script')).toHaveCount(0);
 await expect(page.locator('.ad-slot-rectangle script')).toHaveCount(0);
 expect(requests.get(page)!.filter(url=>url.startsWith('https://bauval.org/'))).toEqual([`https://bauval.org/21/${adUnits.native.key}`]);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('failed bootstrap releases the writer queue and preserves the public document',async({page},info)=>{
 await page.addInitScript(()=>{(window as unknown as {fixtureOriginalWrite:typeof document.write}).fixtureOriginalWrite=document.write;});
 const first=info.project.name==='mobile'?'mobile':'leaderboard';
 await page.route(`https://bauval.org/22/${adUnits[first].key}`,route=>route.fulfill({status:403,contentType:'application/javascript',body:''}));
 await page.goto(article);
 const initial=page.locator(`.ad-slot-${first}`);await initial.scrollIntoViewIfNeeded();
 await expect(initial.locator('[role=status]')).toHaveText('Anuncio temporalmente no disponible');
 await expect(initial.locator('iframe')).toHaveCount(0);
 await rendered(page,'rectangle');
 await rendered(page,'native');
 await expect.poll(()=>page.evaluate(()=>document.write===(window as unknown as {fixtureOriginalWrite:typeof document.write}).fixtureOriginalWrite)).toBe(true);
 await expect.poll(()=>page.evaluate(()=>Object.prototype.hasOwnProperty.call(window,'atOptions'))).toBe(false);
 await expect(page.getByRole('heading',{level:1})).toBeVisible();
 await expect(page.locator('footer')).toBeVisible();
});

test('a runtime exception after HTTP 200 reports failure and releases the next unit',async({page},info)=>{
 await page.addInitScript(()=>{(window as unknown as {fixtureOriginalWrite:typeof document.write}).fixtureOriginalWrite=document.write;});
 const first=info.project.name==='mobile'?'mobile':'leaderboard';
 await page.route(`https://bauval.org/22/${adUnits[first].key}`,route=>route.fulfill({status:200,contentType:'application/javascript',body:"throw new Error('Fixture runtime bootstrap failure');"}));
 await page.goto(article);
 const initial=page.locator(`.ad-slot-${first}`);await initial.scrollIntoViewIfNeeded();
 await expect(initial.locator('[role=status]')).toHaveText('Anuncio temporalmente no disponible');
 await expect(initial.locator('.ad-provider')).toHaveAttribute('data-ad-state','error');
 await expect(initial.locator('iframe')).toHaveCount(0);
 await rendered(page,'rectangle');
 await rendered(page,'native');
 await expect.poll(()=>page.evaluate(()=>document.write===(window as unknown as {fixtureOriginalWrite:typeof document.write}).fixtureOriginalWrite)).toBe(true);
 await expect.poll(()=>page.evaluate(()=>Object.prototype.hasOwnProperty.call(window,'atOptions'))).toBe(false);
 await expect(page.getByRole('heading',{level:1})).toBeVisible();
});

test('an unrelated page exception during a pending bootstrap does not mark the ad failed',async({page},info)=>{
 const first=info.project.name==='desktop'?'leaderboard':'mobile';
 let release:()=>void=()=>{};
 const gate=new Promise<void>(resolve=>{release=resolve;});
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.route(`https://bauval.org/22/${adUnits[first].key}`,async route=>{await gate;await provider(route);});
 try{
  await page.goto(article);
  const slot=page.locator(`.ad-slot-${first}`);await slot.scrollIntoViewIfNeeded();
  await expect(slot.locator('.ad-provider')).toHaveAttribute('data-ad-state','loading');
  await page.evaluate(()=>{window.setTimeout(()=>{throw new Error('Unrelated application timer failure');},0);});
  await expect.poll(()=>errors.some(message=>message.includes('Unrelated application timer failure'))).toBe(true);
  await expect(slot.locator('[role=status]')).toHaveCount(0);
  release();
  await rendered(page,first);
  await expect(slot.locator('.ad-provider')).toHaveAttribute('data-ad-state','loaded');
  await expect(slot.locator('[role=status]')).toHaveCount(0);
 }finally{release();}
});

test('a secondary script failure does not declare an inserted creative unavailable',async({page},info)=>{
 const first=info.project.name==='desktop'?'leaderboard':'mobile';
 await page.route(`${fixtureOrigin}/nested/${first}.js`,route=>route.fulfill({status:403,contentType:'application/javascript',body:''}));
 await page.goto(article);
 const slot=page.locator(`.ad-slot-${first}`);await slot.scrollIntoViewIfNeeded();
 await expect(slot.locator('iframe[data-fixture-unit]')).toHaveCount(1);
 await expect(slot.locator('.ad-provider')).toHaveAttribute('data-ad-state','loaded');
 await expect(slot.locator('[role=status]')).toHaveCount(0);
 await rendered(page,'rectangle');
});

test('opt-in diagnostics identify a bootstrap download failure and stay hidden by default',async({page},info)=>{
 const first=info.project.name==='desktop'?'leaderboard':'mobile';
 const url=`https://bauval.org/22/${adUnits[first].key}`;
 await page.route(url,route=>route.fulfill({status:403,contentType:'application/javascript',body:''}));
 await page.goto(article);
 await expect(page.getByRole('complementary',{name:'Diagnóstico de publicidad'})).toHaveCount(0);
 await page.goto(article+'?ads-debug=1');
 const slot=page.locator(`.ad-slot-${first}`);await slot.scrollIntoViewIfNeeded();
 await expect(slot.locator('[role=status]')).toBeVisible();
 const report=page.getByLabel('Informe para seleccionar y copiar');
 await expect(report).toHaveValue(new RegExp(`${first}.*${adUnits[first].id}.*Error al cargar el script`));
 await expect(report).toHaveValue(new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('resizing away and back preserves the rendered provider subtree without reloading it',async({page},info)=>{
 const initialViewport=page.viewportSize()!;
 const name=info.project.name==='mobile'?'mobile':'leaderboard';
 await page.goto(article);
 const slot=await rendered(page,name);
 const creative=slot.locator(`iframe[data-fixture-unit="${name}"]`);
 const original=await creative.elementHandle();
 expect(original).not.toBeNull();
 await page.setViewportSize({width:info.project.name==='mobile'?1440:390,height:initialViewport.height});
 await expect(slot).not.toHaveClass(/ad-slot-enabled/);
 await expect(slot.locator('.ad-reserved')).toBeHidden();
 await expect(creative).toHaveCount(1);
 await page.setViewportSize(initialViewport);
 await expect(slot).toHaveClass(/ad-slot-enabled/);
 await slot.scrollIntoViewIfNeeded();
 await expect(creative).toBeVisible();
 expect(await creative.evaluate((node,previous)=>node===previous,original)).toBe(true);
 expect(requests.get(page)!.filter(url=>url===`https://bauval.org/22/${adUnits[name].key}`)).toHaveLength(1);
 await expect(slot.locator('.ad-provider')).toHaveAttribute('data-fixture-nested',adUnits[name].key);
});

test('the old opaque sandbox blocks storage while the direct provider has its page origin',async({page})=>{
 await page.goto(article);
 await rendered(page,'rectangle');
 const result=await page.evaluate(()=>new Promise<string>((resolve,reject)=>{
  const frame=document.createElement('iframe');frame.sandbox.add('allow-scripts');
  const timeout=window.setTimeout(()=>{frame.remove();reject(new Error('Sandbox probe did not respond'));},4000);
  const listener=(event:MessageEvent)=>{
   if(event.source!==frame.contentWindow||event.data?.type!=='fansgta-sandbox-probe')return;
   clearTimeout(timeout);window.removeEventListener('message',listener);frame.remove();resolve(event.data.result);
  };
  window.addEventListener('message',listener);
  frame.srcdoc=`<script>let result='unexpected success';try{localStorage.getItem('fansgta:test-ad-storage')}catch(error){result=error.name}parent.postMessage({type:'fansgta-sandbox-probe',result},'*')<\/script>`;
  document.body.append(frame);
 }));
 expect(result).toBe('SecurityError');
});

test('public markup and sitemap contain no disabled popunder or retired ad wrapper URLs',async({request})=>{
 const html=await (await request.get(article)).text();
 expect(html).toContain('BlogPosting');expect(html).toContain('index,follow');
 expect(html).not.toContain('abscloud.org');expect(html).not.toMatch(/src="\/ads\//);
 const sitemap=await (await request.get('/sitemap.xml')).text();
 expect(sitemap).not.toContain('/ads/');
});
