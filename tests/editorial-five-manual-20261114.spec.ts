import {finishPublicContentRoutes} from './helpers/public-content';
import {mkdir} from 'node:fs/promises';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {test,expect} from '@playwright/test';
import {articles} from '../.ssr/entry-server.js';
import {articlePath,sectionPath} from '../src/routes';
import {mediaPath} from '../src/media';
import {expectResponsiveEditorialImage} from './helpers/editorial-image';

const origin='https://fansgta.com';
const locales=['es','en','fr'] as const;
const ids=["gta6-macca-and-friends-weazel-tv-20261114", "gta6-kick-sunset-reward-case-20261114", "gta6-pocketpair-five-day-leave-20261114", "gta6-record-transfer-clips-ps5-xbox-20261114", "gta6-account-security-passkeys-2fa-20261114"];
const expectedCategories:Record<string,string>={"gta6-macca-and-friends-weazel-tv-20261114": "news", "gta6-kick-sunset-reward-case-20261114": "news", "gta6-pocketpair-five-day-leave-20261114": "news", "gta6-record-transfer-clips-ps5-xbox-20261114": "guides", "gta6-account-security-passkeys-2fa-20261114": "guides"};
const selected=ids.map(id=>{
 const article=articles.find(article=>article.id===id);
 if(!article)throw new Error(`Build the November 14 five-topic batch before testing: missing ${id}`);
 return article;
});
const social='https://bauval.org/14/72f531d35d71d31735aa4e4bae1dae41';
const adsense='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1382859681401211';
const normal=(value:string)=>value.replace(/\s+/g,' ').trim();
const screenshotDir='/tmp/fansgta-five-20261114/screenshots';

test.afterEach(async({page,baseURL})=>{await finishPublicContentRoutes(page,baseURL);});

test.beforeEach(async({page})=>{
 // Provider fixtures make content/navigation tests deterministic. They do not
 // demonstrate real creative delivery or Analytics event receipt.
 for(const host of ['https://bauval.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])
  await page.route(host,route=>route.fulfill({status:200,contentType:'application/javascript',body:''}));
});

for(const [li,locale] of locales.entries())test(`November 14 five new topics in ${locale}: initial HTML, SEO, actual media and language navigation`,async({page,request},info)=>{
 test.setTimeout(360000);
 expect(new Set(ids).size).toBe(5);
 const errors:string[]=[],consoleErrors:string[]=[],analyticsRequests:string[]=[];
 page.on('pageerror',error=>errors.push(error.message));
 page.on('console',message=>{if(message.type()==='error')consoleErrors.push(message.text());});
 page.on('request',request=>{if(request.url().includes('googletagmanager.com/gtag/js'))analyticsRequests.push(request.url());});
 const sitemapResponse=await request.get('/sitemap.xml');expect(sitemapResponse.status()).toBe(200);
 const sitemap=await sitemapResponse.text();
 const homeResponse=await request.get(`/${locale}/`);expect(homeResponse.status()).toBe(200);
 const home=await homeResponse.text(),archives=new Map<string,string>();
 await mkdir(screenshotDir,{recursive:true});

 for(const article of selected){
  const path=articlePath(locale,article),canonical=origin+path,archivePath=sectionPath(locale,article.category);
  expect(article.category).toBe(expectedCategories[article.id]);
  expect(home).toContain(`href="${archivePath}"`);
  if(!archives.has(archivePath)){
   const response=await request.get(archivePath);expect(response.status()).toBe(200);
   archives.set(archivePath,await response.text());
  }
  expect(archives.get(archivePath)).toContain(`href="${path}"`);
  const sitemapItems=[...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match=>match[1]).filter(item=>item.includes(`<loc>${canonical}</loc>`));
  expect(sitemapItems).toHaveLength(1);
  expect(sitemapItems[0]).toContain(`<lastmod>${article.updated}</lastmod>`);
  for(const language of locales)expect(sitemapItems[0]).toContain(`hreflang="${language}" href="${origin+articlePath(language,article)}"`);

  const response=await request.get(path);expect(response.status()).toBe(200);
  expect(response.headers()['x-robots-tag']??'').not.toMatch(/noindex/i);
  const html=await response.text(),head=html.split('</head>')[0];
  const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  expect(main,'The initial HTML must contain the rendered article, beyond its hydration JSON.').toBeDefined();
  expect(head).toContain(`rel="canonical" href="${canonical}"`);
  expect(head).toContain('name="robots" content="index,follow,max-image-preview:large"');
  for(const section of article.sections)for(const paragraph of section.paragraphs)
   expect(main).toContain(renderToStaticMarkup(createElement('p',null,paragraph[li])));
  const schemas=[...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match=>JSON.parse(match[1]));
  const post=schemas.find(schema=>['Article','NewsArticle','BlogPosting'].includes(schema['@type']));
  expect(post).toMatchObject({headline:article.title[li],description:article.excerpt[li],inLanguage:locale,mainEntityOfPage:canonical,datePublished:article.published,dateModified:article.updated,author:{name:'FansGTA'},publisher:{name:'FansGTA'}});
  expect(post.image).toBe(origin+mediaPath(article.image));
  expect(post.citation).toEqual(article.sources.map(source=>source.url));
  const breadcrumb=schemas.find(schema=>schema['@type']==='BreadcrumbList');
  expect(breadcrumb.itemListElement.map((item:{item:string})=>item.item)).toEqual([origin+`/${locale}/`,origin+archivePath,canonical]);

  const navigation=await page.goto(path);expect(navigation?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);await expect(page.locator('h1')).toHaveText(article.title[li]);
  await expect(page).toHaveTitle(article.title[li]+' | FansGTA');
  await expect(page.locator('html')).toHaveAttribute('lang',locale);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',article.excerpt[li]);
  await expect(page.locator('.article-lead')).toHaveText(article.excerpt[li]);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','index,follow,max-image-preview:large');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',canonical);
  for(const language of locales)await expect(page.locator(`link[hreflang="${language}"]`)).toHaveAttribute('href',origin+articlePath(language,article));
  await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href',origin+articlePath('es',article));
  await expect(page.locator(`time[datetime="${article.published}"]`).first()).toBeVisible();
  if(article.updated!==article.published)await expect(page.locator(`time[datetime="${article.updated}"]`)).toBeVisible();

  const sections=page.locator('.article-body > section[id]');await expect(sections).toHaveCount(article.sections.length);
  for(const [index,expected] of article.sections.entries()){
   const section=sections.nth(index);await expect(section.locator('h2')).toHaveText(expected.heading[li]);
   expect((await section.locator(':scope > p').allTextContents()).map(normal)).toEqual(expected.paragraphs.map(paragraph=>normal(paragraph[li])));
   if(expected.table){
    const rows:string[][]=[];
    for(const row of await section.locator('table tr').all())rows.push((await row.locator(':scope > th,:scope > td').allTextContents()).map(normal));
    expect(rows).toEqual([expected.table.headers.map(header=>normal(header[li])),...expected.table.rows.map(row=>row.map(cell=>normal(cell[li])))]);
   }
  }
  expect(await page.locator('.source-box a').evaluateAll(links=>links.map(link=>link.getAttribute('href')))).toEqual(article.sources.map(source=>source.url));

  const expectedImages=[
   {key:article.image,alt:article.imageAlt,caption:article.imageCaption,credit:article.imageCredit},
   ...article.sections.flatMap(section=>section.image?[section.image]:[]),
  ];
  expect(expectedImages).toHaveLength(3);
  const figures=page.locator('.full-article .editorial-figure');await expect(figures).toHaveCount(3);
  for(const [index,expected] of expectedImages.entries()){
   expect(expected.alt?.[li]).toBeTruthy();expect(expected.caption?.[li]).toBeTruthy();
   const figure=figures.nth(index),image=figure.locator('img');await image.scrollIntoViewIfNeeded();
   await expect(image).toHaveAttribute('src',mediaPath(expected.key));await expect(image).toHaveAttribute('alt',expected.alt![li]);
   await expect(image).toHaveAttribute('loading',index===0?'eager':'lazy');
   if(index===0)await expect(image).toHaveAttribute('fetchpriority','high');
   await expectResponsiveEditorialImage(image);
   await expect(figure.locator('figcaption')).toContainText(expected.caption![li]);
   await expect(figure.locator('figcaption a')).toHaveAttribute('href',expected.credit?.url??article.imageCredit?.url??'https://www.rockstargames.com/VI/media');
  }

  const internal=[...new Set(await page.locator('.section-sources a[href^="/"]').evaluateAll(links=>links.map(link=>link.getAttribute('href')!)))];
  expect(internal.length).toBeGreaterThan(0);
  for(const href of internal){
   expect(href.startsWith(`/${locale}/`)).toBe(true);
   const linked=await request.get(href);expect(linked.status(),href).toBe(200);
  }
  await expect(page.locator(`script[src="${social}"]`)).toHaveCount(1);
  await expect(page.locator(`script[src="${social}"]`)).toHaveAttribute('data-cfasync','false');
  await expect(page.locator(`script[src="${adsense}"]`)).toHaveCount(1);
  await expect(page.locator(`script[src="${adsense}"]`)).toHaveAttribute('data-cfasync','false');
  await expect(page.locator('meta[name="google-adsense-account"]')).toHaveAttribute('content','ca-pub-1382859681401211');
  await expect(page.locator('#fansgta-ga4,script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(0);
  expect(html).not.toContain('abscloud.org');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  if(locale==='es'){
   await page.evaluate(()=>scrollTo(0,0));
   await page.screenshot({path:`${screenshotDir}/${article.id}-${info.project.name}.png`});
  }
  const next=locales[(li+1)%locales.length];
  await page.evaluate(()=>scrollTo(0,0));
  await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(next);
  await expect(page).toHaveURL(articlePath(next,article));await expect(page.locator('h1')).toHaveText(article.title[locales.indexOf(next)]);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',origin+articlePath(next,article));
  await expect(page.locator(`script[src="${social}"]`)).toHaveCount(1);
  await expect(page.locator(`script[src="${adsense}"]`)).toHaveCount(1);
  await expect(page.locator('#fansgta-ga4,script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
 expect(analyticsRequests).toEqual([]);expect(errors).toEqual([]);expect(consoleErrors).toEqual([]);
});
