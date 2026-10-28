import { adUnits } from './config';
import type { AdUnitName } from './config';
import { recordAdDiagnostic } from './diagnostics';

type AdOptions = {key:string;format:'iframe';height:number;width:number;params:Record<string,never>};
type AdWindow = Window & {atOptions?:AdOptions};

// Postscribe preserves document.write for the supplied synchronous banner tags.
// Its stream queue keeps each unit's configuration active through nested scripts.
// Import only in the browser: the library accesses window during initialisation.
let writer: ReturnType<typeof importWriter> | undefined;
function importWriter(){return import('postscribe').then(module=>module.default);}

export async function loadAd(target:HTMLElement,name:AdUnitName,onError:()=>void){
 let postscribe:Awaited<ReturnType<typeof importWriter>>;
 try{postscribe=await (writer??=importWriter());}
 catch{target.dataset.adState='error';recordAdDiagnostic(name,'writer-error','No se pudo cargar el adaptador de anuncios.');onError();return;}
 if(!target.isConnected)return;
 const unit=adUnits[name];
 const src=`https://bauval.org/${name==='native'?'21':'22'}/${unit.key}`;
 const adWindow=window as AdWindow;
 let configured=false,previous:AdOptions|undefined,hadOptions=false;
 const scriptSources=new Set<string>();
 const fail=(kind:'load-error'|'runtime-error'|'writer-error',source?:string)=>{
  target.dataset.adState='error';
  target.dataset.adFailureKind=kind;
  recordAdDiagnostic(name,kind,undefined,source);
  onError();
 };
 const scopedScript=()=>document.currentScript instanceof HTMLScriptElement&&target.contains(document.currentScript);
 const csp=(event:SecurityPolicyViolationEvent)=>{
  if(scriptSources.has(event.blockedURI)||scopedScript())recordAdDiagnostic(name,'csp-warning',event.effectiveDirective,event.blockedURI);
 };
 target.dataset.adState='loading';
 recordAdDiagnostic(name,'loading',undefined,src);
 document.addEventListener('securitypolicyviolation',csp);
 postscribe(target,`<script data-cfasync="false" type="text/javascript"${name==='native'?' async':''} src="${src}"></script>`,{
  releaseAsync:false,
  beforeWriteToken(token){
   if(token.src){try{scriptSources.add(new URL(token.src,location.href).href);}catch{/* Malformed secondary URLs are not page-error provenance. */}}
   if(name!=='native'&&!configured&&token.src===src){
    configured=true;
    hadOptions=Object.prototype.hasOwnProperty.call(adWindow,'atOptions');
    previous=adWindow.atOptions;
    adWindow.atOptions={key:unit.key,format:'iframe',height:unit.height,width:unit.width,params:{}};
   }
   return token;
  },
  done(){
   document.removeEventListener('securitypolicyviolation',csp);
   if(configured){if(hadOptions)adWindow.atOptions=previous;else delete adWindow.atOptions;}
   if(target.dataset.adState!=='error'){
    target.dataset.adState='loaded';
    recordAdDiagnostic(name,'script-loaded','Terminó la carga del script; no confirma que se haya mostrado un anuncio.',src);
   }
  },
  // Never throw here: the writer must restore document.write and release its queue.
  error(error){
   const message=typeof error==='object'&&error!==null&&'msg' in error?String(error.msg):'';
   // Postscribe forwards EVERY window.onerror while a stream is active. Only
   // attribute a runtime exception when its executing script/source is ours.
   const runtimeSource=message.match(/ - (.*): \d+$/)?.[1];
   if(message===`remote script failed ${src}`){fail('load-error',src);return;}
   if(scopedScript()||(runtimeSource&&scriptSources.has(runtimeSource))){fail('runtime-error',runtimeSource||src);return;}
   if(error instanceof Error||message==='Bad script nesting or script finished twice'){fail('writer-error');return;}
   if(message.startsWith('remote script failed ')){
    recordAdDiagnostic(name,'resource-warning','Falló un script secundario.',message.slice('remote script failed '.length));return;
   }
   recordAdDiagnostic(name,'runtime-warning','Error global sin atribución al anuncio.');
  },
 });
}
