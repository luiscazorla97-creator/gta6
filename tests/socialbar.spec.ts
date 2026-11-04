import {test,expect} from '@playwright/test';
import {three20261104} from '../src/batches/2026-11-04-three';
import {articlePath,sectionPath} from '../src/routes';
const social='https://bauval.org/14/72f531d35d71d31735aa4e4bae1dae41';

test.beforeEach(async({page})=>{
 for(const host of ['https://bauval.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])
  await page.route(host,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await page.route(social,r=>r.fulfill({status:200,contentType:'application/javascript',body:'window.__fansgtaSocialBarExecutions=(window.__fansgtaSocialBarExecutions||0)+1;'}));
});

for(const locale of ['es','en','fr'] as const)test(`one Social Bar load on ${locale} home, category and article`,async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const path of ['/'+locale+'/',sectionPath(locale,'news'),articlePath(locale,three20261104[0])]){
  await page.goto(path);const script=page.locator('script[src="'+social+'"]');
  await expect(script).toHaveCount(1);await expect(script).toHaveAttribute('data-cfasync','false');
  expect(await script.evaluate(x=>x.parentElement?.tagName)).toBe('BODY');
  await expect.poll(()=>page.evaluate(()=>(window as unknown as {__fansgtaSocialBarExecutions:number}).__fansgtaSocialBarExecutions)).toBe(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.locator('script[src*="abscloud.org"]')).toHaveCount(0);
  await expect(page.locator('script[src*="pagead/js/adsbygoogle.js"]')).toHaveCount(1);
  await expect(page.locator('#fansgta-ga4')).toHaveCount(0);
 }
 await page.reload();expect(await page.evaluate(()=>(window as unknown as {__fansgtaSocialBarExecutions:number}).__fansgtaSocialBarExecutions)).toBe(1);
 expect(errors).toEqual([]);
});

test('menu, dialogs, locale and hash navigation do not duplicate Social Bar',async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/es/');
 const reject=page.getByRole('button',{name:'Rechazar Analytics',exact:true});if(await reject.isVisible())await reject.click();
 await page.getByRole('button',{name:'Favoritos',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();
 expect(await page.evaluate(()=>(window as unknown as {__fansgtaSocialBarExecutions:number}).__fansgtaSocialBarExecutions)).toBe(1);
 if(info.project.name==='mobile'){await page.getByRole('button',{name:'Abrir menú',exact:true}).click();await expect(page.locator('button[aria-controls="main-nav"]')).toHaveAttribute('aria-expanded','true');await page.getByRole('navigation').getByRole('link',{name:'Noticias',exact:true}).click();}
 else await page.goto('/es/noticias/');
 await page.locator('a[href="'+articlePath('es',three20261104[0])+'"]').first().click();await expect(page).toHaveURL(articlePath('es',three20261104[0]));
 await page.locator('.article-contents a[href="#section-2"]').click();
 expect(await page.evaluate(()=>(window as unknown as {__fansgtaSocialBarExecutions:number}).__fansgtaSocialBarExecutions)).toBe(1);
 await page.locator('.article-details').getByRole('button',{name:'Guardar artículo',exact:true}).click();
 await page.getByLabel('Idioma',{exact:true}).selectOption('fr');await expect(page).toHaveURL(articlePath('fr',three20261104[0]));
 expect(await page.evaluate(()=>(window as unknown as {__fansgtaSocialBarExecutions:number}).__fansgtaSocialBarExecutions)).toBe(1);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);
});

test('tablet layout preserves accessible controls and navigation',async({page},info)=>{
 test.skip(info.project.name!=='desktop','The desktop browser also covers a tablet viewport.');
 await page.setViewportSize({width:1024,height:1366});await page.goto('/es/');
 const reject=page.getByRole('button',{name:'Rechazar Analytics',exact:true});if(await reject.isVisible())await reject.click();
 const menu=page.getByRole('button',{name:'Abrir menú',exact:true});if(await menu.isVisible())await menu.click();
 await page.getByRole('navigation').getByRole('link',{name:'Noticias',exact:true}).click();await expect(page).toHaveURL('/es/noticias/');
 await expect(page.getByLabel('Idioma',{exact:true})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await expect(page.locator('script[src="'+social+'"]')).toHaveCount(1);expect(await page.evaluate(()=>(window as unknown as {__fansgtaSocialBarExecutions:number}).__fansgtaSocialBarExecutions)).toBe(1);
});
