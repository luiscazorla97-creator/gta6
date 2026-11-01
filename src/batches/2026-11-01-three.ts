import type {Article} from '../articles';
import data from './2026-11-01-three.json' with {type:'json'};
import pictures from './2026-11-01-three-media.json' with {type:'json'};
import sourceData from './2026-11-01-three-sources.json' with {type:'json'};
type Three=[string,string,string];
const sources:Record<string,{label:string;url:string}>=sourceData;
const images=pictures as Record<string,{alt:string[];caption:string[];source:string}>;
const credit={label:'GTA VI © Rockstar Games',url:sources.gallery.url};
function picture(key:string){return{key,alt:images[key].alt as Three,caption:images[key].caption as Three,credit};}
export const three20261101:Article[]=data.map(d=>{
 const cover=picture(d.imageKeys[0]);
 const sourceKeys=[...new Set(d.sections.flatMap(s=>s.refs).filter(k=>!k.startsWith('related-')))];
 return{id:`gta6-${d.key}-20261101`,category:d.category as Article['category'],slug:d.slug as Three,title:d.title as Three,excerpt:d.excerpt as Three,tag:d.tag as Three,image:cover.key,imageAlt:cover.alt,imageCaption:cover.caption,imageCredit:credit,body:d.sections[0].paragraphs[0] as Three,published:'2026-11-01',updated:'2026-11-01',sources:[...sourceKeys.map(k=>sources[k]),...(!sourceKeys.includes('gallery')?[sources.gallery]:[])],sections:d.sections.map((s,i)=>({heading:s.heading as Three,paragraphs:s.paragraphs as Three[],references:s.refs.map(k=>sources[k]),...('table'in s?{table:s.table as Article['sections'][number]['table']}:{}),...(i===2?{image:picture(d.imageKeys[1])}:i===4?{image:picture(d.imageKeys[2])}:{})}))};
});
