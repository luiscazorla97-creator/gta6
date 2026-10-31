import {test,expect} from '@playwright/test';
import {articles} from '../src/articles';
import {gameCheatGuides} from '../src/batches/2026-10-30-game-cheats';
import {tenExpansionArticles} from '../src/batches/2026-10-30-ten-expansion';
import {articlePath} from '../src/routes';
import type {Locale} from '../src/content';
const locales=['es','en','fr'] as const;
test.beforeEach(async({page})=>{
 for(const host of['https://abscloud.org/**','https://bauval.org/**','https://www.googletagmanager.com/**','https://pagead2.googlesyndication.com/**'])await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
});
for(const [li,locale]of locales.entries()){
 test(`game guides: ${locale} native tables, genuine covers and localized navigation`,async({page,request})=>{
  const guides=articles.filter(a=>a.cheats).sort((a,b)=>a.cheats!.order-b.cheats!.order);
  expect(gameCheatGuides).toHaveLength(15);expect(guides).toHaveLength(17);
  expect(guides.slice(0,4).map(a=>a.cheats!.game)).toEqual(['GTA VI','GTA Online','GTA V','GTA: The Ballad of Gay Tony']);expect(guides.at(-1)!.cheats!.game).toBe('GTA 1');
  for(const a of gameCheatGuides){
   await page.goto(articlePath(locale,a));await expect(page.locator('h1')).toHaveText(a.title[li]);await expect(page.locator('.cheat-series a')).toHaveCount(17);
   const cover=page.locator('.full-article>.editorial-figure img');await cover.scrollIntoViewIfNeeded();await expect.poll(()=>cover.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);await expect(cover).toHaveAttribute('alt',a.imageAlt![li]);
   if(a.image.startsWith('history-'))expect(await cover.evaluate(el=>getComputedStyle(el).objectFit)).toBe('contain');
   const first=page.locator('.cheat-code-group').first();if(a.id!=='cheats-online-20261030'){await first.locator('summary').click();await expect(first.locator('table')).toBeVisible();}else await expect(page.locator('.cheat-code-group')).toHaveCount(0);
   const links=await page.locator('.section-sources a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')!));for(const href of new Set(links)){expect(href.startsWith(`/${locale}/`)).toBe(true);expect((await request.get(href)).status()).toBe(200);}
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(page.locator('#fansgta-ga4')).toHaveCount(0);
  }
  const firstGuide=gameCheatGuides[0];await page.goto(articlePath(locale,firstGuide));const other:Locale=locale==='es'?'en':'es';await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(other);await expect(page).toHaveURL(articlePath(other,firstGuide));
  const sa=gameCheatGuides.find(a=>a.id==='cheats-sa-20261030')!;await page.goto(articlePath(locale,sa));await page.locator('.cheat-code-group summary').first().click();await expect(page.locator('.cheat-code-group').first()).toContainText('HESOYAM');await expect(page.locator('.cheat-code-group').first()).toContainText('GUSNHDE');
  await page.screenshot({path:`test-results/game-guides-${locale}-${test.info().project.name}.png`,fullPage:false});
 });
 test(`ten GTA VI topics: ${locale} source attribution, complete text and language switch`,async({page,request})=>{
  expect(tenExpansionArticles).toHaveLength(10);
  for(const a of tenExpansionArticles){
   await page.goto(articlePath(locale,a));await expect(page.locator('h1')).toHaveText(a.title[li]);await expect(page.locator('.article-body>section')).toHaveCount(6);
   expect(a.sections.flatMap(s=>s.paragraphs.map(p=>p[li])).join(' ').split(/\s+/).length).toBeGreaterThan(200);
   await expect(page.locator('.article-body')).toContainText('Edge');await expect(page.locator('.section-sources a[href="https://www.gamesradar.com/edge/gtavi-cover/"]')).toHaveCount(5);
   const cover=page.locator('.full-article>.editorial-figure img');await cover.scrollIntoViewIfNeeded();await expect.poll(()=>cover.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);
   const target:Locale=locale==='es'?'en':'es';const alternate=page.locator(`link[rel="alternate"][hreflang="${target}"]`);await expect(alternate).toHaveAttribute('href','https://fansgta.com'+articlePath(target,a));
   const html=await (await request.get(articlePath(locale,a))).text();expect(html).toContain('BlogPosting');expect(html).toContain('index,follow');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  const first=tenExpansionArticles[0],other:Locale=locale==='es'?'fr':'es';await page.goto(articlePath(locale,first));await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[locale],exact:true}).selectOption(other);await expect(page).toHaveURL(articlePath(other,first));
 });
}
test('specific cheat coverage separates games, episode base numbers and valid code strings',()=>{
 const get=(id:string)=>gameCheatGuides.find(a=>a.id===`cheats-${id}-20261030`)!;
 expect(get('iv').sections.flatMap(s=>s.codeGroups??[]).flatMap(g=>g.rows)).toHaveLength(16);
 expect(get('tlad').sections.flatMap(s=>s.codeGroups??[]).flatMap(g=>g.rows)).toHaveLength(22);
 expect(get('tbogt').sections.flatMap(s=>s.codeGroups??[]).flatMap(g=>g.rows)).toHaveLength(25);
 expect(get('london61').sections.flatMap(s=>s.codeGroups??[])).toHaveLength(1);
 expect(get('london61').imageCaption![0]).toContain('no es una portada propia');
 const codes=gameCheatGuides.flatMap(a=>a.sections.flatMap(s=>s.codeGroups??[])).flatMap(g=>g.rows.map(r=>r.code));for(const fake of['FULLCITYPEOPLEMINES','FREEWAYFORANGELJOY','YOUCANTLEAVEMEALONE','GUSNDHE'])expect(codes).not.toContain(fake);
});
