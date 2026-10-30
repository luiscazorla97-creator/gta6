import {test,expect} from '@playwright/test';
import {historyArticles} from '../src/batches/history';
import {articlePath,sectionPath} from '../src/routes';
import {mediaPath,mediaDimensions} from '../src/media';

test.beforeEach(async({page})=>{
 for(const host of ['https://abscloud.org/**','https://bauval.org/**','https://www.googletagmanager.com/**','https://pagead2.googlesyndication.com/**'])await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
});

test('complete history series has unique localized metadata, real images and preserved integrations',async({request})=>{
 expect(historyArticles).toHaveLength(17);
 const sitemap=await(await request.get('/sitemap.xml')).text();
 for(const a of historyArticles){
  const image=await request.get(mediaPath(a.image));expect(image.status()).toBe(200);expect(image.headers()['content-type']).toContain('image/webp');
  for(const [li,locale] of (['es','en','fr'] as const).entries()){
   const path=articlePath(locale,a),url='https://fansgta.com'+path;const response=await request.get(path);expect(response.status()).toBe(200);const html=await response.text();
   expect(html).toContain(`rel="canonical" href="${url}"`);expect(html).toContain('content="index,follow"');expect(sitemap).toContain(`<loc>${url}</loc>`);
   expect(html).toContain(`property="og:image:alt"`);expect(html).toContain(`name="twitter:image:alt"`);
   for(const l of ['es','en','fr'] as const)expect(html).toContain(`hreflang="${l}" href="https://fansgta.com${articlePath(l,a)}"`);
   const schema=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])).find(s=>s['@type']==='BlogPosting');
   expect(schema.headline).toBe(a.title[li]);expect(schema.inLanguage).toBe(locale);expect(schema.datePublished).toBe('2026-10-30');expect(schema.citation).toEqual(a.sources.map(s=>s.url));
   expect(html).not.toContain('src="https://www.googletagmanager.com/gtag/js');
   expect(html.match(/src="https:\/\/pagead2.googlesyndication.com\/pagead\/js\/adsbygoogle.js\?client=ca-pub-1382859681401211"/g)).toHaveLength(1);
   for(const placement of ['top','bottom','left','right'])expect(html).toContain(`data-ad-placement="${placement}"`);
  }
 }
});

for(const a of historyArticles)test(`${a.history!.game}: all language versions, cover, sources and series navigation`,async({page,request})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(articlePath('es',a));
 for(const [li,locale] of (['es','en','fr'] as const).entries()){
  await expect(page).toHaveURL(articlePath(locale,a));await expect(page.getByRole('heading',{level:1})).toHaveText(a.title[li]);
  const figure=page.locator('.history-article>.editorial-figure'),img=figure.locator('img'),size=mediaDimensions(a.image);
  await expect(img).toHaveAttribute('alt',a.imageAlt![li]);await expect(img).toHaveAttribute('src',mediaPath(a.image));
  await expect.poll(()=>img.evaluate((e:HTMLImageElement)=>[e.complete,e.naturalWidth,e.naturalHeight])).toEqual([true,size.width,size.height]);
  await expect(img).toHaveCSS('object-fit','contain');await expect(figure.locator('figcaption')).toContainText(a.imageCaption![li]);
  await expect(figure.locator('figcaption a')).toHaveAttribute('href',a.imageCredit!.url);await expect(page.locator('.history-notice')).toBeVisible();
  const series=page.locator('.history-series');await series.locator('summary').click();await expect(series.locator('a')).toHaveCount(17);
  await expect(series.locator('a[aria-current="page"]')).toHaveAttribute('href',articlePath(locale,a));
  for(const href of await series.locator('a').evaluateAll(links=>links.map(a=>a.getAttribute('href')!)))expect(href.startsWith(`/${locale}/`)).toBe(true);
  for(const href of await page.locator('.section-sources a[href^="/"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')!))){expect(href.startsWith(`/${locale}/`)).toBe(true);expect((await request.get(href)).status()).toBe(200);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(li<2)await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(['es','en','fr'][li+1]);
 }
 expect(errors).toEqual([]);
});

test('history guides are discoverable and do not claim an unreleased GTA VI ending',async({page})=>{
 for(const locale of ['es','en','fr'] as const){
  await page.goto(sectionPath(locale,'guides'));
  for(const a of historyArticles)await expect(page.locator('.archive-card h2 a').filter({hasText:a.title[['es','en','fr'].indexOf(locale)]})).toHaveAttribute('href',articlePath(locale,a));
 }
 const vi=historyArticles.find(a=>a.history?.game==='GTA VI')!;
 await page.goto(articlePath('es',vi));await expect(page.locator('.history-notice')).toContainText('no conocemos su final');
});
