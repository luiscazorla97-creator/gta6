import { adUnits } from './config';
import type { AdUnitName } from './config';

export type AdDiagnosticKind=
 |'loading'|'script-loaded'|'load-error'|'runtime-error'|'writer-error'
 |'runtime-warning'|'resource-warning'|'csp-warning';

export interface AdDiagnosticEvent {
 kind:AdDiagnosticKind;
 time:string;
 message?:string;
 source?:string;
}

export interface AdDiagnosticSnapshot {
 unit:AdUnitName;
 id:string;
 status:AdDiagnosticKind|'not-requested';
 events:AdDiagnosticEvent[];
}

const histories=new Map<AdUnitName,AdDiagnosticEvent[]>();
const eventName='fansgta:ads-diagnostic';

function enabled(){
 return typeof window!=='undefined'&&new URLSearchParams(window.location.search).get('ads-debug')==='1';
}

function redactSource(value:string):string {
 const raw=value.trim();
 if(!raw)return '';
 if(/^(inline|eval|wasm-eval|self)$/i.test(raw))return raw;
 try {
  const url=new URL(raw,window.location.origin);
  if(url.protocol!=='https:'&&url.protocol!=='http:')return `${url.protocol}[contenido omitido]`;
  const hostname=/^\[.*\]$|^\d{1,3}(?:\.\d{1,3}){3}$/.test(url.hostname)?'[dirección omitida]':url.hostname;
  // Do not retain credentials, URL parameters, fragments or IP addresses.
  return `${url.protocol}//${hostname}${url.port?':'+url.port:''}${url.pathname}`.slice(0,400);
 } catch {
  return '[origen no disponible]';
 }
}

function redactMessage(value:string):string {
 return value
  .replace(/https?:\/\/[^\s<>"']+/gi,url=>redactSource(url))
  .replace(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g,'[dirección omitida]')
  .replace(/[\r\n\t]+/g,' ')
  .slice(0,400);
}

/** Opt-in, page-memory-only diagnostics. Nothing is stored or sent anywhere. */
export function recordAdDiagnostic(unit:AdUnitName,kind:AdDiagnosticKind,message?:string,source?:string):void {
 if(!enabled())return;
 const events=histories.get(unit)??[];
 events.push({kind,time:new Date().toISOString(),...(message?{message:redactMessage(message)}:{}),...(source?{source:redactSource(source)}:{})});
 histories.set(unit,events.slice(-10));
 window.dispatchEvent(new CustomEvent(eventName));
}

export function getAdDiagnostics():AdDiagnosticSnapshot[] {
 return (Object.keys(adUnits) as AdUnitName[]).map(unit=>{
  const events=(histories.get(unit)??[]).map(event=>({...event}));
  return {unit,id:adUnits[unit].id,status:events.at(-1)?.kind??'not-requested',events};
 });
}
