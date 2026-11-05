import type {Article} from '../articles';
import data from './2026-11-05-ten.json' with {type:'json'};
import sourceData from './2026-11-05-ten-sources.json' with {type:'json'};
import mediaData from './2026-11-05-ten-media.json' with {type:'json'};
type Three=[string,string,string];
const sources:Record<string,{label:string;url:string}>=sourceData;
const pictures:Record<string,string[]>=mediaData;
function localized(values:string[]):Three{
 if(values.length!==3)throw new Error('Editorial text requires Spanish, English and French');
 return [values[0],values[1],values[2]];
}
const credit={label:'GTA VI © Rockstar Games',url:'https://www.rockstargames.com/VI/media'};
export const ten20261105:Article[]=data.map(d=>{
 const picture=(key:string)=>({key,alt:localized(pictures[key]),caption:localized(pictures[key].map((alt,i)=>`${alt}. ${d.pictureContext[i]}`)),credit});
 const cover=picture(d.imageKeys[0]);
 const refs=[...new Set(d.sections.flatMap(s=>s.refs).filter(k=>!k.startsWith('related-')))];
 return {id:`gta6-${d.key}-20261105`,category:d.category as Article['category'],slug:d.slug as Three,title:d.title as Three,excerpt:d.excerpt as Three,tag:d.tag as Three,image:cover.key,imageAlt:cover.alt,imageCaption:cover.caption,imageCredit:credit,published:'2026-11-05',updated:'2026-11-05',body:d.sections[0].paragraphs[0] as Three,sources:[...refs.map(k=>sources[k]),credit],sections:d.sections.map((s,i)=>({heading:s.heading as Three,paragraphs:s.paragraphs as Three[],references:s.refs.map(k=>sources[k]),...('table'in s?{table:s.table as Article['sections'][number]['table']}:{}),...(i===1?{image:picture(d.imageKeys[1])}:i===3?{image:picture(d.imageKeys[2])}:{})}))};
});
