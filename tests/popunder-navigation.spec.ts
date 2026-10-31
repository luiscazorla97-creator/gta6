import {test,expect} from '@playwright/test';
import {popunder} from '../src/ads/config';
const path='/es/trucos/verificar-trucos-gta-6/';
test.beforeEach(async({page})=>{
 for(const host of['https://bauval.org/**','https://abscloud.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
});
test('one exact script is in the head on direct visits and after hydration; Analytics remains optional',async({page})=>{
 let requests=0;page.on('request',r=>{if(r.url()===popunder.src)requests++;});
 await page.goto(path);await page.getByRole('button',{name:'Rechazar Analytics',exact:true}).click();
 const script=page.locator('head > #fansgta-adsterra-popunder');await expect(script).toHaveCount(1);await expect(script).toHaveAttribute('src',popunder.src);await expect(script).toHaveAttribute('data-cfasync','false');
 await expect(page.locator('#fansgta-ga4')).toHaveCount(0);expect(requests).toBe(1);
 expect(await page.evaluate(()=>document.getElementById('fansgta-adsterra-popunder')?.closest('iframe,.ad-slot,.ad-provider'))).toBeNull();
});
test('a ready provider can observe the first trusted article click before native navigation',async({page})=>{
 await page.route('https://abscloud.org/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:`document.addEventListener('click',function(e){if(e.isTrusted&&e.target.closest('a.story-title'))sessionStorage.setItem('popunder-test-gesture',JSON.stringify({trusted:e.isTrusted,active:navigator.userActivation.isActive,source:location.pathname}));});`}));
 await page.goto('/es/');await page.getByRole('button',{name:'Rechazar Analytics',exact:true}).click();await page.locator('.news-grid .story-title').first().click();
 await expect(page.locator('.full-article')).toBeVisible();expect(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('popunder-test-gesture')!))).toEqual({trusted:true,active:true,source:'/es/'});
 await expect(page.locator('head > #fansgta-adsterra-popunder')).toHaveCount(1);
});
test('old cooldowns and unavailable sessionStorage cannot prevent initialization or navigation',async({page})=>{
 await page.addInitScript(()=>{if(window.top!==window)return;sessionStorage.setItem('fansgta:popunder-navigation:v1',JSON.stringify({lastLoaded:Date.now()}));Object.defineProperty(window,'sessionStorage',{get(){throw new DOMException('Blocked','SecurityError');}});});
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/es/');await expect(page.locator('head > #fansgta-adsterra-popunder')).toHaveCount(1);
 await page.locator('.news-grid .story-title').first().click();await expect(page.locator('.full-article h1')).toBeVisible();expect(errors).toEqual([]);
});
test('a 403 does not trap navigation or suppress the next document request for 30 minutes',async({page})=>{
 let requests=0;await page.route('https://abscloud.org/**',r=>{requests++;return r.fulfill({status:403,body:''});});
 await page.goto('/es/');expect(requests).toBe(1);await page.locator('.news-grid .story-title').first().click();await expect(page.locator('.full-article h1')).toBeVisible();expect(requests).toBe(2);
 await page.reload();expect(requests).toBe(3);await expect(page.locator('#fansgta-adsterra-popunder')).toHaveCount(1);
});
