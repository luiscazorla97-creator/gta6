import {test,expect} from '@playwright/test';
import {tenInterest20261031 as batch} from '../src/batches/2026-10-31-ten-interest';
import {articlePath} from '../src/routes';

test.beforeEach(async({page})=>{
 for(const host of ['https://bauval.org/**','https://abscloud.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
});
for(const[li,locale]of(['es','en','fr']as const).entries())test(`ten distinct GTA VI topics in ${locale}: metadata, genuine images, sources and language navigation`,async({page,request},info)=>{
 test.setTimeout(120000);
 expect(batch).toHaveLength(10);
 const requests:string[]=[];page.on('request',r=>requests.push(r.url()));
 for(const a of batch){
  const path=articlePath(locale,a);await page.goto(path);
  await expect(page.locator('h1')).toHaveText(a.title[li]);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',a.excerpt[li]);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://fansgta.com'+path);
  for(const l of ['es','en','fr']as const)await expect(page.locator(`link[rel="alternate"][hreflang="${l}"]`)).toHaveAttribute('href','https://fansgta.com'+articlePath(l,a));
  await expect(page.locator('.article-body > section[id]')).toHaveCount(8);
  const figures=page.locator('.full-article .editorial-figure');await expect(figures).toHaveCount(3);
  for(const figure of await figures.all()){
   const img=figure.locator('img');await img.scrollIntoViewIfNeeded();
   await expect.poll(()=>img.evaluate((i:HTMLImageElement)=>i.complete&&i.naturalWidth>0)).toBe(true);
   await expect(img).not.toHaveAttribute('alt','');
   await expect(figure.locator('figcaption a')).toHaveAttribute('href','https://www.rockstargames.com/VI/media/screenshots');
  }
  const html=await(await request.get(path)).text();
  const schema=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])).find(s=>s['@type']==='BlogPosting');
  expect(schema.headline).toBe(a.title[li]);expect(schema.datePublished).toBe('2026-10-31');expect(schema.inLanguage).toBe(locale);expect(schema.citation.length).toBeGreaterThanOrEqual(4);
  expect(html).toContain('index,follow');expect(html).not.toContain('abscloud.org');
  for(const href of new Set(await page.locator('.section-sources a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')!)))){expect(href.startsWith('/'+locale+'/')).toBe(true);expect((await request.get(href)).status()).toBe(200);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.locator('#fansgta-ga4')).toHaveCount(0);
  if(a.id.includes('first-person'))await expect(page.locator('h1')).toContainText({es:'Rumor',en:'Rumour',fr:'Rumeur'}[locale]);
  const target=locale==='es'?'fr':'es';await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(target);await expect(page).toHaveURL(articlePath(target,a));
  if(a.id.includes('underwater')&&locale==='es')await page.screenshot({path:`test-results/ten-interest-${info.project.name}.png`});
 }
 expect(requests.some(u=>u.includes('abscloud.org')||u.includes('googletagmanager.com/gtag/js'))).toBe(false);
});
