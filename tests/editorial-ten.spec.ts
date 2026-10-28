import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { tenArticles20261028 } from '../src/batches/2026-10-28-ten';
import { articles } from '../src/articles';
import { articlePath } from '../src/routes';
import { mediaPath } from '../src/media';
import type { Locale } from '../src/content';

const origin='https://fansgta.com';
const locales:Locale[]=['es','en','fr'];
const mediaSource='https://www.rockstargames.com/VI/media';
const credits=JSON.parse(readFileSync(new URL('../public/media/credits.json',import.meta.url),'utf8')) as Record<string,{owner:string;sourcePage:string;url:string}>;
const policy=readFileSync(new URL('../public/_headers',import.meta.url),'utf8').match(/^\s+Content-Security-Policy:\s*(.+)$/m)?.[1];
const escape=(text:string)=>text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const decode=(text:string)=>text.replaceAll('&#x27;',"'").replaceAll('&#39;',"'").replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&amp;','&');
function creditedImage(image:string){
 const key=mediaPath(image).split('/').pop()!.replace('.webp','');
 expect(credits[key],`Missing rights/source record for ${image}`).toBeDefined();
 expect(credits[key].owner).toBe('Rockstar Games');
 expect(credits[key].sourcePage).toMatch(/^https:\/\/www\.rockstargames\.com\/VI\/media(?:\/|$)/);
 expect(credits[key].url).toMatch(/^https:\/\/(www\.)?rockstargames\.com\//);
}
function localReference(url:string,locale:Locale){
 const target=articles.find(article=>origin+articlePath('es',article)===url);
 return target?articlePath(locale,target):url;
}

test.beforeEach(async({page})=>{
 await page.route('https://bauval.org/**',route=>route.fulfill({status:200,contentType:'application/javascript',body:''}));
 await page.route('https://www.youtube-nocookie.com/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><html><body>Player fixture</body></html>'}));
 if(!policy)throw new Error('Missing production Content-Security-Policy');
 await page.route('http://127.0.0.1:4173/**',async route=>{
  if(route.request().resourceType()!=='document')return route.continue();
  const response=await route.fetch();
  await route.fulfill({response,headers:{...response.headers(),'content-security-policy':policy}});
 });
});

test('ten new topics have thirty complete localized static versions, metadata and recorded image sources',async({request})=>{
 expect(tenArticles20261028).toHaveLength(10);
 expect(new Set(tenArticles20261028.map(article=>article.id)).size).toBe(10);
 const sitemap=await (await request.get('/sitemap.xml')).text();
 const paths=new Set<string>();
 for(const article of tenArticles20261028){
  expect(article.sections.length,article.id).toBeGreaterThanOrEqual(5);
  expect(article.sources.length,article.id).toBeGreaterThan(0);
  creditedImage(article.image);
  for(const section of article.sections){
   if(section.image){creditedImage(section.image.key);expect(section.image.alt).toHaveLength(3);expect(section.image.caption).toHaveLength(3);}
   for(const reference of section.references??[])expect(reference.url).toMatch(/^https:\/\//);
  }
  for(const [index,locale] of locales.entries()){
   const path=articlePath(locale,article),canonical=origin+path;
   expect(paths.has(path),`Duplicate localized route: ${path}`).toBe(false);paths.add(path);
   const response=await request.get(path);expect(response.status(),path).toBe(200);
   const html=await response.text();
   expect(html).toContain(`<html lang="${locale}"`);
   const headings=[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
   expect(headings,path).toHaveLength(1);expect(decode(headings[0][1].replace(/<[^>]*>/g,''))).toBe(article.title[index]);
   expect(html).toContain(`<title>${escape(article.title[index])} | FansGTA</title>`);
   expect(html).toContain(`<meta name="description" content="${escape(article.excerpt[index])}"`);
   expect(html).toContain(`rel="canonical" href="${canonical}"`);
   expect(html).toContain('content="index,follow"');
   for(const alternate of locales)expect(html).toContain(`hreflang="${alternate}" href="${origin+articlePath(alternate,article)}"`);
   expect(html).toContain(`hreflang="x-default" href="${origin+articlePath('es',article)}"`);
   const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match=>JSON.parse(match[1]));
   const schema=schemas.find(value=>value['@type']==='BlogPosting');
   expect(schema,path).toBeDefined();
   expect(schema.headline).toBe(article.title[index]);expect(schema.description).toBe(article.excerpt[index]);
   expect(schema.inLanguage).toBe(locale);expect(schema.mainEntityOfPage).toBe(canonical);
   expect(schema.image).toBe(origin+mediaPath(article.image));expect(schema.datePublished).toBe(article.published);expect(schema.dateModified).toBe(article.updated);
   expect(schema.citation).toEqual(article.sources.map(source=>source.url));
   expect(sitemap).toContain(`<loc>${canonical}</loc>`);
   expect(html).toContain(`src="${mediaPath(article.image)}"`);
   expect(html).toContain('GTA VI © Rockstar Games');
   const words=[article.excerpt[index],...article.sections.flatMap(section=>[section.heading[index],...section.paragraphs.map(paragraph=>paragraph[index])])].join(' ');
   expect(words.trim().split(/\s+/).length,`${locale}: ${article.id}`).toBeGreaterThanOrEqual(250);
   expect(words).not.toMatch(/lorem ipsum|\bTODO:|\bTBD\b|\bPLACEHOLDER\b|INSERT TEXT|texte à compléter|reemplazar este texto/i);
   for(const section of article.sections){
    expect(section.heading[index].trim()).not.toBe('');
    expect(decode(html)).toContain(section.heading[index]);
    expect(section.paragraphs.length).toBeGreaterThan(0);
    for(const paragraph of section.paragraphs){expect(paragraph[index].trim()).not.toBe('');expect(decode(html)).toContain(paragraph[index]);}
    for(const reference of section.references??[])expect(html).toContain(`href="${escape(localReference(reference.url,locale))}"`);
    if(section.image){
     expect(html).toContain(`src="${mediaPath(section.image.key)}" alt="${escape(section.image.alt[index]).replaceAll("'",'&#x27;')}" width="1600" height="900" loading="lazy"`);
     expect(decode(html)).toContain(section.image.caption[index]);
     expect(html).toContain(`href="${mediaSource}"`);
    }
   }
   for(const source of article.sources){expect(source.url).toMatch(/^https:\/\//);expect(html).toContain(`href="${escape(source.url)}"`);}
  }
 }
 expect(paths.size).toBe(30);
});

for(const article of tenArticles20261028){
 test(`new topic ${article.id} keeps the same article across Spanish, English and French`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(articlePath('es',article));
  for(const [index,locale] of locales.entries()){
   await expect(page).toHaveURL(articlePath(locale,article));
   await expect(page.getByRole('heading',{level:1})).toHaveText(article.title[index]);
   await expect(page.locator('html')).toHaveAttribute('lang',locale);
   await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',origin+articlePath(locale,article));
   const cover=page.locator('.full-article > .editorial-figure img');
   await expect(cover).toHaveAttribute('src',mediaPath(article.image));
   await expect(cover).toHaveAttribute('alt',/\S/);
   await expect.poll(()=>cover.evaluate((image:HTMLImageElement)=>image.complete&&image.naturalWidth>0)).toBe(true);
   await expect(page.locator('.full-article > .editorial-figure figcaption')).toContainText('Rockstar Games');
   for(const [sectionIndex,section] of article.sections.entries()){
    const sectionRoot=page.locator(`#section-${sectionIndex+1}`);
    for(const reference of section.references??[]){
     const href=localReference(reference.url,locale);
     expect(await sectionRoot.locator('.section-sources a').evaluateAll(links=>links.map(link=>link.getAttribute('href')))).toContain(href);
    }
    if(section.image){
     const image=sectionRoot.locator('figure.editorial-figure img');await image.scrollIntoViewIfNeeded();
     await expect(image).toHaveAttribute('alt',section.image.alt[index]);
     await expect(image).toHaveAttribute('loading','lazy');
     await expect.poll(()=>image.evaluate((element:HTMLImageElement)=>element.complete&&element.naturalWidth>0)).toBe(true);
     await expect(sectionRoot.locator('figure.editorial-figure figcaption')).toContainText(section.image.caption[index]);
     await expect(sectionRoot.locator('figure.editorial-figure figcaption a')).toHaveAttribute('href',mediaSource);
    }
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${locale}: ${article.id}`).toBe(true);
   if(index<locales.length-1)await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(locales[index+1]);
  }
  expect(errors).toEqual([]);
 });
}
