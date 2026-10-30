import {createContext,useContext,useEffect,useRef,useState} from 'react';
import type {ReactNode} from 'react';
import type {Locale} from './content';
import {legalPath} from './legal';
import {analyticsConsentKey,applyAnalyticsConsent,readAnalyticsConsent,saveAnalyticsConsent} from './analytics';
import type {AnalyticsChoice} from './analytics';

const copy={
 es:{title:'Tu privacidad en FansGTA',body:'Usamos Google Analytics para conocer las visitas y mejorar la web. Solo lo cargamos si aceptás. Podés rechazarlo o cambiar tu elección cuando quieras.',accept:'Aceptar Analytics',reject:'Rechazar Analytics',preferences:'Preferencias de Analytics',privacy:'Privacidad',cookies:'Cookies y preferencias',settings:'Google Analytics',unknown:'Pendiente de tu elección. Analytics está bloqueado.',accepted:'Aceptado. Analytics puede medir tus visitas.',rejected:'Rechazado. Analytics está bloqueado.',unsaved:'El navegador no permite guardar la elección. Se aplica a esta página; volveremos a preguntar en la próxima visita.'},
 en:{title:'Your privacy on FansGTA',body:'We use Google Analytics to understand visits and improve the website. It only loads if you accept. You can reject it or change your choice at any time.',accept:'Accept Analytics',reject:'Reject Analytics',preferences:'Analytics preferences',privacy:'Privacy',cookies:'Cookies and preferences',settings:'Google Analytics',unknown:'Awaiting your choice. Analytics is blocked.',accepted:'Accepted. Analytics may measure your visits.',rejected:'Rejected. Analytics is blocked.',unsaved:'Your browser cannot save this choice. It applies to this page; we will ask again on your next visit.'},
 fr:{title:'Votre confidentialité sur FansGTA',body:'Nous utilisons Google Analytics pour comprendre les visites et améliorer le site. Il se charge uniquement si vous acceptez. Vous pouvez refuser ou changer d’avis à tout moment.',accept:'Accepter Analytics',reject:'Refuser Analytics',preferences:'Préférences Analytics',privacy:'Confidentialité',cookies:'Cookies et préférences',settings:'Google Analytics',unknown:'En attente de votre choix. Analytics est bloqué.',accepted:'Accepté. Analytics peut mesurer vos visites.',rejected:'Refusé. Analytics est bloqué.',unsaved:'Votre navigateur ne permet pas d’enregistrer ce choix. Il s’applique à cette page ; nous vous le redemanderons lors de votre prochaine visite.'},
};
type ConsentContext={choice:AnalyticsChoice;openPreferences:()=>void;unsaved:boolean};
const Context=createContext<ConsentContext|null>(null);
function useConsent(){const value=useContext(Context);if(!value)throw Error('Analytics consent provider is missing');return value;}

export default function AnalyticsConsentProvider({locale,children}:{locale:Locale;children:ReactNode}){
 const [choice,setChoice]=useState<AnalyticsChoice>('unknown'),[ready,setReady]=useState(false),[open,setOpen]=useState(false),[unsaved,setUnsaved]=useState(false);
 const banner=useRef<HTMLDivElement>(null),trigger=useRef<HTMLElement|null>(null),lastChoice=useRef<AnalyticsChoice>('unknown'),volatileChoice=useRef<AnalyticsChoice|null>(null);const t=copy[locale];
 useEffect(()=>{
  const sync=()=>{
   const next=volatileChoice.current??readAnalyticsConsent();setChoice(next);setReady(true);
   if(next==='unknown')setOpen(true);else if(next!==lastChoice.current)setOpen(false);
   lastChoice.current=next;
   if(applyAnalyticsConsent(next))location.reload();
  };
  const storage=(event:StorageEvent)=>{if(event.key===analyticsConsentKey||event.key===null){volatileChoice.current=null;sync();}};
  const visibility=()=>{if(document.visibilityState==='visible')sync();};
  sync();window.addEventListener('storage',storage);document.addEventListener('visibilitychange',visibility);
  return()=>{window.removeEventListener('storage',storage);document.removeEventListener('visibilitychange',visibility);};
 },[]);
 useEffect(()=>{if(open&&trigger.current)banner.current?.focus();},[open]);
 function openPreferences(){trigger.current=document.activeElement as HTMLElement;setOpen(true);}
 function choose(next:'accepted'|'rejected'){
  const saved=saveAnalyticsConsent(next);volatileChoice.current=saved?null:next;lastChoice.current=next;
  setUnsaved(!saved);setChoice(next);setOpen(false);
  const reload=applyAnalyticsConsent(next);trigger.current?.focus();trigger.current=null;
  if(reload)location.reload();
 }
 return <Context.Provider value={{choice,openPreferences,unsaved}}>
  {ready&&open&&<div ref={banner} className="analytics-consent" role="region" aria-labelledby="analytics-consent-title" tabIndex={-1}>
   <div><h2 id="analytics-consent-title">{t.title}</h2><p>{t.body}</p><div className="analytics-consent-links"><a href={legalPath(locale,'privacy')}>{t.privacy}</a><a href={legalPath(locale,'cookies')+'#analytics'}>{t.cookies}</a></div></div>
   <div className="analytics-consent-actions"><button type="button" onClick={()=>choose('accepted')}>{t.accept}</button><button type="button" onClick={()=>choose('rejected')}>{t.reject}</button></div>
  </div>}
  {children}
  {unsaved&&<p className="analytics-save-notice" role="status">{t.unsaved}</p>}
 </Context.Provider>;
}
export function AnalyticsPreferencesButton({locale}:{locale:Locale}){const {openPreferences}=useConsent();return <button type="button" onClick={openPreferences}>{copy[locale].preferences}</button>;}
export function AnalyticsPreferences({locale}:{locale:Locale}){
 const {choice,openPreferences,unsaved}=useConsent(),t=copy[locale];
 return <section className="analytics-settings" id="analytics"><h2>{t.settings}</h2><p role="status">{t[choice]}{unsaved?' '+t.unsaved:''}</p><button type="button" className="button secondary" onClick={openPreferences}>{t.preferences}</button></section>;
}
