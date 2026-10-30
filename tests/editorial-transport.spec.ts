import {test,expect} from '@playwright/test';
import {transport20261030} from '../src/batches/2026-10-30-daily-transport';
import {articlePath} from '../src/routes';
import {mediaPath,mediaAlt} from '../src/media';

test.beforeEach(async({page})=>{
 await page.route('https://abscloud.org/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await page.route('https://bauval.org/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 for(const host of ['https://www.googletagmanager.com/**','https://pagead2.googlesyndication.com/**'])await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await page.route('https://www.youtube-nocookie.com/**',r=>r.fulfill({status:200,contentType:'text/html',body:'<html><body>Player test</body></html>'}));
});

test('one daily topic has three indexable language editions with sourced metadata',async({request})=>{
 expect(transport20261030).toHaveLength(1);
 const article=transport20261030[0],sitemap=await (await request.get('/sitemap.xml')).text();
 for(const [index,locale] of (['es','en','fr'] as const).entries()){
  const url='https://fansgta.com'+articlePath(locale,article);
  const response=await request.get(articlePath(locale,article));expect(response.status()).toBe(200);const html=await response.text();
  expect(html).toContain(`lang="${locale}"`);expect(html).toContain(`rel="canonical" href="${url}"`);expect(html).toContain('content="index,follow"');
  expect(sitemap).toContain(`<loc>${url}</loc>`);
  for(const alt of ['es','en','fr'] as const)expect(html).toContain(`hreflang="${alt}" href="https://fansgta.com${articlePath(alt,article)}"`);
  expect(html).toContain(`name="twitter:image" content="https://fansgta.com${mediaPath(article.image)}"`);
  const schema=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])).find(s=>s['@type']==='BlogPosting');
  expect(schema.headline).toBe(article.title[index]);expect(schema.description).toBe(article.excerpt[index]);expect(schema.inLanguage).toBe(locale);
  expect(schema.datePublished).toBe('2026-10-30');expect(schema.dateModified).toBe('2026-10-30');expect(schema.citation).toEqual(article.sources.map(s=>s.url));
  expect(html).not.toContain('src="https://www.googletagmanager.com/gtag/js');
  expect(html.match(/src="https:\/\/pagead2.googlesyndication.com\/pagead\/js\/adsbygoogle.js\?client=ca-pub-1382859681401211"/g)).toHaveLength(1);
  expect(html).toContain('data-ad-placement="top"');expect(html).toContain('data-ad-placement="bottom"');
 }
 const image=await request.get(mediaPath(article.image));expect(image.status()).toBe(200);expect(image.headers()['content-type']).toContain('image/webp');
});

test('daily report shows the authentic cover, translated captions and working internal/language links',async({page,request})=>{
 const article=transport20261030[0],errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(articlePath('es',article));
 for(const [index,locale] of (['es','en','fr'] as const).entries()){
  await expect(page).toHaveURL(articlePath(locale,article));await expect(page.getByRole('heading',{level:1})).toHaveCount(1);
  await expect(page.getByRole('heading',{level:1})).toHaveText(article.title[index]);
  const figure=page.locator('.full-article>.editorial-figure'),image=figure.locator('img');
  await expect(image).toHaveAttribute('alt',mediaAlt(article.image,locale));await expect(image).toHaveAttribute('src','/media/vice-city.webp');
  await expect.poll(()=>image.evaluate((e:HTMLImageElement)=>e.complete&&e.naturalWidth===1600&&e.naturalHeight===900)).toBe(true);
  await expect(figure.locator('figcaption')).toContainText(article.imageCaption![index]);await expect(figure.locator('figcaption a')).toHaveAttribute('href','https://www.rockstargames.com/VI/media');
  const internal=page.locator('.section-sources a[href^="/"]');await expect(internal).toHaveCount(2);
  for(const link of await internal.all()){
   const href=(await link.getAttribute('href'))!;expect(href).toMatch(new RegExp(`^/${locale}/`));expect((await request.get(href)).status()).toBe(200);
  }
  await expect(page.locator('[data-ad-placement="top"]')).toHaveCount(1);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(index<2)await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(['es','en','fr'][index+1]);
 }
 expect(errors).toEqual([]);
});

test('the report is discoverable as the latest news in each homepage language',async({page})=>{
 const article=transport20261030[0];
 for(const [index,locale] of (['es','en','fr'] as const).entries()){
  await page.goto(`/${locale}/`);const entry=page.locator('.news-grid .story-title').first();
  await expect(entry).toHaveText(article.title[index]);await expect(entry).toHaveAttribute('href',articlePath(locale,article));
  await entry.click();await expect(page).toHaveURL(articlePath(locale,article));await expect(page.getByRole('heading',{level:1})).toHaveText(article.title[index]);
 }
});
