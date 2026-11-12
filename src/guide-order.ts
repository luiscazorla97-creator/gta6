import type {Article} from './articles';

// Editorial starting points, not a popularity ranking.
// Missing IDs do not add entries to the supplied category.
export const guidePriorityIds=[
 'legal-purchase-download-2026-10-28',
 'gta6-preload-schedule-20261028',
 'gta-6-19-november-2026',
 'gta6-languages-20261031',
 'gta6-ps5-storage-20261101',
 'gta6-xbox-storage-20261101',
 'gta6-accessibility-console-preparation-20261106',
 'gta6-ps5-3d-audio-settings-20261112',
 'gta6-dualsense-settings-20261112',
 'gta6-xbox-remote-play-20261112',
 'gta6-mobile-remote-20261101',
 'gta6-wildlife-20261031',
 'gta6-car-customisation-20261031',
 'gta6-map-discovery-20261101',
] as const;

export const guideArchiveDescriptions=[
 'Selección editorial para empezar; después, todas las demás guías de más recientes a más antiguas.',
 'Editorial selection to get started, followed by all remaining guides from newest to oldest.',
 'Sélection éditoriale pour commencer, puis tous les autres guides du plus récent au plus ancien.',
] as const;

const priorities=new Map<string,number>(guidePriorityIds.map((id,index)=>[id,index]));
export function orderGuides<T extends Pick<Article,'id'|'published'>>(entries:readonly T[]):T[]{
 return entries.map((article,index)=>({article,index})).sort((a,b)=>
  (priorities.get(a.article.id)??priorities.size)-(priorities.get(b.article.id)??priorities.size)
  ||b.article.published.localeCompare(a.article.published)
  ||a.index-b.index
 ).map(({article})=>article);
}
