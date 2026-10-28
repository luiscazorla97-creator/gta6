import { adUnits } from './config';
import type { AdUnitName } from './config';

type AdOptions = {key:string;format:'iframe';height:number;width:number;params:Record<string,never>};
type AdWindow = Window & {atOptions?:AdOptions};

// Postscribe preserves document.write for the supplied synchronous banner tags.
// Its stream queue keeps each unit's configuration active through nested scripts.
// Import only in the browser: the library accesses window during initialisation.
let writer: ReturnType<typeof importWriter> | undefined;
function importWriter(){return import('postscribe').then(module=>module.default);}

export async function loadAd(target:HTMLElement,name:AdUnitName,onError:()=>void){
 const postscribe=await (writer??=importWriter());
 if(!target.isConnected)return;
 const unit=adUnits[name];
 const src=`https://bauval.org/${name==='native'?'21':'22'}/${unit.key}`;
 const adWindow=window as AdWindow;
 let configured=false,previous:AdOptions|undefined,hadOptions=false;
 target.dataset.adState='loading';
 postscribe(target,`<script data-cfasync="false" type="text/javascript"${name==='native'?' async':''} src="${src}"></script>`,{
  releaseAsync:false,
  beforeWriteToken(token){
   if(name!=='native'&&!configured&&token.src===src){
    configured=true;
    hadOptions=Object.prototype.hasOwnProperty.call(adWindow,'atOptions');
    previous=adWindow.atOptions;
    adWindow.atOptions={key:unit.key,format:'iframe',height:unit.height,width:unit.width,params:{}};
   }
   return token;
  },
  done(){
   if(configured){if(hadOptions)adWindow.atOptions=previous;else delete adWindow.atOptions;}
   if(target.dataset.adState!=='error')target.dataset.adState='loaded';
  },
  // Never throw here: the writer must restore document.write and release its queue.
  error(){target.dataset.adState='error';onError();},
 });
}
