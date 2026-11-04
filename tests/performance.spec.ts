import{test,expect}from'@playwright/test';
import{articles}from'../src/articles';
test.beforeEach(async({page})=>{
 for(const h of['https://bauval.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(h,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await page.emulateMedia({reducedMotion:'reduce'});
});
test('the first screen and ad reservation are stable before hydration',async({page,request})=>{
 let resume!:()=>void;const pending=new Promise<void>(r=>resume=r);
 await page.route('**/assets/index-*.js',async r=>{await pending;await r.continue();});
 await page.goto('/es/',{waitUntil:'commit'});await expect(page.locator('.hero')).toBeVisible();
 const before=(await page.locator('.hero').boundingBox())!;resume();
 await expect(page.locator('[data-ad-placement="top"] .ad-slot-enabled')).toHaveCount(1);
 const after=(await page.locator('.hero').boundingBox())!;expect(Math.abs(before.y-after.y)).toBeLessThan(.5);expect(Math.abs(before.height-after.height)).toBeLessThan(.5);
 const script=await page.locator('script[type="module"][src]').getAttribute('src');expect(script).toBeTruthy();expect((await(await request.get(script!)).body()).length).toBeLessThan(450000);
 await expect(page.locator('style[data-site-styles]')).toHaveCount(1);await expect(page.locator('link[rel="stylesheet"]')).toHaveCount(0);
 const image=page.locator('.hero-art');await expect(image).toHaveAttribute('loading','eager');await expect(image).toHaveAttribute('fetchpriority','high');await expect.poll(()=>image.evaluate((x:HTMLImageElement)=>x.complete&&x.naturalWidth>0)).toBe(true);expect(await image.evaluate((x:HTMLImageElement)=>x.currentSrc)).toMatch(/\/responsive\/[^/]+\/vice-city-(?:\d+|phone)\.avif$/);
 await expect(page.locator('.official-video iframe')).toHaveAttribute('loading','lazy');
});
test('only the requested report has a body in the hydration data',async({page})=>{
 await page.goto('/fr/actualites/gta-6-19-november-2026/');
 const data=JSON.parse((await page.locator('#fansgta-page-data').textContent())!);expect(data.articles).toHaveLength(articles.length);const full=data.articles.filter((a:{sections:unknown[]})=>a.sections.length);expect(full).toHaveLength(1);expect(full[0].id).toBe('gta-6-19-november-2026');expect(data.readingTimes[full[0].id]).toHaveLength(3);
 await expect(page.locator('h1')).toHaveText(full[0].title[2]);await expect(page.locator('.article-body>section')).toHaveCount(full[0].sections.length);
 await page.getByRole('combobox',{name:'Langue',exact:true}).selectOption('es');await expect(page.locator('h1')).toHaveText(full[0].title[0]);
});
