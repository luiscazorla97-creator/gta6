import {test,expect,type Page} from '@playwright/test';
import {adUnits} from '../src/ads/config';
import type {AdUnitName} from '../src/ads/config';

async function mockBanners(page:Page){
 for(const host of ['https://abscloud.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await page.route('https://www.youtube-nocookie.com/**',r=>r.fulfill({status:200,contentType:'text/html',body:'<html><body>Player fixture</body></html>'}));
 await page.route('https://bauval.org/**',r=>{
  const name=(Object.keys(adUnits) as AdUnitName[]).find(n=>r.request().url().endsWith(adUnits[n].key))!;
  const u=adUnits[name];
  const body=name==='native'?`document.getElementById('container-${u.key}').textContent='Native fixture';`:`if(window.atOptions.key!=='${u.key}')throw Error('Unit race');document.write('<iframe title="Banner fixture" width="${u.width}" height="${u.height}" src="about:blank"></iframe>');`;
  return r.fulfill({status:200,contentType:'application/javascript',body});
 });
}

test('top, bottom and fitting side placements load automatically while Analytics remains optional',async({page},info)=>{
 const desktop=info.project.name==='desktop';if(desktop)await page.setViewportSize({width:1920,height:1000});
 const requests:string[]=[];page.on('request',r=>requests.push(r.url()));
 await mockBanners(page);
 for(const path of ['/es/','/en/news/','/fr/cookies/','/es/noticias/gta-6-autobuses-trenes-transporte-edge/']){
  await page.goto(path);const unit=desktop?'leaderboard':'mobile';
  for(const position of ['top','bottom']){
   const band=page.locator(`[data-ad-placement="${position}"]`);await expect(band).toHaveCount(1);
   await expect(band.locator(`.ad-slot-${unit} iframe`)).toHaveCount(1);
   await expect(band.locator(`.ad-slot-${desktop?'mobile':'leaderboard'} script`)).toHaveCount(0);
  }
  const content=(await page.locator('.site-page').boundingBox())!;
  for(const side of ['left','right']){
   const rail=page.locator(`[data-ad-placement="${side}"]`);await expect(rail).toHaveCount(1);
   if(desktop){await expect(rail.locator('iframe')).toHaveCount(1);await expect(rail.locator('iframe')).toHaveAttribute('width','160');await expect(rail.locator('iframe')).toHaveAttribute('height','600');await expect(rail.locator('script').first()).toHaveAttribute('src','https://bauval.org/22/83b265326d039193990417c5911eaf72');const box=(await rail.boundingBox())!;if(side==='left')expect(box.x+box.width).toBeLessThanOrEqual(content.x);else expect(box.x).toBeGreaterThanOrEqual(content.x+content.width);}
   else {await expect(rail).toBeHidden();await expect(rail.locator('script')).toHaveCount(0);}
  }
  expect(await page.locator(`#container-${adUnits.native.key}`).count()).toBeLessThanOrEqual(1);
  await expect(page.locator('.ad-consent')).toHaveCount(0);await expect(page.locator('#fansgta-ga4')).toHaveCount(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(path==='/es/'){
   await expect(page.locator('.analytics-consent')).toBeVisible();await page.getByRole('button',{name:'Rechazar Analytics',exact:true}).click();
   await expect(page.locator(`[data-ad-placement="top"] .ad-slot-${unit} iframe`)).toHaveCount(1);
   await expect(page.locator(`[data-ad-placement="bottom"] .ad-slot-${unit} iframe`)).toHaveCount(1);
   await page.screenshot({path:`test-results/ad-placements-${info.project.name}.png`});
  }
 }
 expect(requests.some(u=>u.includes('abscloud.org'))).toBe(false);expect(requests.some(u=>u.includes('googletagmanager.com/gtag/js'))).toBe(false);
});

for(const width of [390,1024,1279,1280,1366,1440,1600,1920]){
 test(`side columns reserve space and load only when fitting at ${width}px`,async({page},info)=>{
  test.skip(info.project.name!=='desktop','Desktop viewport boundary coverage');
  await page.setViewportSize({width,height:1000});
  await mockBanners(page);
  const requests:string[]=[];page.on('request',r=>requests.push(r.url()));
  for(const path of ['/es/','/es/noticias/gta-6-autobuses-trenes-transporte-edge/']){
   await page.goto(path);
   const center=(await page.locator('.site-page').boundingBox())!;
   for(const side of ['left','right']){
    const rail=page.locator(`[data-ad-placement="${side}"]`);
    if(width<1280){await expect(rail).toBeHidden();await expect(rail.locator('script')).toHaveCount(0);continue;}
    await expect(rail).toBeVisible();await expect(rail.locator('iframe')).toHaveCount(1);
    const frame=rail.locator('iframe');const box=(await frame.boundingBox())!;
    expect(box.width).toBe(160);expect(box.height).toBe(600);
    if(side==='left')expect(box.x+box.width+24).toBeLessThanOrEqual(center.x+1);
    else expect(box.x).toBeGreaterThanOrEqual(center.x+center.width+23);
    const main=(await page.locator('#main').boundingBox())!;
    expect(main.x).toBeGreaterThanOrEqual(center.x);
    expect(main.x+main.width).toBeLessThanOrEqual(center.x+center.width+1);
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   if(width===1366&&path.includes('/noticias/'))await page.screenshot({path:'test-results/side-rails-1366.png'});
  }
  if(width<1280)expect(requests.some(u=>u.endsWith(adUnits.sidebar.key))).toBe(false);
  expect(requests.some(u=>u.includes('abscloud.org'))).toBe(false);
  expect(requests.some(u=>u.includes('googletagmanager.com/gtag/js'))).toBe(false);
 });
}

for(const height of [780,900,700]){
 test(`side banners follow wheel scrolling only when fully fitting at ${height}px height`,async({page},info)=>{
  test.skip(info.project.name!=='desktop','Desktop sticky rail coverage');
  await page.setViewportSize({width:1366,height});await mockBanners(page);
  const requests:string[]=[];page.on('request',r=>requests.push(r.url()));
  for(const path of ['/es/','/es/noticias/gta-6-autobuses-trenes-transporte-edge/']){
   await page.goto(path);
   const frames=['left','right'].map(side=>page.locator(`[data-ad-placement="${side}"] iframe`));
   for(const frame of frames)await expect(frame).toHaveCount(1);
   const consent=page.getByRole('button',{name:'Rechazar Analytics',exact:true});if(await consent.isVisible())await consent.click();
   const initial=await Promise.all(frames.map(frame=>frame.boundingBox()));
   const loads=requests.filter(u=>u.endsWith(adUnits.sidebar.key)).length;
   await page.mouse.wheel(0,900);
   await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(500);
   for(let i=0;i<frames.length;i++){
    if(height>=780){
     await expect.poll(async()=>Math.abs((await frames[i].boundingBox())!.y-initial[i]!.y)).toBeLessThan(1);
     const box=(await frames[i].boundingBox())!,header=(await page.locator('.site-header').boundingBox())!;
     expect(box.y).toBeGreaterThanOrEqual(header.y+header.height);
     expect(box.y+box.height).toBeLessThanOrEqual(height-8);
    }else await expect.poll(async()=>(await frames[i].boundingBox())!.y).toBeLessThan(initial[i]!.y-500);
   }
   if(height===900)await page.screenshot({path:`test-results/sticky-rails-${path==='/es/'?'home':'article'}.png`});
   await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
   const footer=(await page.locator('footer').boundingBox())!;
   for(const frame of frames){const box=(await frame.boundingBox())!;expect(box.y+box.height).toBeLessThanOrEqual(footer.y+1);await expect(frame).toHaveCount(1);}
   expect(requests.filter(u=>u.endsWith(adUnits.sidebar.key)).length).toBe(loads);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  expect(requests.some(u=>u.includes('abscloud.org'))).toBe(false);
 });
}
