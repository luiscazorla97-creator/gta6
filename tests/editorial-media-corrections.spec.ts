import {test,expect} from '@playwright/test';
import {articles} from '../.ssr/entry-server.js';
import {correctEditorialMediaDescriptions} from '../src/editorial-media-corrections';

test('editorial images describe the visible pistol while preserving contextual captions and article identity',()=>{
 const article=articles.find(item=>item.id==='gta6-netcraft-scam-report-20261105')!;
 expect(article.imageAlt?.[0]).toContain('pistola');
 expect(article.imageAlt?.[1]).toContain('pistol');
 expect(article.imageAlt?.[2]).toContain('pistolet');
 expect(article.imageCaption?.[0]).toContain('no muestra una web examinada por Netcraft ni una prueba de malware');
 expect(article.slug).toEqual(['gta-6-estafas-descargas-acceso-anticipado-netcraft','gta-6-fake-download-early-access-scams-netcraft','gta-6-arnaques-telechargement-acces-anticipe-netcraft']);
 expect(article.published).toBe('2026-11-05');
 expect(article.updated).toBe('2026-11-05');
 const example={...article,imageAlt:['Jason sosteniendo un teléfono junto a una embarcación','Jason holding a phone beside a boat','Jason tenant un téléphone près d’un bateau'] as [string,string,string],imageCaption:['Jason sosteniendo un teléfono junto a una embarcación. Contexto conservado.','Jason holding a phone beside a boat. Preserved context.','Jason tenant un téléphone près d’un bateau. Contexte préservé.'] as [string,string,string]};
 const corrected=correctEditorialMediaDescriptions(example);
 const strip=(item:typeof article)=>{const {imageAlt,imageCaption,...rest}=item;return rest;};
 expect(strip(corrected)).toEqual(strip(example));
 expect(corrected.imageCaption?.map(value=>value.split('. ').slice(1).join('. '))).toEqual(['Contexto conservado.','Preserved context.','Contexte préservé.']);
 expect(correctEditorialMediaDescriptions(corrected)).toBe(corrected);
});

test('every existing use of Jason_Duval_08 avoids the historic phone and helicopter mistake',()=>{
 let uses=0;
 for(const article of articles){
  const descriptions=[...(article.image==='feature-phone'?[article.imageAlt??[]]:[]),...article.sections.filter(section=>section.image?.key==='feature-phone').map(section=>section.image!.alt)];
  for(const alt of descriptions){uses++;expect(alt).toHaveLength(3);for(const value of alt)expect(value).not.toMatch(/teléfono|phone|téléphone|helicóptero|helicopter|hélicoptère/i);}
 }
 expect(uses).toBe(18);
 const article=articles.find(item=>item.id==='gta6-ps4-xbox-one-20261102')!;
 expect(article.sections.find(section=>section.image?.key==='feature-phone')?.image?.alt[1]).toContain('aircraft');
 expect(article.updated).toBe('2026-11-10');
});
