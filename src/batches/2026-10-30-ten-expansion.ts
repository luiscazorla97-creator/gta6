import type {Article} from '../articles';
import data from './2026-10-30-ten-topics.json' with {type:'json'};
import {mediaAlt} from '../media';
type T=[string,string,string];
const edge={label:'Edge · GTA VI: The state that never sleeps · October 29, 2026',url:'https://www.gamesradar.com/edge/gtavi-cover/'};
const official={label:'Rockstar Games · GTA VI',url:'https://www.rockstargames.com/VI'};
// Paths are resolved against the existing article inventory below, never guessed.
const relatedGuides:Record<string,{title:string;path:string}>={"gta-6-leonida-locations": {"title": "Más allá de Vice City: los lugares de Leonida que nombra Rockstar", "path": "/es/mapa/gta-6-leonida-locations/"}, "gta6-npc-behaviour-deep-20261029": {"title": "NPC de GTA 6: cómo cambia su IA y qué revela Edge", "path": "/es/guias/gta-6-npc-ia-comportamiento/"}, "gta6-car-theft-tools-20261030": {"title": "Robar coches en GTA 6: escáner, herramientas y rastreadores", "path": "/es/guias/gta-6-robar-coches-escaner-herramientas/"}, "gta6-police-wanted-deep-20261029": {"title": "Policía en GTA 6: búsqueda, testigos y cómo cambia la huida", "path": "/es/guias/gta-6-policia-busqueda-testigos/"}, "gta6-jason-lucia-relationship-20261030": {"title": "Jason y Lucia en GTA 6: romance y sistema de relación", "path": "/es/guias/gta-6-jason-lucia-relacion-romance/"}, "lucia-caminos-profile": {"title": "Lucia Caminos: prisión, Liberty City y su plan con Jason", "path": "/es/personajes/lucia-caminos-profile/"}, "vehicle-evidence": {"title": "Vehículos de GTA 6: qué debería demostrar una ficha fiable", "path": "/es/vehiculos/vehiculos-gta-6-verificar-fichas/"}};
export const tenExpansionArticles:Article[]=data.map(d=>{
 const refs=[edge,d.extraSource,official];
 const related=relatedGuides[d.related];
 if(!related)throw new Error('Missing related article: '+d.related);
 const parts:[T,T][]=[
  [['La respuesta y la fecha de la información','The answer and the source date','Réponse et date de l’information'],d.lead as T],
  [['Qué muestran las fuentes consultadas','What the checked sources show','Ce que montrent les sources consultées'],d.evidence as T],
  [['Qué cambia para el jugador','What it means for players','Ce que cela change pour le joueur'],d.analysis as T],
  [['Límites: lo que todavía no podemos afirmar','Limits: what remains unestablished','Limites : ce qui reste à établir'],d.limits as T],
  [['Preguntas frecuentes','Frequently asked questions','Questions fréquentes'],d.faq as T]
 ];
 const sections:Article['sections']=parts.map(([heading,paragraph])=>({heading,paragraphs:[paragraph],references:refs}));
 sections.push({heading:['Guías relacionadas de FansGTA','Related FansGTA guides','Guides FansGTA associés'],paragraphs:[['Para ampliar el contexto, consulta la guía relacionada y la fecha oficial. Esta página se revisó el 30 de octubre de 2026 con material publicado, no con acceso anticipado propio al juego final.','For context, consult the related guide and official release information. This page was checked October 30, 2026 against published material, without claiming our own early access to the finished game.','Pour le contexte, consultez le guide associé et les informations officielles. Cette page a été vérifiée le 30 octobre 2026 à partir de publications, sans prétendre à un accès anticipé FansGTA au jeu final.']],references:[{label:related.title,url:'https://fansgta.com'+related.path},official]});
 return {id:`gta6-${d.key}-explained-20261030`,category:'guides',slug:d.slug as T,title:d.title as T,excerpt:d.excerpt as T,tag:['GTA VI · ANÁLISIS DE FUENTES','GTA VI · SOURCED ANALYSIS','GTA VI · ANALYSE SOURCÉE'],body:d.lead as T,sections,sources:refs,image:d.image,imageAlt:(['es','en','fr'] as const).map(l=>mediaAlt(d.image,l)) as T,imageCaption:['Imagen oficial de GTA VI usada como contexto; no demuestra por sí sola todas las funciones descritas.','Official GTA VI image used for context; it does not independently demonstrate every described feature.','Visuel officiel GTA VI utilisé pour le contexte ; il ne démontre pas à lui seul toutes les fonctions décrites.'],imageCredit:{label:'GTA VI © Rockstar Games',url:'https://www.rockstargames.com/VI/media'},published:'2026-10-30',updated:'2026-10-30'};
});
