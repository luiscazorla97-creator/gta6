import { mkdir,writeFile } from 'node:fs/promises';
import { adUnits } from '../.ssr/entry-server.js';
await mkdir('dist/ads',{recursive:true});
for(const [name,unit] of Object.entries(adUnits)){
 const banner=name!=='native';
 const content=banner?`<script>var atOptions=${JSON.stringify({key:unit.key,format:'iframe',height:unit.height,width:unit.width,params:{}})};</script><script src="https://bauval.org/22/${unit.key}"></script>`:`<script async data-cfasync="false" src="https://bauval.org/21/${unit.key}"></script><div id="container-${unit.key}"></div><script>new ResizeObserver(()=>parent.postMessage({type:'fansgta-native-height',height:Math.max(document.body.scrollHeight,100)},'*')).observe(document.body);</script>`;
 await writeFile(`dist/ads/${name}.html`,`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Adsterra advertisement ${unit.id}</title><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}body{width:${unit.width?unit.width+'px':'100%'};min-height:${unit.height}px}iframe{border:0;max-width:100%}</style></head><body>${content}</body></html>`);
}
console.log('Generated 5 isolated provider documents; popunder is not emitted.');
