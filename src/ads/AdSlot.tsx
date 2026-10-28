import { useEffect, useRef, useState } from 'react';
import { adUnits } from './config';
import type { AdUnitName } from './config';
import type { Locale } from '../content';
import { loadAd } from './loadAd';
export default function AdSlot({unit:unitName,locale}:{unit:AdUnitName;locale:Locale}){
 const unit=adUnits[unitName];const root=useRef<HTMLDivElement>(null),provider=useRef<HTMLDivElement>(null),started=useRef(false);const [failed,setFailed]=useState(false),[fits,setFits]=useState(false),[visible,setVisible]=useState(false);
 useEffect(()=>{if(!unit.enabled){setFits(false);setVisible(false);return;}const media=window.matchMedia(unitName==='mobile'?'(max-width: 767px)':unitName==='sidebar'?'(min-width: 1440px)':unitName==='leaderboard'?'(min-width: 768px)':'(min-width: 0px)');const update=()=>{const width=root.current?.clientWidth??0;setFits(media.matches&&(unit.width===0||width>=unit.width));};update();media.addEventListener('change',update);const observer=new ResizeObserver(update);if(root.current)observer.observe(root.current);return()=>{media.removeEventListener('change',update);observer.disconnect();};},[unitName,unit]);
 useEffect(()=>{if(!fits){setVisible(false);return;}const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setVisible(true);observer.disconnect();}},{rootMargin:'100px'});if(root.current)observer.observe(root.current);return()=>observer.disconnect();},[fits]);
 useEffect(()=>{if(!visible||!provider.current||started.current)return;started.current=true;const target=provider.current;const fail=()=>{if(target.isConnected)setFailed(true);};void loadAd(target,unitName,fail).catch(fail);},[visible,unitName]);
 const enabled=unit.enabled&&fits;
 return <div ref={root} className={`ad-slot ad-slot-${unitName} ${enabled?'ad-slot-enabled':''}`} data-ad-unit={unitName}><span className="ad-label">{locale==='es'?'Publicidad':locale==='en'?'Advertisement':'Publicité'}</span><div className="ad-reserved" style={{minHeight:unit.height,width:unit.width||'100%'}}>{failed&&<span className="ad-unavailable" role="status">{locale==='es'?'Anuncio temporalmente no disponible':locale==='en'?'Advertisement temporarily unavailable':'Annonce temporairement indisponible'}</span>}<div ref={provider} className="ad-provider">{unitName==='native'&&<div id={`container-${unit.key}`}/>}</div></div></div>;
}
