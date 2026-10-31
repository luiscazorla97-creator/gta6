import {test,expect} from '@playwright/test';
import {cheatsRumours20261030 as rumours} from '../src/batches/2026-10-30-cheats-rumours';
import {sagaCheats20261030 as catalogue,sagaCheatOrder} from '../src/batches/2026-10-30-saga-cheats';
import {articles} from '../src/articles';
import {sectionPath,articlePath} from '../src/routes';

test.beforeEach(async({page})=>{
 for(const host of ['https://bauval.org/**','https://abscloud.org/**','https://www.googletagmanager.com/**','https://pagead2.googlesyndication.com/**'])await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
});

test('rumours update preserves URLs and separates speculation from native codes',async({page,request})=>{
 expect(rumours.id).toBe('cheats-check');expect(rumours.published).toBe('2026-10-27');expect(rumours.updated).toBe('2026-10-30');
 expect(rumours.slug).toEqual(['verificar-trucos-gta-6','verify-gta-6-cheat-codes','verifier-codes-gta-6']);
 for(const [li,locale]of(['es','en','fr']as const).entries()){
  await page.goto(articlePath(locale,rumours));await expect(page.getByRole('heading',{level:1})).toHaveText(rumours.title[li]);
  await expect(page.locator('.article-lead')).toHaveText(rumours.excerpt[li]);await expect(page.locator('.full-article>.editorial-figure img')).toHaveAttribute('alt',rumours.imageAlt![li]);
  for(const img of await page.locator('.full-article .editorial-figure img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate((e:HTMLImageElement)=>e.complete&&e.naturalWidth>0)).toBe(true);}
  await expect(page.locator('.full-article .editorial-figure')).toHaveCount(2);
  await expect(page.locator('.article-body section').first()).toContainText({es:'no encontramos combinaciones verificadas',en:'no verified combinations',fr:'aucun code vérifié'}[locale]);
  for(const href of await page.locator('.section-sources a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')!))){expect(href.startsWith(`/${locale}/`)).toBe(true);expect((await request.get(href)).status()).toBe(200);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
});

test('catalogue is an expanded directory linking every independent game article, never a combined code list',async({page,request})=>{
 expect(sagaCheatOrder).toEqual(['vi','online','gta5','tbogt','cw','tlad','iv','vcs','lcs','sa','advance','vc','iii','gta2','london61','london69','gta1']);
 const games=articles.filter(a=>a.cheats).sort((a,b)=>a.cheats!.order-b.cheats!.order);
 expect(games).toHaveLength(17);expect(catalogue.sections.some(s=>s.codeGroups||s.table)).toBe(false);
 for(const [li,locale]of(['es','en','fr']as const).entries()){
  await page.goto(articlePath(locale,catalogue));await expect(page.getByRole('heading',{level:1})).toHaveText(catalogue.title[li]);
  const index=page.locator('nav.cheat-game-index');await expect(index).toBeVisible();await expect(index.locator('a')).toHaveCount(17);
  expect(await index.locator('a').allTextContents()).toEqual(games.map(a=>a.cheats!.game));
  await expect(page.locator('.article-body table')).toHaveCount(0);await expect(page.locator('.article-body')).not.toContainText('HESOYAM');
  for(const game of games){const href=articlePath(locale,game);await expect(index.locator(`a[href="${href}"]`)).toBeVisible();const r=await request.get(href);expect(r.status()).toBe(200);const html=await r.text();expect(html).toContain(game.title[li]);}
  const sa=games.find(a=>a.id==='cheats-sa-20261030')!;await index.locator(`a[href="${articlePath(locale,sa)}"]`).click();await expect(page).toHaveURL(articlePath(locale,sa));
  await expect(page.locator('h1')).toHaveText(sa.title[li]);await page.locator('.cheat-code-group summary').first().click();const pc=page.locator('.cheat-code-group').first();await expect(pc).toContainText('HESOYAM');await expect(pc).toContainText('GUSNHDE');await expect(pc).toContainText('THEGAMBLER');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
});

test('cheat section presents one card per game before the general index',async({page})=>{
 const games=articles.filter(a=>a.cheats).sort((a,b)=>a.cheats!.order-b.cheats!.order);
 for(const locale of ['es','en','fr']as const){
  await page.goto(sectionPath(locale,'cheats'));
  const cards=page.locator('.archive-grid').first().locator('.archive-card');await expect(cards).toHaveCount(18);
  for(const [i,game]of games.entries())await expect(cards.nth(i).locator('h2 a')).toHaveAttribute('href',articlePath(locale,game));
  await expect(cards.last().locator('h2 a')).toHaveAttribute('href',articlePath(locale,catalogue));
  await expect(page.locator('.archive-heading')).toContainText({es:'Un artículo independiente por cada GTA',en:'One independent article for each GTA',fr:'Un article indépendant par GTA'}[locale]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
});

test('six editions retain crawlable content, localized metadata and linked alternates',async({request})=>{
 const sitemap=await(await request.get('/sitemap.xml')).text();
 for(const a of[rumours,catalogue])for(const[li,locale]of(['es','en','fr']as const).entries()){
  const path=articlePath(locale,a),url='https://fansgta.com'+path;const r=await request.get(path);expect(r.status()).toBe(200);const html=await r.text();
  expect(html).toContain(`rel="canonical" href="${url}"`);expect(sitemap).toContain(`<loc>${url}</loc>`);expect(html).toContain('content="index,follow"');
  for(const l of['es','en','fr']as const)expect(html).toContain(`hreflang="${l}" href="https://fansgta.com${articlePath(l,a)}"`);
  const schema=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])).find(x=>x['@type']==='BlogPosting');
  expect(schema.headline).toBe(a.title[li]);expect(schema.datePublished).toBe(a.published);expect(schema.dateModified).toBe(a.updated);expect(schema.description).toBe(a.excerpt[li]);
  if(a===catalogue){expect(html).not.toContain('HESOYAM');expect(html).toContain('cheat-game-index');const list=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])).find(x=>x['@type']==='ItemList');expect(list.numberOfItems).toBe(17);expect(list.itemListElement[2].url).toBe('https://fansgta.com'+articlePath(locale,articles.find(a=>a.id==='gta5-complete-cheats-20261030')!));}
 }
});

test('language selector keeps the game directory and its independent article links usable',async({page})=>{
 await page.goto(articlePath('es',catalogue));
 for(const [li,locale]of(['es','en','fr']as const).entries()){
  await expect(page).toHaveURL(articlePath(locale,catalogue));await expect(page.getByRole('heading',{level:1})).toHaveText(catalogue.title[li]);
  await expect(page.locator('nav.cheat-game-index a')).toHaveCount(17);await expect(page.locator('nav.cheat-game-index a').first()).toBeVisible();
  if(li<2)await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(['es','en','fr'][li+1]);
 }
});
