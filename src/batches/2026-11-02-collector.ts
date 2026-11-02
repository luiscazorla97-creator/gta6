import type {Article} from '../articles';
import data from './2026-11-02-collector.json' with {type:'json'};
import sourceData from './2026-11-02-collector-sources.json' with {type:'json'};
import mediaData from './2026-11-02-collector-media.json' with {type:'json'};
type Three=[string,string,string];
const sources:Record<string,{label:string;url:string}>=sourceData;
const pictures=mediaData as Record<string,{alt:string[];caption:string[]}>;
function picture(key:string){return{key,alt:pictures[key].alt as Three,caption:pictures[key].caption as Three,credit:key.startsWith('collector-')?{label:'GTA VI Collector’s Box © Rockstar Games · Rockstar Store',url:sources.store.url}:{label:'GTA VI © Rockstar Games',url:sources.gallery.url}};}
// Refresh the equivalent existing guide, retaining its identity and original URLs/date.
export function updateCollector20261102(article:Article):Article{
 if(article.id!=='collector-box-no-game-2026-10-28')return article;
 const cover=picture('collector-box-closed');
 const external=[...new Set(data.sections.flatMap(s=>s.refs).filter(k=>!k.startsWith('related-')))];
 return{...article,title:data.title as Three,excerpt:data.excerpt as Three,tag:data.tag as Three,updated:'2026-11-02',body:data.sections[0].paragraphs[0] as Three,image:cover.key,imageAlt:cover.alt,imageCaption:cover.caption,imageCredit:cover.credit,sources:[...external.map(k=>sources[k]),sources.gallery],sections:data.sections.map((s,i)=>({heading:s.heading as Three,paragraphs:s.paragraphs as Three[],references:s.refs.map(k=>sources[k]),...('table'in s?{table:s.table as Article['sections'][number]['table']}:{}),...(i===2?{image:picture('collector-box-open')}:i===6?{image:picture('vice-city')}:{})}))};
}
