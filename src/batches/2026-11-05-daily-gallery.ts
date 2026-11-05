import type {Article} from '../articles';
import data from './2026-11-05-daily-gallery.json' with {type:'json'};
type Three=[string,string,string];
const localized=(x:string[]):Three=>{if(x.length!==3)throw new Error('Three editorial languages required');return[x[0],x[1],x[2]];};
const refs:Record<string,{label:string;url:string}>={
 announcement:{label:'Rockstar Games · Launch Gallery announcement, 5 November 2026',url:'https://www.rockstargames.com/newswire/article/39ak81277255o9/explore-the-grand-theft-auto-vi-launch-gallery'},
 gallery:{label:'Rockstar Games · GTA VI Launch Gallery',url:'https://www.rockstargames.com/VI/launch-gallery'},
 media:{label:'Rockstar Games · GTA VI Media',url:'https://www.rockstargames.com/VI/media'},
 official:{label:'Rockstar Games · GTA VI',url:'https://www.rockstargames.com/VI'},
 'related-city':{label:'FansGTA · Vice City',url:'https://fansgta.com/es/guias/gta-6-vice-city-barrios-lugares-imagenes/'},
 'related-wetlands':{label:'FansGTA · Grassrivers',url:'https://fansgta.com/es/guias/gta-6-grassrivers-pantanos-manglares-imagenes/'},
 'related-preload':{label:'FansGTA · GTA VI preload',url:'https://fansgta.com/es/guias/precarga-gta-6-fecha-hora-consolas/'}
};
const credit={label:'GTA VI © Rockstar Games',url:refs.gallery.url};
const image=(i:number)=>({key:data.media[i].key,alt:localized(data.media[i].alt),caption:localized(data.media[i].caption),credit});
const cover=image(0);
export const dailyGallery20261105:Article={
 id:data.id,category:'news',slug:localized(data.slug),title:localized(data.title),excerpt:localized(data.excerpt),tag:localized(data.tag),body:localized(data.body),published:data.published,updated:data.updated,
 image:cover.key,imageAlt:cover.alt,imageCaption:cover.caption,imageCredit:credit,
 sources:[refs.announcement,refs.gallery,refs.media,refs.official],
 sections:data.sections.map((s,i)=>({heading:localized(s.heading),paragraphs:[...(i===0?[localized(data.body)]:[]),...s.paragraphs.map(localized)],references:s.refs.map(k=>refs[k]),...('imageIndex'in s&&typeof s.imageIndex==='number'?{image:image(s.imageIndex)}:{})}))
};
