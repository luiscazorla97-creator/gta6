export const analyticsId='G-JXHZ3W8WHP';
export const analyticsConsentKey='fansgta:analytics-consent:v1';
export const analyticsConsentLifetime=180*24*60*60*1000;
export type AnalyticsChoice='accepted'|'rejected'|'unknown';
type AnalyticsWindow=Window&{dataLayer?:unknown[];gtag?:(...args:unknown[])=>void;'ga-disable-G-JXHZ3W8WHP'?:boolean};
let initialized=false;

export function readAnalyticsConsent():AnalyticsChoice{
 try{
  const record=JSON.parse(localStorage.getItem(analyticsConsentKey)??'null');
  if(record&&(record.choice==='accepted'||record.choice==='rejected')&&Number.isFinite(record.savedAt)&&record.savedAt<=Date.now()&&Date.now()-record.savedAt<analyticsConsentLifetime)return record.choice;
 }catch{/* Storage is optional; Analytics stays blocked without a valid choice. */}
 return 'unknown';
}
export function saveAnalyticsConsent(choice:Exclude<AnalyticsChoice,'unknown'>){
 try{localStorage.setItem(analyticsConsentKey,JSON.stringify({choice,savedAt:Date.now()}));return true;}catch{return false;}
}
function clearAnalyticsCookies(){
 const names=document.cookie.split(';').map(c=>c.trim().split('=')[0]).filter(name=>/^_ga(?:_|$)/.test(name));
 const domains=[''];const parts=location.hostname.split('.');
 while(parts.length>1){domains.push(parts.join('.'),'.'+parts.join('.'));parts.shift();}
 for(const name of names)for(const domain of domains)document.cookie=`${name}=; Max-Age=0; Path=/; SameSite=Lax${domain?'; Domain='+domain:''}`;
}
/** Returns true when a reload is needed to discard an already executed SDK. */
export function applyAnalyticsConsent(choice:AnalyticsChoice){
 const w=window as AnalyticsWindow;
 w['ga-disable-G-JXHZ3W8WHP']=choice!=='accepted';
 if(choice!=='accepted'){clearAnalyticsCookies();return initialized;}
 if(initialized)return false;
 initialized=true;
 w.dataLayer=w.dataLayer||[];
 w.gtag=(...args:unknown[])=>{w.dataLayer!.push(args);};
 // Basic mode: no Google Analytics script or consent pings before acceptance.
 w.gtag('consent','default',{analytics_storage:'denied'});
 w.gtag('consent','update',{analytics_storage:'granted'});
 w.gtag('js',new Date());
 w.gtag('config',analyticsId);
 const script=document.createElement('script');script.id='fansgta-ga4';script.async=true;
 script.dataset.cfasync='false';script.src='https://www.googletagmanager.com/gtag/js?id='+analyticsId;
 document.head.appendChild(script);
 return false;
}
