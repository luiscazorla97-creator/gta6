import {test,expect} from '@playwright/test';
import {photoGuides20261031 as guides} from '../src/batches/2026-10-31-photo-guides';
import {onlineDrop20261031 as news} from '../src/batches/2026-10-31-online-drop';
import {articlePath} from '../src/routes';
test.beforeEach(async({page})=>{for(const host of ['https://bauval.org/**','https://abscloud.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));});
for(const[li,locale]of(['es','en','fr']as const).entries())test(`photo guides ${locale}: three genuine images, credit, links and language navigation`,async({page,request})=>{
 for(const a of guides){await page.goto(articlePath(locale,a));await expect(page.locator('h1')).toHaveText(a.title[li]);const figures=page.locator('.full-article .editorial-figure');await expect(figures).toHaveCount(3);
  for(const figure of await figures.all()){const img=figure.locator('img');await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate((i:HTMLImageElement)=>i.complete&&i.naturalWidth>0)).toBe(true);await expect(img).not.toHaveAttribute('alt','');await expect(figure.locator('figcaption a')).toHaveAttribute('href','https://www.rockstargames.com/VI/only-in-leonida/'+a.id.replace('gta6-place-','').replace('-20261031',''));}
  const h=await(await request.get(articlePath(locale,a))).text();expect(h).toContain('BlogPosting');expect(h).toContain('index,follow');expect(h).toContain(a.excerpt[li]);const schema=[...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])).find(s=>s['@type']==='BlogPosting');expect(schema.image).toHaveLength(3);
  for(const href of new Set(await page.locator('.section-sources a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')!)))){expect(href.startsWith('/'+locale+'/')).toBe(true);expect((await request.get(href)).status()).toBe(200);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(page.locator('#fansgta-ga4')).toHaveCount(0);
 }
 const a=guides[0],target=locale==='es'?'fr':'es';await page.goto(articlePath(locale,a));await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(target);await expect(page).toHaveURL(articlePath(target,a));
 await page.goto(articlePath(locale,news));await expect(page.locator('h1')).toHaveText(news.title[li]);await expect(page.locator('.article-body')).toContainText('72');await expect(page.locator('.article-body')).toContainText('GAMINGbible');await expect(page.locator('.article-body')).toContainText({es:'1 de noviembre',en:'November 1',fr:'1er novembre'}[locale]);await expect(page.locator('.article-body')).toContainText({es:'11 de noviembre',en:'November 11',fr:'11 novembre'}[locale]);
});
