import {test,expect} from '@playwright/test';
import {collectorStorage20261028} from '../src/batches/2026-10-28-collector-storage';
import {articlePath} from '../src/routes';
const article=collectorStorage20261028.find(a=>a.id==='collector-box-no-game-2026-10-28')!;
const shop='https://www.e-capcom.com/shop/g/gC00009901/';

test('Collector guide keeps the existing topic and original publication in all three indexable routes',async({request})=>{
 expect(collectorStorage20261028).toHaveLength(2);
 const sitemap=await(await request.get('/sitemap.xml')).text();
 for(const[li,l]of(['es','en','fr']as const).entries()){
  const path=articlePath(l,article),r=await request.get(path);expect(r.status()).toBe(200);const h=await r.text();
  expect(h).toContain('content="index,follow"');expect(h).toContain(`rel="canonical" href="https://fansgta.com${path}"`);
  for(const lang of ['es','en','fr']as const)expect(h).toContain(`hreflang="${lang}" href="https://fansgta.com${articlePath(lang,article)}"`);
  const schemas=[...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));const post=schemas.find(s=>s['@type']==='BlogPosting');
  expect(post.headline).toBe(article.title[li]);expect(post.datePublished).toBe('2026-10-28');expect(post.dateModified).toBe('2026-11-02');expect(post.description).toBe(article.excerpt[li]);expect(post.citation).toContain(shop);
  expect(sitemap).toContain(`<loc>https://fansgta.com${path}</loc><lastmod>2026-11-02</lastmod>`);
  expect(h).not.toContain('abscloud.org');
 }
});

test('Collector update covers both markets, eleven items, uncropped product images and real language navigation',async({page,request},info)=>{
 const calls:string[]=[];page.on('request',r=>calls.push(r.url()));
 for(const host of ['https://bauval.org/**','https://abscloud.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await page.goto(articlePath('es',article));
 for(const[li,l]of(['es','en','fr']as const).entries()){
  await expect(page).toHaveURL(articlePath(l,article));await expect(page.locator('h1')).toHaveText(article.title[li]);
  const body=page.locator('.article-body');
  await expect(body).toContainText('JPY');await expect(body).toContainText('USD');
  await expect(body).toContainText({es:'99.980',en:'99,980',fr:'99 980'}[l]);
  await expect(body).toContainText({es:'399,99',en:'399.99',fr:'399,99'}[l]);
  await expect(body).toContainText('在庫：×');await expect(body).toContainText('JST');
  await expect(body).toContainText({es:'no incluye GTA VI',en:'does not include GTA VI',fr:'sans GTA VI'}[l]);
  await expect(body.locator('table')).toHaveCount(3);await expect(body.locator('table').nth(1).locator('tbody tr')).toHaveCount(11);
  await expect(body).toContainText('Oakley');await expect(body).toContainText('New Era');
  const figures=page.locator('.full-article .editorial-figure');await expect(figures).toHaveCount(3);
  for(const f of await figures.all()){const im=f.locator('img');await im.scrollIntoViewIfNeeded();await expect.poll(()=>im.evaluate((x:HTMLImageElement)=>x.complete&&x.naturalWidth>0)).toBe(true);await expect(im).not.toHaveAttribute('alt','');await expect(f.locator('figcaption a')).toHaveAttribute('href',/rockstargames.com/);}
  const product=page.locator('.full-article img[src*="collector-box"]');await expect(product).toHaveCount(2);
  for(const im of await product.all()){await expect(im).toHaveCSS('object-fit','contain');await expect(im).toHaveAttribute('width','1200');await expect(im).toHaveAttribute('height','1200');}
  const cover=page.locator('.full-article > .editorial-figure img');await cover.scrollIntoViewIfNeeded();
  await expect.poll(()=>cover.evaluate((i:HTMLImageElement)=>i.complete&&i.naturalWidth>0)).toBe(true);await expect(cover).not.toHaveAttribute('alt','');
  await expect(page.locator('.full-article > .editorial-figure figcaption')).toContainText(article.imageCaption![li]);await expect(page.locator('.full-article > .editorial-figure figcaption a')).toHaveAttribute('href','https://store.rockstargames.com/merchandise/gtavi-goodtime-state-vice-city-collection');
  for(const href of new Set(await page.locator('.section-sources a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')!)))){expect(href.startsWith('/'+l+'/')).toBe(true);expect((await request.get(href)).status()).toBe(200);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(page.locator('#fansgta-ga4')).toHaveCount(0);
  if(li===0)await page.screenshot({path:`test-results/daily-collector-${info.project.name}.png`});
  if(li<2)await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[l],exact:true}).selectOption(['es','en','fr'][li+1]);
 }
 expect(calls.some(u=>u.includes('abscloud.org')||u.includes('googletagmanager.com/gtag/js'))).toBe(false);
});
