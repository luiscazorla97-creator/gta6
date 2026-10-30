import {test,expect} from '@playwright/test';
import {popunder} from '../src/ads/config';
import {popunderStorageKey as key} from '../src/ads/AdsterraPopunder';
const path='/es/trucos/verificar-trucos-gta-6/';
test.beforeEach(async({page})=>{
 for(const host of['https://bauval.org/**','https://abscloud.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
});
test('direct visits, consent buttons and in-page anchors do not activate the SDK',async({page})=>{
 const requests:string[]=[];page.on('request',r=>{if(r.url().includes('abscloud.org'))requests.push(r.url());});
 await page.goto(path);await page.getByRole('button',{name:'Rechazar Analytics',exact:true}).click();await page.locator('.article-contents a').first().click();
 await expect(page.locator('#fansgta-adsterra-popunder')).toHaveCount(0);expect(requests).toEqual([]);
 expect(await page.evaluate(k=>sessionStorage.getItem(k),key)).toBeNull();
});
test('a trusted internal navigation prepares one exact SDK on its destination, with independent Analytics',async({page})=>{
 await page.goto('/es/');await page.getByRole('button',{name:'Rechazar Analytics',exact:true}).click();
 const link=page.locator('.news-grid .story-title').first();await link.click();
 const script=page.locator('#fansgta-adsterra-popunder');await expect(script).toHaveCount(1);await expect(script).toHaveAttribute('src',popunder.src);await expect(script).toHaveAttribute('data-cfasync','false');
 await expect(page.locator('#fansgta-ga4')).toHaveCount(0);
 await page.locator('.breadcrumbs a').first().click();await expect(page).toHaveURL('/es/');await expect(page.locator('#fansgta-adsterra-popunder')).toHaveCount(0);
 await link.click();await expect(page.locator('#fansgta-adsterra-popunder')).toHaveCount(0);await page.reload();await expect(page.locator('#fansgta-adsterra-popunder')).toHaveCount(0);
});
test('expired navigation intents and blocked storage preserve normal navigation without requests',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/es/');
 await page.evaluate(({key,path})=>sessionStorage.setItem(key,JSON.stringify({pending:{path,at:Date.now()-120000}})),{key,path});await page.goto(path);await expect(page.locator('#fansgta-adsterra-popunder')).toHaveCount(0);
 await page.addInitScript(()=>Object.defineProperty(window,'sessionStorage',{get(){throw new DOMException('Blocked','SecurityError');}}));await page.goto('/es/');await page.locator('.news-grid .story-title').first().click();await expect(page.locator('.full-article')).toBeVisible();await expect(page.locator('#fansgta-adsterra-popunder')).toHaveCount(0);expect(errors).toEqual([]);
});
test('provider failure reserves the activation interval without retries or navigation traps',async({page})=>{
 let requests=0;await page.route('https://abscloud.org/**',r=>{requests++;return r.fulfill({status:403,body:''});});
 await page.goto('/es/');await page.locator('.news-grid .story-title').first().click();await expect.poll(()=>requests).toBe(1);await expect(page.locator('.full-article h1')).toBeVisible();
 await page.reload();await expect(page.locator('#fansgta-adsterra-popunder')).toHaveCount(0);expect(requests).toBe(1);
});
