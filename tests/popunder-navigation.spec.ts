import {test,expect} from '@playwright/test';
import {popunder} from '../src/ads/config';
const article='/es/trucos/verificar-trucos-gta-6/';
test.beforeEach(async({page})=>{for(const host of['https://bauval.org/**','https://abscloud.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));});
test('popunder is absent from static HTML in all languages',async({request})=>{
 expect(popunder.enabled).toBe(false);
 for(const path of['/es/','/en/','/fr/',article]){const h=await(await request.get(path)).text();expect(h).not.toContain('abscloud.org');expect(h).not.toContain('fansgta-adsterra-popunder');for(const p of['top','bottom','left','right'])expect(h).toContain(`data-ad-placement="${p}"`);}
});
test('visits, consent, native article navigation and reload never request or open popunder',async({page,context})=>{
 const requests:string[]=[];const popups:string[]=[];page.on('request',r=>{if(r.url().includes('abscloud.org'))requests.push(r.url());});context.on('page',p=>popups.push(p.url()));
 await page.addInitScript(()=>sessionStorage.setItem('fansgta:popunder-navigation:v1',JSON.stringify({pending:{path:'/es/',at:Date.now()}})));
 await page.goto('/es/');await page.getByRole('button',{name:'Rechazar Analytics',exact:true}).click();await page.locator('.news-grid .story-title').first().click();await expect(page.locator('.full-article h1')).toBeVisible();await page.reload();await expect(page.locator('#fansgta-adsterra-popunder')).toHaveCount(0);await expect(page.locator('#fansgta-ga4')).toHaveCount(0);expect(requests).toEqual([]);expect(popups).toEqual([]);
});
