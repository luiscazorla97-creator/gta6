import {useEffect,useRef,useState} from 'react';
import {Pause,Play} from 'lucide-react';
import type {Locale} from './content';
import {avifSources,responsiveImage,heroImageSizes,aircraftImage,phoneImage} from './media';

export default function HeroScene({locale}:{locale:Locale}){
 const [allowed,setAllowed]=useState(false),[paused,setPaused]=useState(false),[background,setBackground]=useState(false),[aircraft,setAircraft]=useState(false);
 const still=useRef<HTMLImageElement>(null),[motion,setMotion]=useState(false);
 const sizes=heroImageSizes;
 useEffect(()=>{
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const connection=(navigator as Navigator&{connection?:{saveData?:boolean}}).connection;
  const update=()=>setAllowed(!preference.matches&&!connection?.saveData);
  update();preference.addEventListener('change',update);return()=>preference.removeEventListener('change',update);
 },[]);
 useEffect(()=>{
  if(!allowed)return;
  let frame=0,idle=0,timer=0,cancelled=false;
  const start=()=>{frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(()=>{
   const activate=()=>{if(!cancelled)setMotion(true);};
   if(typeof window.requestIdleCallback==='function')idle=window.requestIdleCallback(activate,{timeout:1500});
   else timer=window.setTimeout(activate,100);
  });});};
  const image=still.current;
  if(image?.complete&&image.naturalWidth)start();else image?.addEventListener('load',start,{once:true});
  return()=>{cancelled=true;cancelAnimationFrame(frame);if(idle)window.cancelIdleCallback(idle);clearTimeout(timer);image?.removeEventListener('load',start);};
 },[allowed]);
 const ready=background&&aircraft;
 const labels={es:['Pausar movimiento','Reanudar movimiento'],en:['Pause motion','Resume motion'],fr:['Mettre en pause','Reprendre le mouvement']}[locale];
 return <><div className="hero-scene" aria-hidden="true">
  <picture><source media="(max-width:480px)" type="image/avif" srcSet={phoneImage('vice-city')}/><source media="(max-width:480px)" type="image/webp" srcSet={phoneImage('vice-city','webp')}/><source type="image/avif" srcSet={avifSources('vice-city')} sizes={sizes}/><img ref={still} className="hero-art" src="/media/vice-city.webp" {...responsiveImage('vice-city',sizes)} alt="" width="1600" height="900" loading="eager" fetchPriority="high"/></picture>
  {allowed&&motion&&<div className="hero-motion-layers" data-ready={ready} data-paused={paused}>
   <picture><source media="(max-width:480px)" type="image/avif" srcSet={phoneImage('hero-motion-background')}/><source media="(max-width:480px)" type="image/webp" srcSet={phoneImage('hero-motion-background','webp')}/><source type="image/avif" srcSet={avifSources('hero-motion-background')} sizes={sizes}/><img className="hero-motion-base" src="/media/hero-motion-background.webp" {...responsiveImage('hero-motion-background',sizes)} alt="" width="1672" height="941" decoding="async" fetchPriority="low" onLoad={()=>setBackground(true)} onError={()=>setAllowed(false)}/></picture>
   <div className="hero-aircraft">
    <svg className="hero-aircraft-art" viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid slice"><image {...aircraftImage()} onLoad={()=>setAircraft(true)} onError={()=>setAllowed(false)}/></svg>
    <svg className="hero-rotor" viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid slice"><g transform="translate(1032 184) rotate(8) scale(1 .11)"><circle r="70" fill="#29292e" opacity=".08"/><g className="hero-rotor-spin" opacity=".36"><path d="M-72-3H72V3H-72zM-3-72H3V72H-3z" fill="#24252c"/></g></g></svg>
   </div>
   <div className="hero-water-glint"/>
  </div>}
 </div>{allowed&&ready&&<button type="button" className="hero-motion-control" onClick={()=>setPaused(p=>!p)} aria-label={labels[paused?1:0]} title={labels[paused?1:0]}>{paused?<Play size={14}/>:<Pause size={14}/>}<span>{labels[paused?1:0]}</span></button>}</>;
}
