import type {Article} from '../articles';
import updates from './2026-11-17-daily-goty.json' with {type:'json'};
const current=updates[0] as Article;
export function updateDailyGOTY20261117(article:Article):Article{return article.id===current.id?current:article;}
