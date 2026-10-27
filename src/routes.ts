import type { Locale } from './content';
export const sectionKeys=['news','guides','map','vehicles','missions','characters','cheats','online','community'] as const;
export type Section = typeof sectionKeys[number];
export const sections:Record<Locale,Record<Section,string>>={
 es:{news:'noticias',guides:'guias',map:'mapa',vehicles:'vehiculos',missions:'misiones',characters:'personajes',cheats:'trucos',online:'gta-online',community:'comunidad'},
 en:{news:'news',guides:'guides',map:'map',vehicles:'vehicles',missions:'missions',characters:'characters',cheats:'cheats',online:'gta-online',community:'community'},
 fr:{news:'actualites',guides:'guides',map:'carte',vehicles:'vehicules',missions:'missions',characters:'personnages',cheats:'codes',online:'gta-online',community:'communaute'}
};
export function sectionPath(locale:Locale,section:Section){return `/${locale}/${sections[locale][section]}/`;}
export function articlePath(locale:Locale,article:{category:Section;slug:string[]}){return `${sectionPath(locale,article.category)}${article.slug[['es','en','fr'].indexOf(locale)]}/`;}
export function resolveRoute(path:string,locale:Locale){
 const pieces=path.split('/').filter(Boolean);if(pieces.length&&pieces[0]!==locale)return {kind:'missing' as const};if(pieces.length<=1)return {kind:'home' as const};
 const section=sectionKeys.find(key=>sections[locale][key]===pieces[1]);
 if(!section)return {kind:'missing' as const};
 return pieces.length===2?{kind:'section' as const,section}:pieces.length===3?{kind:'article' as const,section,slug:pieces[2]}:{kind:'missing' as const};
}
