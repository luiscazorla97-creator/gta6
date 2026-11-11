import {test,expect} from '@playwright/test';
import {articles} from '../.ssr/entry-server.js';
import {articlePath,sectionPath} from '../src/routes';
const article=articles.find(a=>a.id==='gta6-the-festival-miami-20261109')!;
if(!article)throw new Error('Festival article missing');
test.beforeEach(async({page})=>{
 for(const host of ['https://bauval.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])
  await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
});
for(const [li,locale] of (['es','en','fr'] as const).entries())test(`festival news in ${locale}: complete content, media, SEO and locale navigation`,async({page,request})=>{
 const path=articlePath(locale,article),errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const source of [`/${locale}/`,sectionPath(locale,'news'),'/sitemap.xml'])expect(await(await request.get(source)).text()).toContain(path);
 const response=await page.goto(path);expect(response?.status()).toBe(200);
 await expect(page.locator('h1')).toHaveText(article.title[li]);
 await expect(page.locator('.article-body > section[id]')).toHaveCount(article.sections.length);
 const body=await page.locator('.article-body').innerText();
 for(const section of article.sections){expect(body).toContain(section.heading[li]);for(const p of section.paragraphs)expect(body).toContain(p[li]);if(section.table)for(const row of section.table.rows)for(const cell of row)expect(body).toContain(cell[li]);}
 await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://fansgta.com'+path);
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','index,follow,max-image-preview:large');
 await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',article.excerpt[li]);
 for(const lang of ['es','en','fr'] as const)await expect(page.locator(`link[hreflang="${lang}"]`)).toHaveAttribute('href','https://fansgta.com'+articlePath(lang,article));
 const figures=page.locator('.full-article .editorial-figure');await expect(figures).toHaveCount(2);
 for(const figure of await figures.all()){
  const image=figure.locator('img');await image.scrollIntoViewIfNeeded();
  await expect.poll(()=>image.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  await expect(image).not.toHaveAttribute('alt','');await expect(image).toHaveAttribute('srcset',/\/responsive\//);
  await expect(figure.locator('figcaption a')).toHaveAttribute('href','https://www.rockstargames.com/VI/media');
 }
 const internal=await page.locator('.section-sources a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')!));
 expect(new Set(internal).size).toBe(3);
 for(const href of new Set(internal)){expect(href.startsWith('/'+locale+'/')).toBe(true);expect((await request.get(href)).status()).toBe(200);}
 const html=await(await request.get(path)).text();
 const schema=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])).find(s=>s['@type']==='BlogPosting');
 expect(schema.datePublished).toBe('2026-11-09');expect(schema.dateModified).toBe('2026-11-09');expect(schema.citation).toEqual(article.sources.map(s=>s.url));
 await expect(page.locator('script[src="https://bauval.org/14/72f531d35d71d31735aa4e4bae1dae41"]')).toHaveCount(1);
 await expect(page.locator('script[src*="pagead/js/adsbygoogle.js"]')).toHaveCount(1);await expect(page.locator('#fansgta-ga4')).toHaveCount(0);expect(html).not.toContain('abscloud.org');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const next=locale==='es'?'fr':'es';await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(next);
 await expect(page).toHaveURL(articlePath(next,article));await expect(page.locator('h1')).toHaveText(article.title[next==='es'?0:2]);
 expect(errors).toEqual([]);
});
