import {useEffect,useState} from 'react';
import {Pause,Play} from 'lucide-react';
import type {Locale} from './content';

export default function HeroScene({locale}:{locale:Locale}){
 const [allowed,setAllowed]=useState(false),[paused,setPaused]=useState(false),[background,setBackground]=useState(false),[aircraft,setAircraft]=useState(false);
 useEffect(()=>{
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const connection=(navigator as Navigator&{connection?:{saveData?:boolean}}).connection;
  const update=()=>setAllowed(!preference.matches&&!connection?.saveData);
  update();preference.addEventListener('change',update);return()=>preference.removeEventListener('change',update);
 },[]);
 const ready=background&&aircraft;
 const labels={es:['Pausar movimiento','Reanudar movimiento'],en:['Pause motion','Resume motion'],fr:['Mettre en pause','Reprendre le mouvement']}[locale];
 return <><div className="hero-scene" aria-hidden="true">
  <img className="hero-art" src="/media/vice-city.webp" alt="" width="1600" height="900" fetchPriority="high"/>
  {allowed&&<div className="hero-motion-layers" data-ready={ready} data-paused={paused}>
   <img className="hero-motion-base" src="/media/hero-motion-background.webp" alt="" width="1672" height="941" onLoad={()=>setBackground(true)} onError={()=>setAllowed(false)}/>
   <div className="hero-aircraft">
    <img src="/media/hero-motion-helicopter.webp" alt="" width="1672" height="941" onLoad={()=>setAircraft(true)} onError={()=>setAllowed(false)}/>
    <svg className="hero-rotor" viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid slice"><g transform="translate(1032 184) rotate(8) scale(1 .11)"><circle r="70" fill="#29292e" opacity=".08"/><g className="hero-rotor-spin" opacity=".36"><path d="M-72-3H72V3H-72zM-3-72H3V72H-3z" fill="#24252c"/></g></g></svg>
   </div>
   <div className="hero-water-glint"/>
  </div>}
 </div>{allowed&&ready&&<button type="button" className="hero-motion-control" onClick={()=>setPaused(p=>!p)} aria-label={labels[paused?1:0]} title={labels[paused?1:0]}>{paused?<Play size={14}/>:<Pause size={14}/>}<span>{labels[paused?1:0]}</span></button>}</>;
}
