import {test,expect} from '@playwright/test';
import {manualArticles20261030} from '../src/batches/2026-10-30-manual';
import {articlePath} from '../src/routes';
import {mediaPath} from '../src/media';

test('the cloud publication batch has twelve complete, indexable and linked language editions',async({request})=>{
 expect(manualArticles20261030).toHaveLength(4);
 const sitemap=await (await request.get('/sitemap.xml')).text();
 for(const article of manualArticles20261030){
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
   expect(schema.datePublished).toBe('2026-10-30');expect(schema.citation).toEqual(article.sources.map(source=>source.url));
   const words=article.sections.flatMap(section=>section.paragraphs.map(paragraph=>paragraph[index])).join(' ');
   expect(words.split(/\s+/).length).toBeGreaterThanOrEqual(600);
   expect(words).not.toMatch(/lorem ipsum|\bTODO:|\bTBD\b|PLACEHOLDER/i);
   expect(html).toContain(article.imageCredit?.label??'GTA VI © Rockstar Games');expect(html).toContain('twitter:card');expect(html).toContain('summary_large_image');expect(html).toContain(`name="twitter:image" content="https://fansgta.com${mediaPath(article.image)}"`);expect(html).toContain(`src="${mediaPath(article.image)}"`);
  }
 }
});

for(const article of manualArticles20261030){
 test(`cloud article ${article.id} keeps images, language navigation and mobile layout`,async({page})=>{
  await page.route('https://www.googletagmanager.com/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
  await page.route('https://pagead2.googlesyndication.com/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
  await page.route('https://bauval.org/**',route=>route.fulfill({status:200,contentType:'application/javascript',body:''}));
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(articlePath('es',article));
  for(const [index,locale] of (['es','en','fr'] as const).entries()){
   await expect(page).toHaveURL(articlePath(locale,article));
   await expect(page.getByRole('heading',{level:1})).toHaveText(article.title[index]);await expect(page.getByRole('heading',{level:1})).toHaveCount(1);
   const cover=page.locator('.full-article > .editorial-figure img');
   await expect(cover).toHaveAttribute('alt',/\S/);
   await expect.poll(()=>cover.evaluate((image:HTMLImageElement)=>image.complete&&image.naturalWidth>0)).toBe(true);
   await expect(page.locator('.full-article > .editorial-figure figcaption')).toContainText(article.imageCaption![index]);
   const figures=page.locator('.full-article .editorial-figure');await expect(figures).toHaveCount(3);
   for(const figure of await figures.all()){
    const img=figure.locator('img');await img.scrollIntoViewIfNeeded();
    await expect.poll(()=>img.evaluate((e:HTMLImageElement)=>e.complete&&e.naturalWidth>0)).toBe(true);
    expect(await img.evaluate((e:HTMLImageElement)=>Number(e.getAttribute('width'))===e.naturalWidth&&Number(e.getAttribute('height'))===e.naturalHeight)).toBe(true);
    await expect(figure.locator('figcaption a')).toHaveAttribute('href',article.imageCredit?.url??'https://www.rockstargames.com/VI/media');
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   if(index<2)await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(['es','en','fr'][index+1]);
  }
  expect(errors).toEqual([]);
 });
}

test('GTA V tables retain checked vehicle mappings and literal phone exceptions',async({page})=>{
 const {gta5Cheats}=await import('../src/batches/2026-10-30-gta5-cheat-data');
 expect(gta5Cheats).toHaveLength(36);
 const byCode=Object.fromEntries(gta5Cheats.map(row=>[row.pc,row]));
 expect(byCode.ROCKET.name[1]).toContain('PCJ');
 expect(byCode.ROCKET.phone).toBe('1-999-762-538');
 expect(byCode.OFFROAD.name[1]).toContain('Sanchez');
 expect(byCode.OFFROAD.phone).toBe('1-999-633-7623');
 expect(byCode.CATCHME.phone).toBe('1-999-2288-463');
 expect(byCode.LIQUOR.phone).toBe('1-999-547-861');
 await page.route('https://www.googletagmanager.com/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await page.route('https://pagead2.googlesyndication.com/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 const article=manualArticles20261030.find(item=>item.id==='gta5-complete-cheats-20261030')!;
 await page.goto(articlePath('es',article));
 const tables=page.locator('.cheat-table');await expect(tables).toHaveCount(3);
 for(const table of await tables.all())await expect(table.locator('tbody tr')).toHaveCount(36);
 await expect(tables.nth(0).getByRole('row').filter({hasText:'PCJ'})).toContainText('ROCKET');
 await expect(tables.nth(0).getByRole('row').filter({hasText:'Sanchez'})).toContainText('OFFROAD');
});
