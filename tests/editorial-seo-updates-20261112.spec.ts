import {finishPublicContentRoutes} from './helpers/public-content';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {test,expect} from '@playwright/test';
import {articles} from '../.ssr/entry-server.js';
import {articlePath} from '../src/routes';

const origin='https://fansgta.com',locales=['es','en','fr'] as const;
const expected={
 'legal-purchase-download-2026-10-28':{published:'2026-10-28',slugs:['donde-comprar-reservar-descargar-gta-6','where-to-buy-preorder-download-gta-6','ou-acheter-precommander-telecharger-gta-6'],hubs:['precarga-gta-6-fecha-hora-consolas','gta-6-configurar-dualsense-ps5-mando','gta-6-audio-3d-ps5-auriculares-configuracion']},
 'gta6-preload-schedule-20261028':{published:'2026-10-28',slugs:['precarga-gta-6-fecha-hora-consolas','gta-6-preload-date-time-consoles','prechargement-gta-6-date-heure-consoles'],hubs:['gta-6-descargar-ps5-playstation-app-movil','gta-6-descargar-xbox-app-movil-consola']},
 prepare:{published:'2026-10-27',slugs:['preparar-consola-cuenta-lanzamiento','prepare-console-account-launch','preparer-console-compte-sortie'],hubs:['donde-comprar-reservar-descargar-gta-6','precarga-gta-6-fecha-hora-consolas','gta-6-candado-ps5-restaurar-licencias','gta-6-ps5-partidas-guardadas-copia-seguridad-nube','gta-6-configurar-dualsense-ps5-mando','gta-6-audio-3d-ps5-auriculares-configuracion']},
};
const oldXboxPreload=['No hemos verificado una precarga equivalente en Xbox.','An equivalent Xbox preload was not verified.','Un équivalent Xbox n’a pas été vérifié.'];
const oldWaiting=['¿Todavía no aparece el 3 de noviembre? La fecha de precarga aún no ha llegado.','On November 3 the preload date has not arrived.','Au 3 novembre, le début du préchargement n’est pas encore arrivé.'];
const oldSize=['Esta comprobación no proporciona un tamaño verificado por plataforma.','This check provides no platform-verified size.','Cette vérification ne donne aucun volume confirmé par plateforme.'];
const oldPrepare=['No afirmamos que exista una precarga, una reserva o una edición concreta','We are not claiming a preload, preorder or particular edition is available','Nous ne confirmons aucune disponibilité de préchargement, précommande ou édition particulière'];
const oldPrepareSize=['Espera a una ficha oficial de tu plataforma para conocer el espacio necesario','Wait for an official listing for your platform to know the space needed','Attendez la fiche officielle de votre plateforme pour connaître l’espace nécessaire'];
const normal=(value:string)=>value.replace(/\s+/g,' ').trim();

test.afterEach(async({page,baseURL})=>{await finishPublicContentRoutes(page,baseURL);});

test.beforeEach(async({page})=>{
 // Deterministic SDK fixtures preserve tags but do not certify creative delivery.
 for(const host of ['https://bauval.org/**','https://pagead2.googlesyndication.com/**','https://www.googletagmanager.com/**'])
  await page.route(host,route=>route.fulfill({status:200,contentType:'application/javascript',body:''}));
});

for(const[li,locale]of locales.entries())test(`SEO refresh in ${locale}: current download guidance, historical prices and localized preparation hubs`,async({page,request})=>{
 test.setTimeout(180000);
 const errors:string[]=[],consoleErrors:string[]=[];
 page.on('pageerror',error=>errors.push(error.message));
 page.on('console',message=>{if(message.type()==='error')consoleErrors.push(message.text());});
 const sitemap=await(await request.get('/sitemap.xml')).text();
 for(const[id,baseline]of Object.entries(expected)){
  const article=articles.find(article=>article.id===id);expect(article,`Build the SEO updates before testing ${id}`).toBeDefined();
  expect(article!.published).toBe(baseline.published);expect(article!.updated).toBe('2026-11-12');expect(article!.slug).toEqual(baseline.slugs);
  const path=articlePath(locale,article!),response=await request.get(path);expect(response.status()).toBe(200);
  const html=await response.text(),head=html.split('</head>')[0],main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];expect(main).toBeDefined();
  expect(head).toContain(`rel="canonical" href="${origin+path}"`);
  expect(head).toContain('name="robots" content="index,follow,max-image-preview:large"');
  for(const language of locales)expect(head).toContain(`hreflang="${language}" href="${origin+articlePath(language,article!)}"`);
  for(const section of article!.sections)for(const paragraph of section.paragraphs)
   expect(main).toContain(renderToStaticMarkup(createElement('p',null,paragraph[li])));
  expect(sitemap).toContain(`<loc>${origin+path}</loc><lastmod>2026-11-12</lastmod>`);
  const schemas=[...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match=>JSON.parse(match[1]));
  expect(schemas.find(schema=>['Article','NewsArticle','BlogPosting'].includes(schema['@type']))).toMatchObject({headline:article!.title[li],mainEntityOfPage:origin+path,inLanguage:locale,datePublished:baseline.published,dateModified:'2026-11-12'});

  const navigation=await page.goto(path);expect(navigation?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveText(article!.title[li]);
  await expect(page.locator(`time[datetime="${baseline.published}"]`).first()).toBeVisible();
  await expect(page.locator('time[datetime="2026-11-12"]')).toBeVisible();
  const body=await page.locator('.article-body').innerText();
  for(const obsolete of[oldXboxPreload[li],oldWaiting[li],oldSize[li]])expect(body).not.toContain(obsolete);
  if(id==='legal-purchase-download-2026-10-28'){
   expect(body).toMatch(/212\s(?:GB|Go)/);
   expect(article!.excerpt[li]).toMatch([/28 de octubre de 2026/,/October 28, 2026/,/28 octobre 2026/][li]);
   const prices=page.locator('.article-body > section[id]').nth(2);
   await expect(prices.locator('h2')).toContainText(['28 de octubre','October 28','28 octobre'][li]);
   const priceText=await prices.innerText();
   expect(priceText).toMatch([/28\/10\/2026/,/October 28, 2026/,/28 octobre 2026/][li]);
   expect(priceText).toMatch(/79[,.]99/);expect(priceText).toMatch(/99[,.]99/);expect(priceText).toContain('USD');
   expect(priceText).not.toMatch(/(?:12 de noviembre|November 12|12 novembre)/);
   expect(body).toContain(['La precarga digital ya está disponible.','Digital preloading is available.','Le préchargement numérique est disponible.'][li]);
  }
  if(id==='gta6-preload-schedule-20261028'){
   expect(body).toMatch(/212\s(?:GB|Go)/);expect(body).toMatch([/10 de noviembre/,/November 10/,/10 novembre/][li]);
   expect(body).toContain(['medianoche local en PS5','local midnight on PS5','minuit local sur PS5'][li]);
   expect(body).toContain(['00:00 GMT','00:00 GMT','00 h GMT'][li]);
   const first=page.locator('.article-body > section[id]').first();
   await expect(first).toContainText(['Los códigos de caja permiten precargar tras recibirlos y activarlos.','Boxed codes enable preloading once received and redeemed.','Les codes en boîte permettent de précharger après réception et activation.'][li]);
  }
  if(id==='prepare'){expect(body).not.toContain(oldPrepare[li]);expect(body).not.toContain(oldPrepareSize[li]);}
  for(const slug of baseline.hubs){
   const target=articles.find(article=>article.slug[0]===slug);expect(target,slug).toBeDefined();const href=articlePath(locale,target!);
   expect(main).toContain(`href="${href}"`);
   await expect(page.locator(`.section-sources a[href="${href}"]`).first()).toBeVisible();
   expect((await request.get(href)).status(),href).toBe(200);
  }
  const internal=await page.locator('.section-sources a[href^="/"]').evaluateAll(links=>[...new Set(links.map(link=>link.getAttribute('href')!))]);
  expect(internal.length).toBeGreaterThan(0);expect(internal.every(href=>href.startsWith(`/${locale}/`))).toBe(true);
  await expect(page.locator('#fansgta-ga4,script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  const actual=(await page.locator('.article-body > section[id] > p').allTextContents()).map(normal);
  expect(actual).toEqual(article!.sections.flatMap(section=>section.paragraphs.map(paragraph=>normal(paragraph[li]))));
 }
 expect(errors).toEqual([]);expect(consoleErrors).toEqual([]);
});
