import{test,expect}from'@playwright/test';
import{three20261102}from'../src/batches/2026-11-02-three';
import{articles as catalogue}from'../src/articles';
import{articlePath}from'../src/routes';
const articles=three20261102.map(original=>{
 const current=catalogue.find(article=>article.id===original.id);
 if(!current)throw new Error(`Original November2 article missing: ${original.id}`);
 return current;
});
test.beforeEach(async({page})=>{for(const h of ['https://bauval.org/**','https://abscloud.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])await page.route(h,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));});
for(const[i,l]of(['es','en','fr']as const).entries())test(`three new guides in ${l}: sources, images, metadata and language navigation`,async({page,request},info)=>{
 test.setTimeout(120000);const sitemap=await(await request.get('/sitemap.xml')).text();expect(articles).toHaveLength(3);
 for(const a of articles){const original=three20261102.find(item=>item.id===a.id)!;expect(a.slug).toEqual(original.slug);expect(a.category).toBe(original.category);expect(a.published).toBe(original.published);await page.goto(articlePath(l,a));await expect(page.locator('h1')).toHaveText(a.title[i]);await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',a.excerpt[i]);await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://fansgta.com'+articlePath(l,a));for(const lang of ['es','en','fr']as const)await expect(page.locator(`link[hreflang="${lang}"]`)).toHaveAttribute('href','https://fansgta.com'+articlePath(lang,a));expect(sitemap).toContain(articlePath(l,a));
 const figures=page.locator('.full-article .editorial-figure');await expect(figures).toHaveCount(1+a.sections.filter(section=>section.image).length);for(const f of await figures.all()){const im=f.locator('img');await im.scrollIntoViewIfNeeded();await expect.poll(()=>im.evaluate((x:HTMLImageElement)=>x.complete&&x.naturalWidth>0)).toBe(true);await expect(im).not.toHaveAttribute('alt','');await expect(f.locator('figcaption a')).toHaveAttribute('href',/rockstargames.com/);}
 for(const h of new Set(await page.locator('.section-sources a[href^="/"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')!)))){expect(h.startsWith('/'+l+'/')).toBe(true);expect((await request.get(h)).status()).toBe(200);}
 const s=await(await request.get(articlePath(l,a))).text();const schemas=[...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));const post=schemas.find(x=>x['@type']==='BlogPosting');expect(post.datePublished).toBe(original.published);expect(post.dateModified).toBe(a.updated);expect(post.citation).toEqual(a.sources.map(source=>source.url));expect(s).not.toContain('abscloud.org');await expect(page.locator('#fansgta-ga4')).toHaveCount(0);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await expect(page.locator('.article-body > section[id]')).toHaveCount(a.sections.length);await expect(page.locator('.article-body tbody tr')).toHaveCount(a.sections.reduce((count,section)=>count+(section.table?.rows.length??0),0));if(a.id.includes('ps4-xbox-one'))await expect(page.locator('.article-body')).toContainText('PS4');if(a.id.includes('personal-vehicles'))await expect(page.locator('.article-body')).toContainText('Famitsu');
 const next=l==='es'?'fr':'es';await page.getByRole('combobox',{name:{es:'Idioma',en:'Language',fr:'Langue'}[l],exact:true}).selectOption(next);await expect(page).toHaveURL(articlePath(next,a));
 if(a.id===three20261102[0].id&&l==='es')await page.screenshot({path:`test-results/three-20261102-${info.project.name}.png`});
 }
});
