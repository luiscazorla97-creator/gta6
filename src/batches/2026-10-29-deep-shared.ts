import type { Article } from '../articles';
export type T=[string,string,string];
export const edge={label:'Simon Parkin / Edge — The state that never sleeps, 29 October 2026',url:'https://www.gamesradar.com/edge/gtavi-cover/'};
export const ign={label:'Rachel Weber / IGN — The Big Interview, 7 October 2026 (Best Buy republication)',url:'https://www.bestbuy.com/gamers/gamers-articles/pcmcat1791490206931'};
export const vgc={label:'Dave Aubrey / VGC — console performance report, 28 August 2026',url:'https://www.videogameschronicle.com/news/gta-6-is-confirmed-to-be-30-frames-per-second-at-launch-no-performance-mode-at-launch/'};
export const sony={label:'PlayStation — Grand Theft Auto VI, checked 29 October 2026',url:'https://www.playstation.com/en-us/games/grand-theft-auto-vi/'};
export const pro={label:'PlayStation — PS5 Pro specifications and per-game limitations',url:'https://www.playstation.com/en-us/ps5/ps5-pro/'};
export const official={label:'Rockstar Games — GTA VI',url:'https://www.rockstargames.com/VI'};
export const media={label:'Rockstar Games — official media, download/share context',url:'https://www.rockstargames.com/VI/media'};
export const internal=(label:string,slug:string)=>({label:'FansGTA — '+label,url:'https://fansgta.com/es/'+slug+'/'});
export const image=(key:string,alt:T,caption:T)=>({key,alt,caption});
export const section=(heading:T,paragraphs:T[],references:Article['sources']=[],picture?:ReturnType<typeof image>):Article['sections'][number]=>({heading,paragraphs,references,...(picture?{image:picture}:{})});
export function makeArticle(a:Omit<Article,'published'|'updated'|'body'>):Article{return {...a,published:'2026-10-29',updated:'2026-10-29',body:a.sections[0].paragraphs[0]};}
