import type {Article} from '../articles';
import data from './2026-11-03-daily-release.json' with {type:'json'};
import sourceData from './2026-11-03-daily-release-sources.json' with {type:'json'};
type Three=[string,string,string];
const sources:Record<string,{label:string;url:string}>=sourceData;
export function updateDailyRelease20261103(a:Article):Article{
 if(a.id!==data.id)return a;
 return {...a,title:data.title as Three,excerpt:data.excerpt as Three,tag:data.tag as Three,
  imageAlt:data.imageAlt as Three,imageCaption:data.imageCaption as Three,
  imageCredit:{label:'GTA VI © Rockstar Games',url:sources.gallery.url},
  updated:'2026-11-03',body:data.sections[0].paragraphs[0] as Three,
  sources:['regional','preload','game','gallery'].map(k=>sources[k]),
  sections:data.sections.map(s=>({heading:s.heading as Three,paragraphs:s.paragraphs as Three[],references:s.refs.map(k=>sources[k]),...('table'in s?{table:s.table as Article['sections'][number]['table']}: {})}))};
}
