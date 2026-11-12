import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {articles,articlePath,sectionPath,sectionKeys,legalKeys,legalPath} from '../.ssr/entry-server.js';

const origin='https://fansgta.com',locales=['es','en','fr'];
const read=path=>readFile(`dist${path}index.html`,'utf8');
const attr=(tag,name)=>tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const tags=(html,name)=>[...html.matchAll(new RegExp(`<${name}\\b[^>]*>`,'g'))].map(m=>m[0]);
const decode=s=>s.replaceAll('&quot;','"').replaceAll('&#x27;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&amp;','&');
const sitemap=await readFile('dist/sitemap.xml','utf8');
const sitemapEntries=new Map([...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([,block])=>[block.match(/<loc>(.*?)<\/loc>/)?.[1],block]));
assert.equal(sitemapEntries.size,[...sitemap.matchAll(/<url>/g)].length,'Duplicate sitemap URLs');
const expected=new Set(),pages=new Map(),paths=new Map();
const inventory=JSON.parse(await readFile('docs/editorial/inventory.json','utf8'));
assert.equal(inventory.length,articles.length,'Editorial inventory is stale');
for(const article of articles){
 const entry=inventory.find(a=>a.id===article.id);
 assert.deepEqual(entry?.paths,locales.map(l=>articlePath(l,article)),`Inventory paths: ${article.id}`);
 for(const locale of locales)paths.set(articlePath(locale,article),article);
}
const latest=items=>items.map(a=>a.updated).sort().at(-1);
async function check(locale,path,alternates,{article,section,legal}={}){
 const html=await read(path),head=html.split('</head>')[0],links=tags(head,'link');pages.set(path,html);
 const eligible=!section||articles.some(a=>a.category===section);
 const robots=tags(head,'meta').filter(t=>attr(t,'name')==='robots');
 assert.equal(robots.length,1,`Robots count: ${path}`);
 const directives=(attr(robots[0],'content')??'').split(',').map(v=>v.trim().toLowerCase());
 assert.equal(new Set(directives).size,directives.length,`Duplicate robots directives: ${path}`);
 assert.deepEqual(new Set(directives),new Set(eligible?['index','follow','max-image-preview:large']:['noindex','follow']),`Indexability and image previews: ${path}; use build:release`);
 const canonical=links.filter(t=>attr(t,'rel')==='canonical');
 assert.deepEqual(canonical.map(t=>attr(t,'href')),[origin+path],`Canonical: ${path}`);
 assert.ok(html.startsWith('<!doctype html>')||html.startsWith('<!DOCTYPE html>'),`HTML doctype: ${path}`);
 assert.ok(html.includes(`<html lang="${locale}">`),`HTML language: ${path}`);
 const alternateLinks=links.filter(t=>attr(t,'rel')==='alternate'&&attr(t,'hreflang'));
 const wanted={...alternates,'x-default':alternates.es};
 assert.equal(alternateLinks.length,4,`Hreflang count: ${path}`);
 for(const [lang,url] of Object.entries(wanted))assert.equal(attr(alternateLinks.find(t=>attr(t,'hreflang')===lang)??'','href'),url,`Hreflang ${lang}: ${path}`);
 if(eligible){
  expected.add(origin+path);assert.ok(sitemapEntries.has(origin+path),`Missing sitemap URL: ${path}`);
  const xml=sitemapEntries.get(origin+path);
  for(const [lang,url] of Object.entries(alternates))assert.ok(xml.includes(`hreflang="${lang}" href="${url}"`),`Sitemap hreflang: ${path}`);
  const date=article?.updated??(legal?undefined:latest(section?articles.filter(a=>a.category===section):articles));
  assert.equal(xml.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],date,`Sitemap lastmod: ${path}`);
 }else assert.ok(!sitemapEntries.has(origin+path),`Empty section in sitemap: ${path}`);
 if(article){
  const li=locales.indexOf(locale),main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main,`No initial HTML content: ${path}`);
  // Verify the actual published paragraphs, not the embedded hydration JSON.
  for(const section of article.sections)for(const paragraph of section.paragraphs)
   assert.ok(main.includes(renderToStaticMarkup(createElement('p',null,paragraph[li]))),`Paragraph missing from initial HTML: ${path}`);
  const schemas=[...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  const schema=schemas.find(s=>['Article','NewsArticle','BlogPosting'].includes(s['@type']));
  assert.ok(schema,`Article structured data: ${path}`);
  for(const [key,value] of Object.entries({headline:article.title[li],mainEntityOfPage:origin+path,inLanguage:locale,datePublished:article.published,dateModified:article.updated}))assert.equal(schema[key],value,`Schema ${key}: ${path}`);
  assert.ok(article.updated>=article.published,`Article dates: ${path}`);
  const images=Array.isArray(schema.image)?schema.image:[schema.image];
  for(const image of images){assert.ok(image.startsWith(origin+'/'),`Local image URL: ${path}`);await stat('dist'+new URL(image).pathname);}
 }
}
for(const locale of locales){
 await check(locale,`/${locale}/`,Object.fromEntries(locales.map(l=>[l,origin+`/${l}/`])));
 for(const legal of legalKeys)await check(locale,legalPath(locale,legal),Object.fromEntries(locales.map(l=>[l,origin+legalPath(l,legal)])),{legal});
 for(const section of sectionKeys)await check(locale,sectionPath(locale,section),Object.fromEntries(locales.map(l=>[l,origin+sectionPath(l,section)])),{section});
 for(const article of articles)await check(locale,articlePath(locale,article),Object.fromEntries(locales.map(l=>[l,origin+articlePath(l,article)])),{section:article.category,article});
}
assert.deepEqual(new Set(sitemapEntries.keys()),expected,'Sitemap has noncanonical, missing or excluded URLs');
const incoming=new Map([...paths.keys()].map(path=>[path,new Set()]));
for(const [source,html] of pages){
 for(const tag of tags(html,'a')){
  const href=decode(attr(tag,'href')??''),url=new URL(href,origin+source);
  if(url.origin!==origin)continue;
  assert.ok(!/^\/(?:ads\/|cdn-cgi\/)/.test(url.pathname),`Technical crawl link in generated HTML: ${source}`);
  if(paths.has(source)&&source!==url.pathname)incoming.get(url.pathname)?.add(source);
 }
}
const weak=[...incoming].filter(([path,refs])=>!refs.size&&articles.filter(a=>a.category===paths.get(path).category).length>1);
assert.deepEqual(weak.map(([path])=>path),[],'Articles without incoming article links');
// The redirect at / does not excuse generating a different fallback document.
// Legal pages also lack a section, so guard against their overwriting home.
assert.equal(await readFile('dist/index.html','utf8'),await read('/es/'),'Root fallback must equal the complete Spanish homepage');
const robots=await readFile('dist/robots.txt','utf8');
assert.ok(robots.includes('Sitemap: '+origin+'/sitemap.xml'),'Robots sitemap declaration');
assert.ok(robots.includes('Disallow: /cdn-cgi/'),'Cloudflare technical URLs should not be crawled');
assert.ok(!/^Disallow:\s*\/$/m.test(robots),'Robots blocks the entire site');
assert.ok(!/x-robots-tag:\s*noindex/i.test(await readFile('dist/_headers','utf8')),'Global HTTP noindex');
const missingPage=await readFile('dist/404.html','utf8');
assert.ok(/name="robots" content="noindex,follow"/.test(missingPage),'404 must remain excluded');
assert.ok(!missingPage.includes('max-image-preview:large'),'404 must not permit large previews');
console.log(`SEO verified: ${paths.size} article URLs, ${expected.size} canonical sitemap entries, reciprocal hreflang, initial HTML paragraphs and article links.`);
