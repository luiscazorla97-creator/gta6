import {test,expect} from '@playwright/test';
import {articles} from '../.ssr/entry-server.js';
const selected=articles.filter(a=>['gta6-mediamarkt-poster-offer-20261107'].includes(a.id));
if(selected.length!==1)throw new Error('Expected one new topic');
import {articlePath,sectionPath} from '../src/routes';

test.beforeEach(async({page})=>{
 for(const host of ['https://bauval.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])
  await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
});

for(const [i,locale] of (['es','en','fr'] as const).entries())test(`November 7 daily GTA VI retailer poster article in ${locale}: discoverability, complete content, media and language navigation`,async({page,request},info)=>{
 test.setTimeout(240000);
 const sitemap=await(await request.get('/sitemap.xml')).text();
 for(const a of selected){
  const path=articlePath(locale,a);
  const archive=await(await request.get(sectionPath(locale,a.category))).text();
  expect(sitemap).toContain('https://fansgta.com'+path);expect(archive).toContain(path);
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(path);expect(response?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveText(a.title[i]);
  await expect(page.locator('.article-body')).toContainText(a.body[i]);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',a.excerpt[i]);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','index,follow,max-image-preview:large');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://fansgta.com'+path);
  for(const lang of ['es','en','fr'] as const)await expect(page.locator(`link[hreflang="${lang}"]`)).toHaveAttribute('href','https://fansgta.com'+articlePath(lang,a));
  await expect(page.locator('.article-body > section[id]')).toHaveCount(a.sections.length);
  const body=await page.locator('.article-body').innerText();
  for(const section of a.sections){expect(body).toContain(section.heading[i]);for(const paragraph of section.paragraphs)expect(body).toContain(paragraph[i]);if(section.table)for(const row of section.table.rows)for(const cell of row)expect(body).toContain(cell[i]);}
  const figures=page.locator('.full-article .editorial-figure');await expect(figures).toHaveCount(1+a.sections.filter(s=>s.image).length);
  for(const figure of await figures.all()){
   const img=figure.locator('img');await img.scrollIntoViewIfNeeded();
   await expect.poll(()=>img.evaluate((x:HTMLImageElement)=>x.complete&&x.naturalWidth>0)).toBe(true);
   await expect(img).not.toHaveAttribute('alt','');await expect(img).toHaveAttribute('srcset',/\/responsive\//);
   await expect(figure.locator('figcaption a')).toHaveAttribute('href',/rockstargames\.com/);
  }
  const internal=await page.locator('.section-sources a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')!));
  expect(internal.length).toBeGreaterThan(0);
  for(const href of new Set(internal)){expect(href.startsWith('/'+locale+'/')).toBe(true);expect((await request.get(href)).status()).toBe(200);}
  const html=await(await request.get(path)).text();
  const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  const post=schemas.find(s=>s['@type']==='BlogPosting');expect(post.datePublished).toBe(a.published);expect(post.dateModified).toBe(a.updated);expect(post.citation).toEqual(a.sources.map(s=>s.url));
  await expect(page.locator('meta[name="google-adsense-account"]')).toHaveAttribute('content','ca-pub-1382859681401211');
  await expect(page.locator('script[src*="pagead/js/adsbygoogle.js"]')).toHaveCount(1);
  await expect(page.locator('#fansgta-ga4')).toHaveCount(0);expect(html).not.toContain('abscloud.org');
  await expect(page.locator('script[src="https://bauval.org/14/72f531d35d71d31735aa4e4bae1dae41"]')).toHaveCount(1);
  expect(errors).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(locale==='es'){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`/tmp/fansgta-daily-20261107/screenshots/${a.id}-${info.project.name}.png`});}
  const next=locale==='es'?'fr':'es';
  await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(next);
  await expect(page).toHaveURL(articlePath(next,a));await expect(page.locator('h1')).toHaveText(a.title[next==='es'?0:2]);
  await expect(page.locator('script[src="https://bauval.org/14/72f531d35d71d31735aa4e4bae1dae41"]')).toHaveCount(1);
 }
});
