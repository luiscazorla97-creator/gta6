import{test,expect}from'@playwright/test';
import{twoPlatforms20261101}from'../src/batches/2026-11-01-two-platforms';
import{articlePath}from'../src/routes';
const articles=twoPlatforms20261101;
test.beforeEach(async({page})=>{for(const h of ['https://bauval.org/**','https://abscloud.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(h,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));});
for(const[i,l]of(['es','en','fr']as const).entries())test(`two platform guides in ${l}: sources, images, metadata and language navigation`,async({page,request},info)=>{
 test.setTimeout(120000);const sitemap=await(await request.get('/sitemap.xml')).text();expect(articles).toHaveLength(2);
 for(const a of articles){await page.goto(articlePath(l,a));await expect(page.locator('h1')).toHaveText(a.title[i]);await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',a.excerpt[i]);await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://fansgta.com'+articlePath(l,a));for(const lang of ['es','en','fr']as const)await expect(page.locator(`link[hreflang="${lang}"]`)).toHaveAttribute('href','https://fansgta.com'+articlePath(lang,a));expect(sitemap).toContain(articlePath(l,a));
 const figures=page.locator('.full-article .editorial-figure');await expect(figures).toHaveCount(3);for(const f of await figures.all()){const im=f.locator('img');await im.scrollIntoViewIfNeeded();await expect.poll(()=>im.evaluate((x:HTMLImageElement)=>x.complete&&x.naturalWidth>0)).toBe(true);await expect(im).not.toHaveAttribute('alt','');await expect(f.locator('figcaption a')).toHaveAttribute('href',/rockstargames.com/);}
 for(const h of new Set(await page.locator('.section-sources a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')!)))){expect(h.startsWith('/'+l+'/')).toBe(true);expect((await request.get(h)).status()).toBe(200);}
 const s=await(await request.get(articlePath(l,a))).text();const schemas=[...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));const post=schemas.find(x=>x['@type']==='BlogPosting');expect(post.datePublished).toBe(a.published);expect(post.dateModified).toBe('2026-11-01');expect(s).not.toContain('abscloud.org');await expect(page.locator('#fansgta-ga4')).toHaveCount(0);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await expect(page.locator('.article-body > section[id]')).toHaveCount(7);await expect(page.locator('.article-body tbody tr')).toHaveCount(3);if(a.id.includes('mobile-remote'))await expect(page.locator('.article-body')).toContainText('Remote Play');if(a.id.includes('switch2-status'))await expect(page.locator('.article-body')).toContainText('Pritchard');
 const next=l==='es'?'fr':'es';await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[l],exact:true}).selectOption(next);await expect(page).toHaveURL(articlePath(next,a));
 if(a===twoPlatforms20261101[0]&&l==='es')await page.screenshot({path:`test-results/two-platforms-${info.project.name}.png`});
 }
});
