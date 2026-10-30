import {test,expect} from '@playwright/test';
async function providers(page:import('@playwright/test').Page){
 await page.route('https://www.googletagmanager.com/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await page.route('https://bauval.org/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await page.route('https://pagead2.googlesyndication.com/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
}
test('same-scene helicopter layers animate and pause without covering homepage controls',async({page})=>{
 await providers(page);await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/es/');
 await expect(page.locator('.hero-motion-layers')).toHaveAttribute('data-ready','true');
 const craft=page.locator('.hero-aircraft');const first=await craft.evaluate(e=>getComputedStyle(e).transform);
 await expect.poll(()=>craft.evaluate(e=>getComputedStyle(e).transform)).not.toBe(first);
 await page.getByRole('button',{name:'Pausar movimiento',exact:true}).click();
 await expect(page.locator('.hero-motion-layers')).toHaveAttribute('data-paused','true');
 expect(await craft.evaluate(e=>getComputedStyle(e).animationPlayState)).toBe('paused');
 await page.getByRole('button',{name:'Reanudar movimiento',exact:true}).click();
 expect(await craft.evaluate(e=>getComputedStyle(e).animationPlayState)).toBe('running');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.locator('.hero').screenshot({path:`test-results/hero-motion-${test.info().project.name}.png`});
});
test('reduced motion keeps the exact original photo and avoids loading edited layers',async({page})=>{
 await providers(page);await page.emulateMedia({reducedMotion:'reduce'});
 const requested:string[]=[];page.on('request',r=>{if(r.url().includes('hero-motion-'))requested.push(r.url());});
 await page.goto('/es/');await expect(page.locator('.hero-art')).toHaveAttribute('src','/media/vice-city.webp');
 await expect(page.locator('.hero-motion-layers')).toHaveCount(0);await expect(page.locator('.hero-motion-control')).toHaveCount(0);expect(requested).toEqual([]);
});
test('a failed decorative layer leaves the original photo and functional page',async({page})=>{
 await providers(page);await page.emulateMedia({reducedMotion:'no-preference'});
 await page.route('**/hero-motion-background.webp',r=>r.abort());await page.goto('/en/');
 await expect(page.locator('.hero-motion-layers')).toHaveCount(0);await expect(page.locator('.hero-art')).toBeVisible();
 await expect(page.locator('.hero h1')).toContainText('Everything GTA 6');
});
