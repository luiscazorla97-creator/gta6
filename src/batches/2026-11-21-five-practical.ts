import type {Article} from '../articles';
import batch from './2026-11-21-five-practical.json' with {type:'json'};
const complete=batch as Article[];
export const manualPractical20261121=complete.filter(article=>article.id!=='cheats-check');
const current=complete.find(article=>article.id==='cheats-check')!;
export function updateManualPractical20261121(article:Article):Article{return article.id===current.id?current:article;}
