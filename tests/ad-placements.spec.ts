import {test,expect} from '@playwright/test';
import {adUnits} from '../src/ads/config';
import type {AdUnitName} from '../src/ads/config';

test('top, bottom and fitting side placements load automatically while Analytics remains optional',async({page},info)=>{
 const desktop=info.project.name==='desktop';if(desktop)await page.setViewportSize({width:1920,height:1000});
 const requests:string[]=[];page.on('request',r=>requests.push(r.url()));
 for(const host of ['https://abscloud.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await page.route('https://www.youtube-nocookie.com/**',r=>r.fulfill({status:200,contentType:'text/html',body:'<html><body>Player fixture</body></html>'}));
 await page.route('https://bauval.org/**',r=>{
  const name=(Object.keys(adUnits) as AdUnitName[]).find(n=>r.request().url().endsWith(adUnits[n].key))!;
  const u=adUnits[name];
  const body=name==='native'?`document.getElementById('container-${u.key}').textContent='Native fixture';`:`if(window.atOptions.key!=='${u.key}')throw Error('Unit race');document.write('<iframe title="Banner fixture" width="${u.width}" height="${u.height}" src="about:blank"></iframe>');`;
  return r.fulfill({status:200,contentType:'application/javascript',body});
 });
 for(const path of ['/es/','/en/news/','/fr/cookies/','/es/noticias/gta-6-autobuses-trenes-transporte-edge/']){
  await page.goto(path);const unit=desktop?'leaderboard':'mobile';
  for(const position of ['top','bottom']){
   const band=page.locator(`[data-ad-placement="${position}"]`);await expect(band).toHaveCount(1);
   await expect(band.locator(`.ad-slot-${unit} iframe`)).toHaveCount(1);
   await expect(band.locator(`.ad-slot-${desktop?'mobile':'leaderboard'} script`)).toHaveCount(0);
  }
  const content=(await page.locator('.header-main.shell').boundingBox())!;
  for(const side of ['left','right']){
   const rail=page.locator(`[data-ad-placement="${side}"]`);await expect(rail).toHaveCount(1);
   if(desktop){await expect(rail.locator('iframe')).toHaveCount(1);const box=(await rail.boundingBox())!;if(side==='left')expect(box.x+box.width).toBeLessThanOrEqual(content.x);else expect(box.x).toBeGreaterThanOrEqual(content.x+content.width);}
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
 expect(requests.some(u=>u.includes('abscloud.org'))).toBe(true);expect(requests.some(u=>u.includes('googletagmanager.com/gtag/js'))).toBe(false);
});
