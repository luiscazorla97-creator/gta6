export function mediaPath(image:string){const names:Record<string,string>={city:'vice-city',palms:'lucia',drive:'jason'};return `/media/${names[image]??image}.webp`;}
declare const __MEDIA_VARIANTS__:Record<string,{version:string;widths:number[];width:number;avif:boolean;phone?:boolean;trim?:{left:number;top:number;width:number;height:number}}>;
const variants=typeof __MEDIA_VARIANTS__==='undefined'?{}:__MEDIA_VARIANTS__;
export const heroImageSizes='(max-width:760px) 1200px, (min-width:1280px) calc(100vw - 380px), 100vw';
export function phoneImage(image:string,format:'avif'|'webp'='avif'){
 const entry=variants[image];return entry?.phone?`/responsive/${entry.version}/${image}-phone.${format}`:undefined;
}
export function aircraftImage(){
 const entry=variants['hero-motion-helicopter'];
 return entry?.trim?{href:`/responsive/${entry.version}/hero-motion-helicopter-trimmed.webp`,x:entry.trim.left,y:entry.trim.top,width:entry.trim.width,height:entry.trim.height}:{href:'/media/hero-motion-helicopter.webp',x:0,y:0,width:1672,height:941};
}
export function responsiveImage(image:string,sizes='(max-width:760px) calc(100vw - 36px), 900px'){
 const key=mediaPath(image).split('/').pop()!.slice(0,-5),entry=variants[key];
 if(!entry)return {};
 return{srcSet:[...entry.widths.map(w=>`/responsive/${entry.version}/${key}-${w}.webp ${w}w`),`${mediaPath(image)} ${entry.width}w`].join(', '),sizes};
}
export function avifSources(image:string){
 const entry=variants[image];
 return entry?.avif?[...entry.widths,entry.width].map(w=>`/responsive/${entry.version}/${image}-${w}.avif ${w}w`).join(', '):undefined;
}
export const mediaCredit='GTA VI © Rockstar Games · rockstargames.com/VI/media';
export function mediaAlt(image:string,locale:'es'|'en'|'fr') {if(image.startsWith('gta5-')){const subject=({'gta5-helicopter':'Buzzard — Los Santos','gta5-michael':'Michael De Santa','gta5-franklin':'Franklin Clinton'} as Record<string,string>)[image]??'GTA V';return locale==='es'?`${subject}: captura promocional oficial de GTA V`:locale==='en'?`${subject}: official GTA V promotional screenshot`:`${subject} : capture promotionnelle officielle de GTA V`;}const subjects:Record<string,string>={city:'Vice City',palms:'Lucia Caminos',drive:'Jason Duval',jason:'Jason Duval',lucia:'Lucia Caminos','cal-hampton':'Cal Hampton','boobie-ike':'Boobie Ike','drequan-priest':'Dre’Quan Priest','real-dimez':'Bae-Luxe y Roxy — Real Dimez','raul-bautista':'Raul Bautista','brian-heder':'Brian Heder','vice-city':'Vice City','leonida-keys':'Leonida Keys','port-gellhorn':'Port Gellhorn',grassrivers:'Grassrivers',ambrosia:'Ambrosia',hero:'GTA VI',music:'GTA VI — Music',trailer:'GTA VI — Trailer'};const subject=subjects[image]??'GTA VI';return locale==='es'?`${subject}: imagen promocional de GTA VI, Rockstar Games`:locale==='en'?`${subject}: GTA VI promotional image, Rockstar Games`:`${subject} : image promotionnelle de GTA VI, Rockstar Games`;}

export function mediaDimensions(image:string){if(image.startsWith('region-')||image.startsWith('feature-'))return {width:1400,height:788};if(image.startsWith('history-'))return {width:800,height:988};const sizes:Record<string,[number,number]>={"collector-box-closed":[1200,1200],"collector-box-open":[1200,1200],"gta5-helicopter":[1400,788],"gta5-michael":[1400,788],"gta5-franklin":[1400,788],"ambrosia":[1400,788],"boobie-ike":[1400,788],"brian-heder":[1400,788],"cal-hampton":[1400,788],"drequan-priest":[1400,788],"grassrivers":[1400,788],"hero":[1600,800],"jason":[1600,900],"leonida-keys":[1400,788],"lucia":[1600,900],"music":[1600,686],"port-gellhorn":[1400,788],"raul-bautista":[1400,788],"real-dimez":[1400,788],"trailer":[1600,900],"vice-city":[1600,900]};const key=({city:'vice-city',palms:'lucia',drive:'jason'} as Record<string,string>)[image]??image;const [width,height]=sizes[key]??[1600,900];return {width,height};}
