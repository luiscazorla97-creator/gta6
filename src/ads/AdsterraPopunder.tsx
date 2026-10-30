import {useEffect} from 'react';
import {articles} from '../articles';
import {articlePath,sectionKeys,sectionPath} from '../routes';
import {popunder} from './config';

export const popunderStorageKey='fansgta:popunder-navigation:v1';
const destinations=new Set((['es','en','fr'] as const).flatMap(locale=>[
 `/${locale}/`,...sectionKeys.map(section=>sectionPath(locale,section)),...articles.map(article=>articlePath(locale,article)),
]));
type Activation={lastLoaded?:number;pending?:{path:string;at:number}};
function read():Activation{
 const raw=sessionStorage.getItem(popunderStorageKey);
 if(!raw)return {};
 try{return JSON.parse(raw)??{};}catch{return {};}
}
function coolingDown(state:Activation,now:number){return typeof state.lastLoaded==='number'&&state.lastLoaded<=now&&now-state.lastLoaded<popunder.activationIntervalMs;}

// Navigation remains native. The SDK is prepared on the destination page;
// actual window behaviour/frequency is controlled by provider and browser.
export default function AdsterraPopunder(){
 useEffect(()=>{
  if(!popunder.enabled)return;
  const now=Date.now();let state:Activation;
  try{state=read();}catch{return;}
  const pending=state.pending;
  if(pending&&typeof pending.at==='number'&&pending.at<=now&&now-pending.at<popunder.navigationWindowMs&&pending.path===location.pathname&&destinations.has(pending.path)&&!coolingDown(state,now)){
   // Reserve before loading to avoid repeated requests after failures or reloads.
   try{sessionStorage.setItem(popunderStorageKey,JSON.stringify({lastLoaded:now}));}catch{return;}
   if(!document.getElementById('fansgta-adsterra-popunder')){
    const script=document.createElement('script');script.id='fansgta-adsterra-popunder';
    script.dataset.cfasync='false';script.type='text/javascript';script.src=popunder.src;script.async=true;
    document.body.appendChild(script);
   }
  }
  const arm=(event:MouseEvent)=>{
   if(!event.isTrusted||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
   const anchor=event.target instanceof Element?event.target.closest<HTMLAnchorElement>('a[href]'):null;
   if(!anchor||anchor.hasAttribute('download')||(anchor.target&&anchor.target!=='_self'))return;
   const next=new URL(anchor.href,location.href);
   if(next.origin!==location.origin||next.pathname===location.pathname||!destinations.has(next.pathname))return;
   try{const current=read(),at=Date.now();if(!coolingDown(current,at))sessionStorage.setItem(popunderStorageKey,JSON.stringify({...current,pending:{path:next.pathname,at}}));}catch{/* Native navigation remains usable. */}
  };
  document.addEventListener('click',arm);
  return()=>document.removeEventListener('click',arm);
 },[]);
 return null;
}
