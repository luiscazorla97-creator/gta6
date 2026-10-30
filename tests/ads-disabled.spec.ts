import {test,expect} from '@playwright/test';
import {adUnits} from '../src/ads/config';
test.skip(Object.values(adUnits).some(unit=>unit.enabled),'This regression applies while Adsterra is paused.');
test('no Adsterra slots or provider requests while AdSense verification stays installed',async({page})=>{
 const requests:string[]=[];page.on('request',r=>requests.push(r.url()));
 await page.route('https://www.googletagmanager.com/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await page.route('https://pagead2.googlesyndication.com/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 for(const path of ['/es/','/en/','/fr/','/es/noticias/gta-6-19-november-2026/']){
  await page.goto(path);await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));
  await expect(page.locator('.ad-slot')).toHaveCount(0);
  await expect(page.locator('script[src*="adsbygoogle.js?client=ca-pub-1382859681401211"]')).toHaveCount(1);
 }
 expect(requests.filter(u=>/bauval\.org|abscloud\.org/.test(u))).toEqual([]);
 expect(requests.some(u=>u.includes('adsbygoogle.js?client=ca-pub-1382859681401211'))).toBe(true);
});
