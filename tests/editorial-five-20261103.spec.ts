import{test,expect}from'@playwright/test';
import{articles}from'../src/articles';
import{articlePath}from'../src/routes';
const newIds=['download-duration','printable-map','miami-campaign','nike-rumour','review-embargo'].map(k=>`gta6-${k}-20261103`);
const updates=['gta6-preload-schedule-20261028','reported-210gb-size-2026-10-28','gta6-physical-code-box-20261028','gta6-ps5-storage-20261101','gta6-xbox-storage-20261101'];
const touched=articles.filter(a=>newIds.includes(a.id)||updates.includes(a.id));
test.beforeEach(async({page})=>{for(const h of ['https://bauval.org/**','https://abscloud.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(h,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));});
for(const[i,l]of(['es','en','fr']as const).entries())test(`November3 five new topics and updated launch guidance in ${l}`,async({page,request},info)=>{
 test.setTimeout(180000);expect(touched).toHaveLength(10);expect(articles).toHaveLength(150);const sitemap=await(await request.get('/sitemap.xml')).text();
 for(const a of touched){const path=articlePath(l,a);await page.goto(path);await expect(page.locator('h1')).toHaveText(a.title[i]);await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',a.excerpt[i]);await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://fansgta.com'+path);for(const lang of ['es','en','fr']as const)await expect(page.locator(`link[hreflang="${lang}"]`)).toHaveAttribute('href','https://fansgta.com'+articlePath(lang,a));expect(sitemap).toContain(`<loc>https://fansgta.com${path}</loc><lastmod>2026-11-03</lastmod>`);
 const isNew=newIds.includes(a.id);const count=isNew||a.id.includes('-storage-')?3:1;const figures=page.locator('.full-article .editorial-figure');await expect(figures).toHaveCount(count);for(const f of await figures.all()){const im=f.locator('img');await im.scrollIntoViewIfNeeded();await expect.poll(()=>im.evaluate((x:HTMLImageElement)=>x.complete&&x.naturalWidth>0)).toBe(true);await expect(im).not.toHaveAttribute('alt','');await expect(f.locator('figcaption a')).toHaveAttribute('href',/rockstargames.com/);}
 for(const h of new Set(await page.locator('.section-sources a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')!)))){expect(h.startsWith('/'+l+'/')).toBe(true);expect((await request.get(h)).status()).toBe(200);}
 const s=await(await request.get(path)).text();const schemas=[...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));const post=schemas.find(x=>x['@type']==='BlogPosting');expect(post.datePublished).toBe(isNew?'2026-11-03':a.id.includes('-storage-')?'2026-11-01':'2026-10-28');expect(post.dateModified).toBe('2026-11-03');expect(post.inLanguage).toBe(l);expect(s).not.toContain('abscloud.org');await expect(page.locator('#fansgta-ga4')).toHaveCount(0);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 if(isNew)await expect(page.locator('.article-body > section[id]')).toHaveCount(7);
 if(a.id.includes('download-duration')){await expect(page.locator('.article-body tbody tr')).toHaveCount(6);await expect(page.locator('.article-body')).toContainText('4 h');await expect(page.locator('.article-body')).toContainText('212');}
 if(a.id.includes('nike-rumour')||a.id.includes('review-embargo'))await expect(page.locator('h1')).toContainText({es:'Rumor',en:'Rumour',fr:'Rumeur'}[l]);
 if(updates.includes(a.id))await expect(page.locator('.article-body')).toContainText('212');
 const next=l==='es'?'fr':'es';await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[l],exact:true}).selectOption(next);await expect(page).toHaveURL(articlePath(next,a));
 if(a.id===newIds[0]&&l==='es')await page.screenshot({path:`test-results/five-nov3-${info.project.name}.png`});
 }
});
