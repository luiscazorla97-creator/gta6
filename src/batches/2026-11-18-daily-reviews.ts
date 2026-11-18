import type {Article} from '../articles';
import updates from './2026-11-18-daily-reviews.json' with {type:'json'};
const current=updates[0] as Article;
export function updateDailyReviews20261118(article:Article):Article{return article.id===current.id?current:article;}
