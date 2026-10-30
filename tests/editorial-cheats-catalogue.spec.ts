import {test,expect} from '@playwright/test';
import {cheatsRumours20261030 as rumours} from '../src/batches/2026-10-30-cheats-rumours';
import {sagaCheats20261030 as catalogue,sagaCheatOrder} from '../src/batches/2026-10-30-saga-cheats';
import {articlePath} from '../src/routes';

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

test('catalogue covers every game newest first and keeps separate, factual platform groups',async({page})=>{
 expect(sagaCheatOrder).toEqual(['vi','online','gta5','tbogt','cw','tlad','iv','vcs','lcs','sa','advance','vc','iii','gta2','london61','london69','gta1']);
 const grouped=catalogue.sections.filter(s=>s.codeGroups);
 expect(grouped).toHaveLength(15);expect(grouped.flatMap(s=>s.codeGroups!).reduce((n,g)=>n+g.rows.length,0)).toBeGreaterThan(1000);
 expect(grouped.find(s=>s.heading[0].startsWith('GTA IV'))!.codeGroups![0].rows).toHaveLength(16);
 expect(grouped.find(s=>s.heading[0].startsWith('The Lost'))!.codeGroups![0].rows).toHaveLength(6);
 expect(grouped.find(s=>s.heading[0].startsWith('The Ballad'))!.codeGroups![0].rows).toHaveLength(9);
 for(const [li,locale]of(['es','en','fr']as const).entries()){
  await page.goto(articlePath(locale,catalogue));await expect(page.getByRole('heading',{level:1})).toHaveText(catalogue.title[li]);
  const toc=await page.locator('.article-contents li').allTextContents();expect(toc[2]).toContain('GTA VI');expect(toc[3]).toContain('GTA Online');expect(toc[4]).toContain('GTA V');expect(toc[toc.length-2]).toContain('1997');
  const first=page.locator('.cheat-code-group').first();await expect(first).not.toHaveAttribute('open','');await first.locator('summary').click();await expect(first.locator('table')).toBeVisible();await expect(first).toContainText('TURTLE');
  const sa=page.locator('.article-body>section').filter({has:page.getByRole('heading',{level:2,name:catalogue.sections.find(s=>s.heading[0].startsWith('San Andreas'))!.heading[li],exact:true})});
  const pc=sa.locator('.cheat-code-group').first();await pc.locator('summary').click();await expect(pc).toContainText('HESOYAM');await expect(pc).toContainText('THEGAMBLER');await expect(pc).toContainText('GUSNHDE');await expect(pc).not.toContainText('GUSNDHE');
  const portable=catalogue.sections.filter(s=>/Stories/.test(s.heading[0])).flatMap(s=>s.codeGroups!.filter(g=>g.heading[0]==='PSP').flatMap(g=>g.rows));expect(portable.every(r=>!(/\b[LR]1\b/.test(r.code)))).toBe(true);
  const codes=catalogue.sections.flatMap(s=>s.codeGroups??[]).flatMap(g=>g.rows.map(r=>r.code));for(const fake of ['FULLCITYPEOPLEMINES','FREEWAYFORANGELJOY','YOUCANTLEAVEMEALONE'])expect(codes).not.toContain(fake);
  const inline=page.locator('.article-body .editorial-figure').first();await expect(inline.locator('figcaption a')).toHaveAttribute('href','https://www.rockstargames.com/games/IV');
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
  if(a===catalogue){expect(html).toContain('HESOYAM');expect(html).toContain('482-555-0100');expect(html).toContain('cheat-code-group');}
 }
});

test('language selector keeps the current catalogue and platform tables usable',async({page})=>{
 await page.goto(articlePath('es',catalogue));
 for(const [li,locale]of(['es','en','fr']as const).entries()){
  await expect(page).toHaveURL(articlePath(locale,catalogue));await expect(page.getByRole('heading',{level:1})).toHaveText(catalogue.title[li]);
  const first=page.locator('.cheat-code-group').first();await first.locator('summary').click();await expect(first.locator('table')).toBeVisible();
  if(li<2)await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(['es','en','fr'][li+1]);
 }
});
