import {test,expect} from '@playwright/test';
import {articles} from '../.ssr/entry-server.js';
import {articlePath,sectionPath} from '../src/routes';
import {relatedArticles} from '../src/related-articles';
import {orderGuides} from '../src/guide-order';
import {fixtureVideoPoster,routePublicContent,finishPublicContentRoutes} from './helpers/public-content';

const locales=['es','en','fr'] as const;
const priorityIds=[
 'legal-purchase-download-2026-10-28',
 'gta6-preload-schedule-20261028',
 'gta6-languages-20261031',
 'gta6-ps5-storage-20261101',
 'gta6-xbox-storage-20261101',
 'gta6-accessibility-console-preparation-20261106',
 'gta6-ps5-3d-audio-settings-20261112',
 'gta6-dualsense-settings-20261112',
 'gta6-xbox-remote-play-20261112',
 'gta6-mobile-remote-20261101',
 'gta6-wildlife-20261031',
 'gta6-car-customisation-20261031',
 'gta6-map-discovery-20261101',
];
const contextualPairs=[
 ['ps5-features-2026-10-28','gta6-ps5-3d-audio-settings-20261112'],
 ['ps5-features-2026-10-28','gta6-dualsense-settings-20261112'],
 ['gta6-accessibility-console-preparation-20261106','gta6-ps5-3d-audio-settings-20261112'],
 ['gta6-accessibility-console-preparation-20261106','gta6-dualsense-settings-20261112'],
 ['gta6-mobile-remote-20261101','gta6-xbox-remote-play-20261112'],
 ['gta6-xbox-app-remote-install-20261111','gta6-xbox-remote-play-20261112'],
];
const getArticle=(id:string)=>{
 const article=articles.find(a=>a.id===id);
 if(!article)throw Error(`Missing article fixture: ${id}`);
 return article;
};
const cardPaths=(html:string)=>[...html.matchAll(/<article\b[^>]*class="archive-card(?: [^"]*)?"[^>]*>([\s\S]*?)<\/article>/g)].map(m=>m[1].match(/\bhref="([^"]+)"/)![1]);
const relatedPaths=(html:string)=>cardPaths(html.match(/<section class="related">([\s\S]*?)<\/section>/)![1]);

test.afterEach(async({page,baseURL})=>{await finishPublicContentRoutes(page,baseURL);});

test.beforeEach(async({page,baseURL})=>{
 await routePublicContent(page,baseURL);
 for(const host of ['https://bauval.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])
  await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
});

test('guide priorities retain every entry and sort the remainder by publication date',()=>{
 const old={id:'old',published:'2026-10-01'},fresh={id:'future-publication',published:'2026-11-13'};
 const sameDay={id:'same-day',published:'2026-10-01'};
 const preload={id:'gta6-preload-schedule-20261028',published:'2026-10-28'};
 const purchase={id:'legal-purchase-download-2026-10-28',published:'2026-10-28'};
 const original=[old,preload,sameDay,fresh,purchase];
 const before=original.slice();
 expect(orderGuides(original)).toEqual([purchase,preload,fresh,old,sameDay]);
 expect(original).toEqual(before);
 const guides=articles.filter(a=>a.category==='guides');
 expect(orderGuides(guides).map(a=>a.id).slice(0,priorityIds.length)).toEqual(priorityIds);
 expect(new Set(orderGuides(guides).map(a=>a.id))).toEqual(new Set(guides.map(a=>a.id)));
});

test('topic preferences preserve the full related-link graph after another publication',()=>{
 const audio=getArticle('gta6-ps5-3d-audio-settings-20261112');
 expect(new Set(relatedArticles(articles,audio).slice(0,2).map(a=>a.id))).toEqual(new Set(['ps5-features-2026-10-28','gta6-accessibility-console-preparation-20261106']));
 const download=getArticle('gta6-download-duration-20261103');
 expect(new Set(relatedArticles(articles,download).slice(0,2).map(a=>a.id))).toEqual(new Set(['gta6-preload-schedule-20261028','gta6-xbox-storage-20261101']));
 const added={...audio,id:'future-guide',slug:['futura','future-guide-new-topic','future'],published:'2026-11-13'};
 for(const entries of [articles,[added,...articles]]){
  const incoming=new Set<string>();
  for(const article of entries){
   const related=relatedArticles(entries,article);
   expect(related).toHaveLength(3);
   expect(new Set(related.map(a=>a.id)).size).toBe(3);
   expect(related.some(a=>a.id===article.id)).toBe(false);
   related.forEach(a=>incoming.add(a.id));
  }
  expect(new Set(entries.filter(a=>entries.filter(b=>b.category===a.category).length>1).map(a=>a.id).filter(id=>!incoming.has(id)))).toEqual(new Set());
 }
});

for(const [li,locale] of locales.entries()){
 test(`home and guide archive retain their structure and localized links in ${locale}`,async({page,request})=>{
  const guides=articles.filter(a=>a.category==='guides');
  const archivePath=sectionPath(locale,'guides');
  const response=await request.get(archivePath);expect(response.status()).toBe(200);
  const html=await response.text(),initial=cardPaths(html);
  const expected=priorityIds.map(id=>articlePath(locale,getArticle(id)));
  expect(initial).toHaveLength(guides.length);
  expect(initial.slice(0,priorityIds.length)).toEqual(expected);
  expect(new Set(initial)).toEqual(new Set(guides.map(a=>articlePath(locale,a))));
  const byPath=new Map<string,{published:string}>(guides.map(a=>[articlePath(locale,a),a]));
  const remainingDates=initial.slice(priorityIds.length).map(path=>byPath.get(path)!.published);
  expect(remainingDates).toEqual(remainingDates.slice().sort().reverse());
  expect(initial.every(path=>path.startsWith(`/${locale}/`))).toBe(true);
  expect(initial).not.toContain(articlePath(locale,getArticle('gta-6-19-november-2026')));
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(archivePath);
  await expect(page.locator('.archive-heading > p')).toContainText({es:'Selección editorial',en:'Editorial selection',fr:'Sélection éditoriale'}[locale]);
  await page.getByRole('button',{name:{es:'Favoritos',en:'Bookmarks',fr:'Favoris'}[locale],exact:true}).click();
  await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');
  const hydrated=await page.locator('.archive-grid > .archive-card').evaluateAll(cards=>cards.map(card=>card.querySelector('a')!.getAttribute('href')));
  expect(hydrated).toEqual(initial);expect(errors).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const home=await(await request.get(`/${locale}/`)).text();
  const guideMarkup=home.match(/<div class="guide-grid">([\s\S]*?)<\/section>/)![1];
  const homeCards=[...guideMarkup.matchAll(/<article class="story-card guide-card">([\s\S]*?)<\/article>/g)];
  expect(homeCards).toHaveLength(2);
  const expectedHome=[
   articlePath(locale,getArticle('legal-purchase-download-2026-10-28')),
   articlePath(locale,getArticle('gta6-preload-schedule-20261028')),
  ];
  expect(homeCards.map(m=>m[1].match(/\bhref="([^"]+)"/)![1])).toEqual(expectedHome);
  expect(guideMarkup).toContain('class="guide-community"');
  expect(guideMarkup).toContain(`href="${sectionPath(locale,'community')}"`);
  await fixtureVideoPoster(page);
  await page.goto(`/${locale}/`);
  await page.getByRole('button',{name:{es:'Favoritos',en:'Bookmarks',fr:'Favoris'}[locale],exact:true}).click();
  await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');
  const hydratedHome=await page.locator('.guide-grid > .story-card.guide-card').evaluateAll(cards=>cards.map(card=>card.querySelector('a')!.getAttribute('href')));
  expect(hydratedHome).toEqual(expectedHome);
  await expect(page.locator('.guide-grid > .guide-community')).toHaveCount(1);
  await expect(page.locator('.guide-grid > .guide-community')).toHaveAttribute('href',sectionPath(locale,'community'));
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  const cheats=articles.filter(a=>a.category==='cheats').sort((a,b)=>(a.cheats?.order??99)-(b.cheats?.order??99));
  const cheatsHTML=await(await request.get(sectionPath(locale,'cheats'))).text();
  expect(cardPaths(cheatsHTML)).toEqual(cheats.map(a=>articlePath(locale,a)));
 });

 test(`curated related links match initial HTML and hydration in ${locale}`,async({page,request})=>{
  for(const id of ['gta6-ps5-3d-audio-settings-20261112','gta6-download-duration-20261103']){
   const article=getArticle(id),path=articlePath(locale,article);
   const response=await request.get(path);expect(response.status()).toBe(200);
   const initial=relatedPaths(await response.text());
   expect(initial).toHaveLength(3);expect(new Set(initial).size).toBe(3);
   expect(initial.every(href=>href.startsWith(`/${locale}/`)&&href!==path)).toBe(true);
   const pair=id==='gta6-ps5-3d-audio-settings-20261112'?['ps5-features-2026-10-28','gta6-accessibility-console-preparation-20261106']:['gta6-preload-schedule-20261028','gta6-xbox-storage-20261101'];
   expect(new Set(initial.slice(0,2))).toEqual(new Set(pair.map(id=>articlePath(locale,getArticle(id)))));
   await page.goto(path);await expect(page.locator('h1')).toHaveText(article.title[li]);
   await page.getByRole('button',{name:{es:'Favoritos',en:'Bookmarks',fr:'Favoris'}[locale],exact:true}).click();
   await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');
   const hydrated=await page.locator('.related .archive-card').evaluateAll(cards=>cards.map(card=>card.querySelector('a')!.getAttribute('href')));
   expect(hydrated).toEqual(initial);
  }
 });

 test(`contextual references are localized in the initial article body in ${locale}`,async({request})=>{
  const cache=new Map<string,string>();
  for(const [sourceId,targetId]of contextualPairs){
   const source=getArticle(sourceId),target=getArticle(targetId),path=articlePath(locale,source);
   if(!cache.has(path)){
    const response=await request.get(path);expect(response.status()).toBe(200);cache.set(path,await response.text());
   }
   const sourceBlocks=[...cache.get(path)!.matchAll(/<div class="section-sources">([\s\S]*?)<\/div>/g)].map(m=>m[1]).join('');
   expect(sourceBlocks).toContain(`href="${articlePath(locale,target)}"`);
   for(const href of [...sourceBlocks.matchAll(/\bhref="([^"]+)"/g)].map(m=>m[1]).filter(href=>href.startsWith('/')))
    expect(href.startsWith(`/${locale}/`)).toBe(true);
  }
 });
}
