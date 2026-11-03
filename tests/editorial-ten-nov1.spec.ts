import{test,expect}from'@playwright/test';
import{tenNov20261101 as originals}from'../src/batches/2026-11-01-ten-nov';
import{articles as currentArticles}from'../src/articles';
const tenNov20261101=originals.map(a=>currentArticles.find(x=>x.id===a.id)!);
import{articlePath}from'../src/routes';
const articles=tenNov20261101;
test.beforeEach(async({page})=>{for(const h of ['https://bauval.org/**','https://abscloud.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(h,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));});
for(const[i,l]of(['es','en','fr']as const).entries())test(`ten new articles in ${l}: sources, images, metadata and language navigation`,async({page,request},info)=>{
 test.setTimeout(180000);const sitemap=await(await request.get('/sitemap.xml')).text();expect(articles).toHaveLength(10);
 for(const a of articles){await page.goto(articlePath(l,a));await expect(page.locator('h1')).toHaveText(a.title[i]);await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',a.excerpt[i]);await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://fansgta.com'+articlePath(l,a));for(const lang of ['es','en','fr']as const)await expect(page.locator(`link[hreflang="${lang}"]`)).toHaveAttribute('href','https://fansgta.com'+articlePath(lang,a));expect(sitemap).toContain(articlePath(l,a));
 const figures=page.locator('.full-article .editorial-figure');await expect(figures).toHaveCount(3);for(const f of await figures.all()){const im=f.locator('img');await im.scrollIntoViewIfNeeded();await expect.poll(()=>im.evaluate((x:HTMLImageElement)=>x.complete&&x.naturalWidth>0)).toBe(true);await expect(im).not.toHaveAttribute('alt','');await expect(f.locator('figcaption a')).toHaveAttribute('href',/rockstargames.com/);}
 for(const h of new Set(await page.locator('.section-sources a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')!)))){expect(h.startsWith('/'+l+'/')).toBe(true);expect((await request.get(h)).status()).toBe(200);}
 const s=await(await request.get(articlePath(l,a))).text();const schemas=[...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));const post=schemas.find(x=>x['@type']==='BlogPosting');expect(post.datePublished).toBe(a.published);expect(post.dateModified).toBe(a.updated);expect(s).not.toContain('abscloud.org');await expect(page.locator('#fansgta-ga4')).toHaveCount(0);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await expect(page.locator('.article-body > section[id]')).toHaveCount(6);
 if(a.id.includes('ps5-storage')){await expect(page.locator('.article-body table')).toHaveCount(1);await expect(page.locator('.article-body')).toContainText('USB');}
 if(a.id.includes('preorder-cancel'))await expect(page.locator('.article-body')).toContainText('Xsolla');
 const next=l==='es'?'fr':'es';await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[l],exact:true}).selectOption(next);await expect(page).toHaveURL(articlePath(next,a));
 if(a===tenNov20261101[0]&&l==='es')await page.screenshot({path:`test-results/ten-nov1-${info.project.name}.png`});
 }
});
