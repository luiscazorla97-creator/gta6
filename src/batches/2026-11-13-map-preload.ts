import type {Article} from '../articles';
import data from './2026-11-13-map-preload.json';
const updates=new Map((data as Article[]).map(article=>[article.id,article]));
export function updateMapPreload20261113(article:Article):Article{
 const updated=updates.get(article.id);if(updated)return updated;
 if(article.id!=='gta6-download-stuck-troubleshooting-20261113')return article;
 return {...article,sections:article.sections.map(section=>({...section,paragraphs:section.paragraphs.map(paragraph=>[paragraph[0].replace('desde el pantalla de encendido','desde la pantalla de encendido'),paragraph[1],paragraph[2]] as [string,string,string])}))};
}
