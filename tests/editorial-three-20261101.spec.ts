import {test,expect}from'@playwright/test';
import {three20261101 as articles}from'../src/batches/2026-11-01-three';
import {articlePath}from'../src/routes';
test.beforeEach(async({page})=>{for(const h of ['https://bauval.org/**','https://abscloud.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(h,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));});
for(const[li,l]of(['es','en','fr']as const).entries())test(`three new ${l} articles preserve metadata, genuine images, tables, links and language navigation`,async({page,request},info)=>{
 test.setTimeout(60000);expect(articles).toHaveLength(3);const calls:string[]=[];page.on('request',r=>calls.push(r.url()));const sitemap=await(await request.get('/sitemap.xml')).text();
 for(const a of articles){
  const path=articlePath(l,a);await page.goto(path);await expect(page.locator('h1')).toHaveText(a.title[li]);await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',a.excerpt[li]);await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://fansgta.com'+path);
  for(const lang of ['es','en','fr']as const)await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveAttribute('href','https://fansgta.com'+articlePath(lang,a));
  await expect(page.locator('.article-body > section[id]')).toHaveCount(7);await expect(page.locator('.article-body table')).toHaveCount(1);await expect(page.locator('.article-body tbody tr')).toHaveCount(3);
  const figures=page.locator('.full-article .editorial-figure');await expect(figures).toHaveCount(3);
  for(const f of await figures.all()){const image=f.locator('img');await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate((i:HTMLImageElement)=>i.complete&&i.naturalWidth>0)).toBe(true);await expect(image).not.toHaveAttribute('alt','');await expect(f.locator('figcaption a')).toHaveAttribute('href','https://www.rockstargames.com/VI/media/screenshots');}
  const html=await(await request.get(path)).text();expect(html).toContain('index,follow');const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));const post=schemas.find(s=>s['@type']==='BlogPosting');expect(post.headline).toBe(a.title[li]);expect(post.inLanguage).toBe(l);expect(post.datePublished).toBe('2026-11-01');expect(sitemap).toContain('https://fansgta.com'+path);
  for(const href of new Set(await page.locator('.section-sources a[href^="/"]').evaluateAll(as=>as.map(x=>x.getAttribute('href')!)))){expect(href.startsWith('/'+l+'/')).toBe(true);expect((await request.get(href)).status()).toBe(200);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(page.locator('#fansgta-ga4')).toHaveCount(0);
  if(a.id.includes('safehouses')){await expect(page.locator('.article-body')).toContainText('Brian');await expect(page.locator('.article-body')).toContainText('Dinka Enduro');await expect(page.locator('.article-body')).toContainText('Crest Kayak');}
  if(a.id.includes('gang-compounds')){await expect(page.locator('.article-body')).toContainText('Southside');await expect(page.locator('.article-body')).toContainText('Ultimate');}
  if(a.id.includes('hunting'))await expect(page.locator('.article-body')).toContainText('TGG');
  const next=l==='es'?'fr':'es';await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[l],exact:true}).selectOption(next);await expect(page).toHaveURL(articlePath(next,a));
  if(a.id.includes('safehouses')&&l==='es')await page.screenshot({path:`test-results/three-nov1-${info.project.name}.png`});
 }
 expect(calls.some(u=>u.includes('abscloud.org')||u.includes('googletagmanager.com/gtag/js'))).toBe(false);
});
