import type {Article} from './articles';

export interface PageData {
 articles:Article[];
 readingTimes:Record<string,[number,number,number]>;
}
let cached:PageData|undefined;
export function clientPageData():PageData|undefined{
 if(typeof document==='undefined')return undefined;
 if(!cached){
  const node=document.getElementById('fansgta-page-data');
  if(node?.textContent)cached=JSON.parse(node.textContent) as PageData;
 }
 return cached;
}
