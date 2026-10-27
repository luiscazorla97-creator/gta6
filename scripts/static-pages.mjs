import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { App, articles, articlePath, sectionPath, sectionKeys, copy, categoryLabel } from '../.ssr/entry-server.js';
const template=await readFile('dist/index.html','utf8');
const indexable=process.env.FANSGTA_INDEXABLE==='1';
const origin='https://fansgta.com';
const descriptions={es:'Noticias con contexto, guías y análisis originales de GTA VI. Portal independiente de fans en español, inglés y francés.',en:'GTA VI news with context, original guides and analysis. An independent fan portal in English, Spanish and French.',fr:'Actualités contextualisées, guides et analyses originaux de GTA VI. Un portail de fans indépendant en français, anglais et espagnol.'};
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const json=s=>JSON.stringify(s).replaceAll('<','\\u003c');
const sitemap=[];
let generated=0;
async function renderPage(locale,path,{section,article,missing=false}={}) {
 const li=['es','en','fr'].indexOf(locale);
 const eligible=!missing&&(!section||articles.some(a=>a.category===section));
 const canonical=origin+path;
 const title=missing?'404 — FansGTA':article?`${article.title[li]} | FansGTA`:section?`${categoryLabel(locale,section)} | GTA VI | FansGTA`:`FansGTA — ${copy[locale].hero.join(' ')}`;
 const description=article?article.excerpt[li]:section?`${categoryLabel(locale,section)} — ${descriptions[locale]}`:descriptions[locale];
 const alternate=l=>origin+(article?articlePath(l,article):section?sectionPath(l,section):`/${l}/`);
 const alternates=missing?'':['es','en','fr','x-default'].map(l=>`<link rel="alternate" hreflang="${l}" href="${alternate(l==='x-default'?'es':l)}"/>`).join('');
 const schema=[];
 if(!missing){
  const crumbs=[{name:copy[locale].nav[0],item:origin+`/${locale}/`}];
  if(section)crumbs.push({name:categoryLabel(locale,section),item:origin+sectionPath(locale,section)});
  if(article)crumbs.push({name:article.title[li],item:canonical});
  schema.push({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))});
  if(article)schema.push({'@context':'https://schema.org','@type':'BlogPosting',headline:article.title[li],description,datePublished:article.published,dateModified:article.updated,inLanguage:locale,mainEntityOfPage:canonical,author:{'@type':'Organization',name:'FansGTA',url:origin},publisher:{'@type':'Organization',name:'FansGTA',url:origin},articleSection:categoryLabel(locale,section),citation:article.sources.map(s=>s.url)});
  else if(!section)schema.push({'@context':'https://schema.org','@type':'WebSite',name:'FansGTA',url:origin,inLanguage:['es','en','fr']});
 }
 const meta=`<meta name="robots" content="${indexable&&eligible?'index,follow':'noindex,follow'}"/><meta property="og:type" content="${article?'article':'website'}"/><meta property="og:site_name" content="FansGTA"/><meta property="og:title" content="${escape(title)}"/><meta property="og:description" content="${escape(description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:locale" content="${{es:'es_ES',en:'en_US',fr:'fr_FR'}[locale]}"/><meta name="twitter:card" content="summary"/>${alternates}`+schema.map(s=>`<script type="application/ld+json">${json(s)}</script>`).join('');
 const body=renderToString(createElement(App,{initialLocale:locale,initialPath:path,initialNotFound:missing}));
 const page=template.replace('lang="es"',`lang="${locale}"`).replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`).replace(/name="description" content="[^"]*"/,`name="description" content="${escape(description)}"`).replace('https://fansgta.com/es/',canonical).replace('</head>',meta+'</head>').replace('<div id="root"></div>',`<div id="root"${missing?' data-not-found="true"':''}>${body}</div>`);
 const target=missing?'dist/404.html':`dist${path}index.html`;
 await mkdir(target.slice(0,target.lastIndexOf('/')),{recursive:true});await writeFile(target,page);
 if(!section&&!missing&&locale==='es')await writeFile('dist/index.html',page);
 if(eligible&&!missing)sitemap.push({path,lastmod:article?.updated,alternates:['es','en','fr'].map(l=>({lang:l,url:alternate(l)}))});
 generated++;
}
for(const locale of ['es','en','fr']){
 await renderPage(locale,`/${locale}/`);
 for(const section of sectionKeys)await renderPage(locale,sectionPath(locale,section),{section});
 for(const article of articles)await renderPage(locale,articlePath(locale,article),{section:article.category,article});
}
await renderPage('es','/404/',{missing:true});
await writeFile('dist/robots.txt','User-agent: *\nDisallow: /admin\nSitemap: https://fansgta.com/sitemap.xml\n');
await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+sitemap.map(s=>`<url><loc>${origin+s.path}</loc>${s.lastmod?`<lastmod>${s.lastmod}</lastmod>`:''}${s.alternates.map(a=>`<xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.url}"/>`).join('')}</url>`).join('')+'</urlset>');
console.log(`Generated ${generated} static pages with ${articles.length} articles in 3 languages. Indexing: ${indexable?'enabled for editorial pages; empty sections excluded':'disabled for staging'}.`);
