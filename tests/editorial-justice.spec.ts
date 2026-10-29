import {test,expect} from '@playwright/test';
import {justice20261029} from '../src/batches/2026-10-29-justice';
import {articlePath} from '../src/routes';
import {mediaPath} from '../src/media';

test('the cloud publication batch has three complete, indexable and linked language editions',async({request})=>{
 expect(justice20261029).toHaveLength(1);
 const sitemap=await (await request.get('/sitemap.xml')).text();
 for(const article of justice20261029){
  expect(article.sections.length).toBeGreaterThanOrEqual(5);
  for(const [index,locale] of (['es','en','fr'] as const).entries()){
   const path=articlePath(locale,article),url='https://fansgta.com'+path;
   const response=await request.get(path);expect(response.status()).toBe(200);
   const html=await response.text();
   expect(html).toContain(`lang="${locale}"`);
   expect(html).toContain(`rel="canonical" href="${url}"`);
   expect(html).toContain('content="index,follow"');
   expect(sitemap).toContain(`<loc>${url}</loc>`);
   for(const language of ['es','en','fr'] as const)expect(html).toContain(`hreflang="${language}" href="https://fansgta.com${articlePath(language,article)}"`);
   const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match=>JSON.parse(match[1]));
   const schema=schemas.find(item=>item['@type']==='BlogPosting');
   expect(schema.headline).toBe(article.title[index]);expect(schema.description).toBe(article.excerpt[index]);expect(schema.inLanguage).toBe(locale);
   expect(schema.datePublished).toBe('2026-10-29');expect(schema.citation).toEqual(article.sources.map(source=>source.url));
   const words=article.sections.flatMap(section=>section.paragraphs.map(paragraph=>paragraph[index])).join(' ');
   expect(words.split(/\s+/).length).toBeGreaterThanOrEqual(200);
   expect(words).not.toMatch(/lorem ipsum|\bTODO:|\bTBD\b|PLACEHOLDER/i);
   expect(html).toContain('GTA VI © Rockstar Games');expect(html).toContain(`src="${mediaPath(article.image)}"`);
  }
 }
});

for(const article of justice20261029){
 test(`cloud article ${article.id} keeps images, language navigation and mobile layout`,async({page})=>{
  await page.route('https://bauval.org/**',route=>route.fulfill({status:200,contentType:'application/javascript',body:''}));
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(articlePath('es',article));
  for(const [index,locale] of (['es','en','fr'] as const).entries()){
   await expect(page).toHaveURL(articlePath(locale,article));
   await expect(page.getByRole('heading',{level:1})).toHaveText(article.title[index]);
   const cover=page.locator('.full-article > .editorial-figure img');
   await expect(cover).toHaveAttribute('alt',/\S/);
   await expect.poll(()=>cover.evaluate((image:HTMLImageElement)=>image.complete&&image.naturalWidth>0)).toBe(true);
   await expect(page.locator('.full-article > .editorial-figure figcaption')).toContainText(article.imageCaption![index]);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   if(index<2)await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(['es','en','fr'][index+1]);
  }
  expect(errors).toEqual([]);
 });
}
