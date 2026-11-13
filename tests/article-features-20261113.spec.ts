import {test,expect,type Page} from '@playwright/test';
import {articles} from '../.ssr/entry-server.js';
import {articlePath} from '../src/routes';
import {routePublicContent,finishPublicContentRoutes} from './helpers/public-content';

const article=articles.find(candidate=>candidate.shareEnabled);
if(!article)throw new Error('Build the November 13 articles before testing optional article features.');
const locales=['es','en','fr'] as const;
const labels={es:'Compartir artículo',en:'Share article',fr:'Partager l’article'};
const bookmarks={es:'Favoritos',en:'Bookmarks',fr:'Favoris'};
const rejectAnalytics={es:'Rechazar Analytics',en:'Reject Analytics',fr:'Refuser Analytics'};
const pageErrors=new WeakMap<Page,string[]>();
type NativeMode='success'|'absent'|'abort'|'deny';
type ClipboardMode='success'|'missing'|'deny';
declare global{interface Window{__articleShareTest:{native:ShareData[];clipboard:string[]};}}

test.beforeEach(async({page,baseURL})=>{
 const errors:string[]=[];pageErrors.set(page,errors);page.on('pageerror',error=>errors.push(error.message));
 await routePublicContent(page,baseURL);
 for(const host of ['https://bauval.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])
  await page.route(host,route=>route.fulfill({status:200,contentType:'application/javascript',body:''}));
});
test.afterEach(async({page,baseURL})=>{await finishPublicContentRoutes(page,baseURL);expect(pageErrors.get(page)).toEqual([]);});

async function mockShare(page:Page,native:NativeMode,clipboard:ClipboardMode){
 await page.addInitScript(({native,clipboard})=>{
  window.__articleShareTest={native:[],clipboard:[]};
  Object.defineProperty(navigator,'share',{configurable:true,value:native==='absent'?undefined:async(data:ShareData)=>{
   window.__articleShareTest.native.push(data);
   if(native==='abort')throw new DOMException('Cancelled','AbortError');
   if(native==='deny')throw new DOMException('Unavailable','NotAllowedError');
  }});
  Object.defineProperty(navigator,'clipboard',{configurable:true,value:clipboard==='missing'?undefined:{writeText:async(value:string)=>{
   window.__articleShareTest.clipboard.push(value);
   if(clipboard==='deny')throw new DOMException('Unavailable','NotAllowedError');
  }}});
 },{native,clipboard});
}
async function openArticle(page:Page,locale:typeof locales[number]='es'){
 const response=await page.goto(articlePath(locale,article!));expect(response?.status()).toBe(200);
 await page.getByRole('button',{name:bookmarks[locale],exact:true}).click();
 await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');
 const reject=page.getByRole('button',{name:rejectAnalytics[locale],exact:true});
 if(await reject.count())await reject.click();
 const button=page.getByRole('button',{name:labels[locale],exact:true});
 await button.scrollIntoViewIfNeeded();await expect(button).toBeEnabled();
 return {button,status:button.locator('..').getByRole('status'),canonical:'https://fansgta.com'+articlePath(locale,article!)};
}

for(const [li,locale]of locales.entries())test(`native sharing uses the localized canonical only after a click in ${locale}`,async({page})=>{
 await mockShare(page,'success','success');
 const {button,status,canonical}=await openArticle(page,locale);
 expect(await page.evaluate(()=>window.__articleShareTest)).toEqual({native:[],clipboard:[]});
 await button.click();
 await expect.poll(()=>page.evaluate(()=>window.__articleShareTest)).toEqual({native:[{title:article!.title[li],url:canonical}],clipboard:[]});
 await expect(status).not.toHaveText('');await expect(button).toBeEnabled();
});

test('missing native sharing copies the canonical URL without sharing elsewhere',async({page})=>{
 await mockShare(page,'absent','success');const {button,status,canonical}=await openArticle(page);
 await button.click();
 await expect.poll(()=>page.evaluate(()=>window.__articleShareTest)).toEqual({native:[],clipboard:[canonical]});
 await expect(status).toHaveText('Enlace copiado.');await expect(button).toBeEnabled();
});

test('cancelling the native dialog does not write to the clipboard or display an error',async({page})=>{
 await mockShare(page,'abort','success');const {button,status}=await openArticle(page);
 await button.click();await expect(button).toBeEnabled();
 await expect.poll(()=>page.evaluate(()=>window.__articleShareTest.native.length)).toBe(1);
 expect(await page.evaluate(()=>window.__articleShareTest.clipboard)).toEqual([]);
 await expect(status).toHaveText('');
});

test('a failed native action falls back to copying the canonical',async({page})=>{
 await mockShare(page,'deny','success');const {button,status,canonical}=await openArticle(page);
 await button.click();await expect(status).toHaveText('Enlace copiado.');
 expect(await page.evaluate(()=>window.__articleShareTest.clipboard)).toEqual([canonical]);
 expect(await page.evaluate(()=>window.__articleShareTest.native.length)).toBe(1);
});

for(const clipboard of ['missing','deny']as const)test(`manual copying remains available when clipboard is ${clipboard}`,async({page})=>{
 await mockShare(page,'absent',clipboard);const {button,status,canonical}=await openArticle(page,'fr');
 await button.click();await expect(status).toContainText(canonical);
 await expect(status).not.toContainText('Lien copié.');await expect(button).toBeEnabled();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('optional subheadings precede their own paragraphs and existing articles keep their markup',async({page,request})=>{
 const extended=articles.find(candidate=>candidate.sections.some(section=>section.paragraphHeadings?.length));
 expect(extended,'At least one substantial new article should use its optional H3 structure.').toBeTruthy();
 const response=await request.get(articlePath('en',extended!));expect(response.status()).toBe(200);
 const html=await response.text();expect(html).toContain('<h3 id="section-');
 await page.goto(articlePath('en',extended!));
 for(const [si,section]of extended!.sections.entries())for(const [hi,subheading]of(section.paragraphHeadings??[]).entries()){
  expect(Number.isInteger(subheading.beforeParagraph)&&subheading.beforeParagraph>=0&&subheading.beforeParagraph<section.paragraphs.length).toBe(true);
  const heading=page.locator(`#section-${si+1}-subheading-${hi+1}`);
  await expect(heading).toHaveText(subheading.heading[1]);
  await expect(heading.locator('xpath=following-sibling::*[1]')).toHaveText(section.paragraphs[subheading.beforeParagraph][1]);
 }
 const previous=articles.find(candidate=>!candidate.shareEnabled&&!candidate.sections.some(section=>section.paragraphHeadings?.length)&&candidate.id==='gta6-youtube-launch-livestream-20261112');
 expect(previous).toBeTruthy();await page.goto(articlePath('en',previous!));
 await expect(page.getByRole('button',{name:labels.en,exact:true})).toHaveCount(0);
 await expect(page.locator('.full-article h3')).toHaveCount(0);
});
