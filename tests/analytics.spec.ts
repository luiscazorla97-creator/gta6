import {test,expect} from '@playwright/test';
import {analyticsConsentKey,analyticsConsentLifetime} from '../src/analytics';
const key=analyticsConsentKey;
const labels={es:['Tu privacidad en FansGTA','Aceptar Analytics','Rechazar Analytics','Preferencias de Analytics'],en:['Your privacy on FansGTA','Accept Analytics','Reject Analytics','Analytics preferences'],fr:['Votre confidentialité sur FansGTA','Accepter Analytics','Refuser Analytics','Préférences Analytics']} as const;
const isAnalytics=(url:string)=>/googletagmanager\.com\/gtag\/js|google-analytics\.com/.test(url);

test.beforeEach(async({context})=>{
 await context.route('https://abscloud.org/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await context.route('https://bauval.org/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await context.route('https://pagead2.googlesyndication.com/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await context.route('https://www.youtube-nocookie.com/**',r=>r.fulfill({status:200,contentType:'text/html',body:'<html><body>Player test</body></html>'}));
 await context.route('https://www.googletagmanager.com/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:'document.cookie="_ga=accepted-test; path=/";document.cookie="_ga_JXHZ3W8WHP=accepted-test; path=/";fetch("https://www.google-analytics.com/g/collect?tid=G-JXHZ3W8WHP");'}));
 await context.route('https://www.google-analytics.com/**',r=>r.fulfill({status:204,headers:{'access-control-allow-origin':'*'},body:''}));
});

test('static pages cannot execute or preload Analytics before the visitor chooses',async({request})=>{
 for(const path of ['/es/','/en/','/fr/','/es/noticias/gta-6-autobuses-trenes-transporte-edge/']){
  const response=await request.get(path);expect(response.status()).toBe(200);const html=await response.text();
  expect(html).not.toContain('src="https://www.googletagmanager.com/gtag/js');expect(html).not.toContain("gtag('config'");expect(html).not.toContain('href="https://www.googletagmanager.com');
  expect(html).toContain('adsbygoogle.js?client=ca-pub-1382859681401211');
 }
});

test('first visits get translated accept/reject controls and make no Analytics requests',async({page,context})=>{
 const requests:string[]=[];page.on('request',r=>{if(isAnalytics(r.url()))requests.push(r.url());});
 await context.addCookies([{name:'_ga',value:'legacy-unconsented',url:'http://127.0.0.1:4173'}]);
 for(const locale of ['es','en','fr'] as const){
  await page.goto('/'+locale+'/');const [title,accept,reject]=labels[locale],banner=page.getByRole('region',{name:title});
  await expect(banner).toBeVisible();await expect(banner.getByRole('button',{name:accept,exact:true})).toBeVisible();await expect(banner.getByRole('button',{name:reject,exact:true})).toBeVisible();
  await expect(page.locator('#fansgta-ga4')).toHaveCount(0);expect(requests).toEqual([]);
  expect((await context.cookies()).filter(c=>/^_ga(?:_|$)/.test(c.name))).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  for(const button of await banner.getByRole('button').all()){const box=(await button.boundingBox())!;expect(box.y).toBeGreaterThanOrEqual(0);expect(box.y+box.height).toBeLessThanOrEqual(page.viewportSize()!.height);}
 }
 await page.locator('.analytics-consent').screenshot({path:`test-results/analytics-consent-${test.info().project.name}.png`});
});

test('rejection survives reloads and language changes while Analytics stays blocked',async({page})=>{
 const requests:string[]=[];page.on('request',r=>{if(isAnalytics(r.url()))requests.push(r.url());});
 await page.goto('/es/');await page.getByRole('button',{name:labels.es[2],exact:true}).click();await expect(page.locator('.analytics-consent')).toHaveCount(0);
 expect(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)!).choice,key)).toBe('rejected');
 await page.reload();await page.getByRole('combobox',{name:'Idioma',exact:true}).selectOption('en');
 await expect(page).toHaveURL('/en/');await expect(page.locator('.analytics-consent')).toHaveCount(0);await expect(page.locator('#fansgta-ga4')).toHaveCount(0);expect(requests).toEqual([]);
 await page.goto('/en/cookies/');await expect(page.locator('.analytics-settings')).toContainText('Rejected. Analytics is blocked.');
 await page.locator('.analytics-settings').getByRole('button',{name:labels.en[3],exact:true}).click();await expect(page.locator('.analytics-consent')).toBeFocused();await page.getByRole('button',{name:labels.en[2],exact:true}).click();expect(requests).toEqual([]);
});

test('acceptance loads one SDK/config, persists across pages and does not duplicate page-view tracking',async({page})=>{
 const requests:string[]=[];page.on('request',r=>{if(isAnalytics(r.url()))requests.push(r.url());});
 await page.goto('/es/');await page.getByRole('button',{name:labels.es[1],exact:true}).click();
 await expect.poll(()=>requests.filter(u=>u.includes('/gtag/js')).length).toBe(1);await expect.poll(()=>requests.filter(u=>u.includes('/g/collect')).length).toBe(1);
 const queue=()=>page.evaluate(()=>((window as unknown as {dataLayer:unknown[][]}).dataLayer??[]));
 expect((await queue()).filter(x=>x[0]==='config'&&x[1]==='G-JXHZ3W8WHP')).toHaveLength(1);
 expect((await queue()).filter(x=>x[0]==='event'&&x[1]==='page_view')).toHaveLength(0);
 expect((await queue()).filter(x=>x[0]==='consent')).toEqual([['consent','default',{analytics_storage:'denied'}],['consent','update',{analytics_storage:'granted'}]]);
 await page.locator('footer').getByRole('button',{name:labels.es[3],exact:true}).click();await page.getByRole('button',{name:labels.es[1],exact:true}).click();
 expect(requests.filter(u=>u.includes('/gtag/js'))).toHaveLength(1);expect((await queue()).filter(x=>x[0]==='config')).toHaveLength(1);
 await page.getByRole('combobox',{name:'Idioma',exact:true}).selectOption('fr');await expect(page).toHaveURL('/fr/');
 await expect(page.locator('#fansgta-ga4')).toHaveCount(1);await expect(page.locator('.analytics-consent')).toHaveCount(0);
 expect((await queue()).filter(x=>x[0]==='config')).toHaveLength(1);
});

test('withdrawal stops the SDK after reload and clears host and parent-domain Analytics cookies only',async({page,context,request})=>{
 // Route real production-origin URLs to the local release build; no TLS bypass.
 await page.route('https://fansgta.com/**',async r=>{const u=new URL(r.request().url());await r.fulfill({response:await request.get('http://127.0.0.1:4173'+u.pathname+u.search)});});
 await page.goto('https://fansgta.com/es/');await page.getByRole('button',{name:labels.es[1],exact:true}).click();await expect(page.locator('#fansgta-ga4')).toHaveCount(1);
 await expect.poll(async()=>(await context.cookies()).some(c=>c.name==='_ga')).toBe(true);
 await context.addCookies([{name:'_ga_PARENT_TEST',value:'old',domain:'.fansgta.com',path:'/'},{name:'site_setting',value:'keep',domain:'.fansgta.com',path:'/'}]);
 await page.locator('footer').getByRole('button',{name:labels.es[3],exact:true}).click();
 const requests:string[]=[];page.on('request',r=>{if(isAnalytics(r.url()))requests.push(r.url());});
 await Promise.all([page.waitForEvent('load'),page.getByRole('button',{name:labels.es[2],exact:true}).click()]);
 await expect(page.locator('#fansgta-ga4')).toHaveCount(0);await expect(page.locator('.analytics-consent')).toHaveCount(0);expect(requests).toEqual([]);
 const cookies=await context.cookies();expect(cookies.filter(c=>/^_ga(?:_|$)/.test(c.name))).toEqual([]);expect(cookies.some(c=>c.name==='site_setting'&&c.value==='keep')).toBe(true);
 await page.unrouteAll({behavior:'wait'});await page.close();
});

test('withdrawal in one tab stops Analytics in another open tab',async({page,context})=>{
 await page.goto('/es/');await page.getByRole('button',{name:labels.es[1],exact:true}).click();await expect(page.locator('#fansgta-ga4')).toHaveCount(1);
 const other=await context.newPage();await other.goto('/en/');await expect(other.locator('#fansgta-ga4')).toHaveCount(1);
 await page.locator('footer').getByRole('button',{name:labels.es[3],exact:true}).click();await page.getByRole('button',{name:labels.es[2],exact:true}).click();
 await expect(page.locator('#fansgta-ga4')).toHaveCount(0);await expect(other.locator('#fansgta-ga4')).toHaveCount(0);
 await expect(other.locator('.analytics-consent')).toHaveCount(0);await other.close();
});

test('expired, malformed and future-dated records cannot activate Analytics',async({page})=>{
 const requests:string[]=[];page.on('request',r=>{if(isAnalytics(r.url()))requests.push(r.url());});await page.goto('/es/');
 for(const record of ['not JSON',JSON.stringify({choice:'accepted',savedAt:Date.now()-analyticsConsentLifetime-1000}),JSON.stringify({choice:'accepted',savedAt:Date.now()+86400000}),JSON.stringify({choice:'yes',savedAt:Date.now()})]){
  await page.evaluate(({key,record})=>localStorage.setItem(key,record),{key,record});await page.reload();await expect(page.locator('.analytics-consent')).toBeVisible();await expect(page.locator('#fansgta-ga4')).toHaveCount(0);
 }
 expect(requests).toEqual([]);
});

test('blocked storage keeps the page usable and applies a choice only to the current page',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Storage blocked','SecurityError');}}));
 await page.goto('/es/');await expect(page.locator('.analytics-consent')).toBeVisible();await expect(page.locator('#fansgta-ga4')).toHaveCount(0);
 await page.getByRole('button',{name:labels.es[1],exact:true}).click();await expect(page.locator('#fansgta-ga4')).toHaveCount(1);await expect(page.locator('.analytics-save-notice')).toBeVisible();
 await page.goto('/fr/');await expect(page.locator('.analytics-consent')).toBeVisible();await expect(page.locator('#fansgta-ga4')).toHaveCount(0);
 await page.getByRole('button',{name:labels.fr[2],exact:true}).click();await expect(page.locator('#fansgta-ga4')).toHaveCount(0);expect(errors).toEqual([]);
});
