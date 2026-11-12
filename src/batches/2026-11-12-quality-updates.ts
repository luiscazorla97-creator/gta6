import type {Article} from '../articles';
import batch from './2026-11-12-quality-updates.json' with {type:'json'};
const updates=new Map((batch as Article[]).map(article=>[article.id,article]));
export function updateQuality20261112(article:Article):Article{return updates.get(article.id)??article;}
