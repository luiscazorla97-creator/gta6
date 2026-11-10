import type {Article} from '../articles';
import data from './2026-11-10-daily-xbox-cloud-update.json';
export function updateDailyXboxCloud20261110(article:Article):Article {
 return article.id===data.id?data as Article:article;
}
