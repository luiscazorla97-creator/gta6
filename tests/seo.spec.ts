import {test,expect} from '@playwright/test';
import {articles} from '../.ssr/entry-server.js';
import {articlePath,sectionPath} from '../src/routes';
import {relatedArticles} from '../src/related-articles';
import type {Article} from '../src/articles';

test.beforeEach(async({page})=>{
 for(const host of ['https://bauval.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])
  await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
});

test('related links include older articles and remain complete after a new publication',()=>{
 const existing:Pick<Article,'id'|'slug'|'category'>[]=[
  {id:'licences',category:'guides',slug:['a','ps5-padlock-restore-licences','a']},
  {id:'sharing',category:'guides',slug:['b','ps5-sharing-profiles-licences','b']},
  {id:'wildlife',category:'guides',slug:['c','animals-wildlife-leonida','c']},
 ];
 const added:Pick<Article,'id'|'slug'|'category'>={id:'new',category:'guides',slug:['d','ps5-game-sharing-licence-help','d']};
 for(const entries of [existing,[added,...existing]]){
  const incoming=new Set<string>();
  for(const current of entries){
   const related=relatedArticles(entries,current);
   expect(related).not.toContain(current);expect(new Set(related.map(a=>a.id)).size).toBe(related.length);
   for(const a of related)incoming.add(a.id);
  }
  expect([...incoming].sort()).toEqual(entries.map(a=>a.id).sort());
 }
 const a=articles.find(a=>a.id==='gta6-ps5-padlock-restore-licences-20261108')!;
 expect(relatedArticles(articles,a).some(a=>a.id==='gta6-ps5-household-sharing-20261105')).toBe(true);
});

for(const [li,locale] of (['es','en','fr'] as const).entries()){
 test(`initial HTML and hydrated related links match in ${locale}`,async({page,request,browser},info)=>{
  const article=articles.find(a=>a.id==='gta6-fishing-20261031')!;
  const path=articlePath(locale,article),html=await(await request.get(path)).text();
  const initial=html.match(/<section class="related">([\s\S]*?)<\/section>/)![1];
  const hrefs=[...new Set([...initial.matchAll(/href="([^\"]+)"/g)].map(m=>m[1]).filter(h=>h.startsWith('/')))];
  expect(hrefs).toHaveLength(3);
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(path);await expect(page.locator('h1')).toHaveText(article.title[li]);
  await page.getByRole('button',{name:{es:'Favoritos',en:'Bookmarks',fr:'Favoris'}[locale],exact:true}).click();
  await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');
  const hydrated=await page.locator('.related a[href^="/"]').evaluateAll(as=>[...new Set(as.map(a=>a.getAttribute('href')!))]);
  expect(hydrated).toEqual(hrefs);expect(errors).toEqual([]);
  const archive=await(await request.get(sectionPath(locale,article.category))).text();
  expect(archive).toContain(path);
  const context=await browser.newContext({javaScriptEnabled:false,viewport:info.project.use.viewport});
  const plain=await context.newPage();
  await plain.goto(path);await expect(plain.locator('.article-body')).toContainText(article.sections[0].paragraphs[0][li]);
  await expect(plain.locator('.related .archive-card')).toHaveCount(3);
  await context.close();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 });
}
