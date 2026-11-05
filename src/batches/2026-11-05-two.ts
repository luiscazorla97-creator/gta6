import type {Article} from '../articles';
import data from './2026-11-05-two.json' with {type:'json'};
import sourceData from './2026-11-05-two-sources.json' with {type:'json'};
import mediaData from './2026-11-05-ten-media.json' with {type:'json'};
type Three=[string,string,string];
const sources:Record<string,{label:string;url:string}>=sourceData;
const images:Record<string,string[]>=mediaData;
const credit={label:'GTA VI © Rockstar Games',url:'https://www.rockstargames.com/VI/media'};
function localized(a:string[]):Three{if(a.length!==3)throw new Error('Three editorial languages required');return[a[0],a[1],a[2]];}
export const two20261105:Article[]=data.map(d=>{
 const image=(key:string)=>({key,alt:localized(images[key]),caption:localized(images[key].map((alt,i)=>`${alt}. ${d.pictureContext[i]}`)),credit});
 const cover=image(d.imageKeys[0]);const refs=[...new Set(d.sections.flatMap(s=>s.refs).filter(k=>!k.startsWith('related-')))];
 return{id:`gta6-${d.key}-20261105`,category:d.category as Article['category'],slug:localized(d.slug),title:localized(d.title),excerpt:localized(d.excerpt),tag:localized(d.tag),body:localized(d.sections[0].paragraphs[0]),published:'2026-11-05',updated:'2026-11-05',image:cover.key,imageAlt:cover.alt,imageCaption:cover.caption,imageCredit:credit,sources:[...refs.map(k=>sources[k]),credit],sections:d.sections.map((s,i)=>({heading:localized(s.heading),paragraphs:s.paragraphs.map(localized),references:s.refs.map(k=>sources[k]),...('table'in s?{table:s.table as Article['sections'][number]['table']}:{}),...(i===1?{image:image(d.imageKeys[1])}:i===3?{image:image(d.imageKeys[2])}:{})}))};
});
