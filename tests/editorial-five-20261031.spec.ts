import {test,expect} from '@playwright/test';
import {five20261031 as batch} from '../src/batches/2026-10-31-five';
import {articlePath} from '../src/routes';
test.beforeEach(async({page})=>{for(const host of ['https://abscloud.org/**','https://bauval.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));});
for(const [li,locale]of(['es','en','fr']as const).entries())test(`five guides ${locale}: content, images, sources and language navigation`,async({page,request})=>{
 for(const a of batch){
  await page.goto(articlePath(locale,a));await expect(page.locator('h1')).toHaveText(a.title[li]);await expect(page.locator('.article-body>section')).toHaveCount(4);
  const img=page.locator('.full-article>.editorial-figure img');await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);await expect(img).toHaveAttribute('alt',a.imageAlt![li]);
  for(const href of new Set(await page.locator('.section-sources a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')!)))){expect(href.startsWith('/'+locale+'/')).toBe(true);expect((await request.get(href)).status()).toBe(200);}
  const h=await(await request.get(articlePath(locale,a))).text();expect(h).toContain('BlogPosting');expect(h).toContain('index,follow');expect(h).toContain(`rel="canonical" href="https://fansgta.com${articlePath(locale,a)}"`);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(page.locator('#fansgta-ga4')).toHaveCount(0);
 }
 const a=batch[0],target=locale==='es'?'en':'es';await page.goto(articlePath(locale,a));await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(target);await expect(page).toHaveURL(articlePath(target,a));
});
