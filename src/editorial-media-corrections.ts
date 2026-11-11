import type {Article} from './articles';

type Three=[string,string,string];
const aircraftDescription:Three=[
 'Jason con una pistola junto a una aeronave, con embarcaciones al fondo',
 'Jason holding a pistol beside an aircraft, with boats in the background',
 'Jason tenant un pistolet près d’un aéronef, avec des bateaux à l’arrière-plan'
];

// Jason_Duval_08 was historically keyed as "feature-phone". Its visible object
// is a pistol. Keep the asset key/URLs and each article's contextual caption.
function correctedDescription(alt:Three|undefined,caption:Three|undefined){
 if(!alt||!alt.some(value=>/teléfono|phone|téléphone|helicóptero|helicopter|hélicoptère/i.test(value)))return null;
 return {alt:[...aircraftDescription] as Three,caption:caption?.map((value,index)=>
  value.startsWith(alt[index])?aircraftDescription[index]+value.slice(alt[index].length):value
 ) as Three|undefined};
}

export function correctEditorialMediaDescriptions(article:Article):Article{
 const cover=article.image==='feature-phone'?correctedDescription(article.imageAlt,article.imageCaption):null;
 let changed=!!cover;
 const sections=article.sections.map(section=>{
  const correction=section.image?.key==='feature-phone'?correctedDescription(section.image.alt,section.image.caption):null;
  if(!correction||!section.image)return section;
  changed=true;
  return {...section,image:{...section.image,alt:correction.alt,caption:correction.caption??section.image.caption}};
 });
 return changed?{...article,...(cover?{imageAlt:cover.alt,...(cover.caption?{imageCaption:cover.caption}:{})}:{}),sections}:article;
}
