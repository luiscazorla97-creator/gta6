import type {Article} from '../articles';
import data from './2026-11-02-daily-walmart.json' with {type:'json'};
import sourceData from './2026-11-02-daily-walmart-sources.json' with {type:'json'};
type Three=[string,string,string];
const sources:Record<string,{label:string;url:string}>=sourceData;
const external=[...new Set(data.sections.flatMap(s=>s.refs).filter(k=>!k.startsWith('related-')))];
export const dailyWalmart20261102:Article={
 id:'gta6-walmart-surprise-bag-20261102',category:'news',slug:data.slug as Three,title:data.title as Three,excerpt:data.excerpt as Three,tag:data.tag as Three,
 image:'vice-city',imageAlt:['Vice City al atardecer, con un helicóptero sobre la bahía, en una captura oficial de GTA VI','Vice City at sunset, with a helicopter above the bay, in an official GTA VI screenshot','Vice City au coucher du soleil, avec un hélicoptère au-dessus de la baie, sur une capture officielle GTA VI'],
 imageCaption:['Captura promocional oficial de GTA VI como contexto del lanzamiento. No muestra una bolsa de Walmart ni confirma el contenido del supuesto regalo.','Official GTA VI promotional screenshot providing launch context. It depicts no Walmart bag and confirms no alleged gift contents.','Capture promotionnelle officielle GTA VI pour situer la sortie. Elle ne montre aucun sac Walmart et ne confirme pas son contenu supposé.'],
 imageCredit:{label:'GTA VI © Rockstar Games',url:sources.media.url},published:'2026-11-02',updated:'2026-11-02',body:data.sections[0].paragraphs[0] as Three,
 sources:[...external.map(k=>sources[k]),sources.media],sections:data.sections.map(s=>({heading:s.heading as Three,paragraphs:s.paragraphs as Three[],references:s.refs.map(k=>sources[k]),...('table'in s?{table:s.table as Article['sections'][number]['table']}:{})}))
};
