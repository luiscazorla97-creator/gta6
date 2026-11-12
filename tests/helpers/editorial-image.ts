import {expect,type Locator} from '@playwright/test';

// Responsive naturalWidth/naturalHeight are density-corrected and rounded.
// Decode the selected URL without srcset to check its actual pixel geometry.
export async function expectResponsiveEditorialImage(image:Locator){
 const actual=await image.evaluate(async(element:HTMLImageElement)=>{
  await element.decode();
  const selected=new Image();selected.src=element.currentSrc;await selected.decode();
  return {complete:element.complete,naturalWidth:element.naturalWidth,naturalHeight:element.naturalHeight,resourceWidth:selected.naturalWidth,resourceHeight:selected.naturalHeight,width:Number(element.getAttribute('width')),height:Number(element.getAttribute('height')),src:element.src,currentSrc:element.currentSrc,srcset:element.getAttribute('srcset')??'',sizes:element.getAttribute('sizes')??''};
 });
 expect(actual.complete).toBe(true);
 for(const value of [actual.naturalWidth,actual.naturalHeight,actual.resourceWidth,actual.resourceHeight,actual.width,actual.height])expect(value).toBeGreaterThan(0);
 expect(actual.srcset).not.toBe('');expect(actual.sizes).not.toBe('');
 const candidates=actual.srcset.split(',').map(value=>value.trim().split(/\s+/));
 for(const [url,descriptor] of candidates){expect(url).toMatch(/^\/(?:responsive|media)\//);expect(descriptor).toMatch(/^[1-9]\d*w$/);}
 expect(candidates.map(([url])=>new URL(url,actual.src).href)).toContain(actual.currentSrc);
 // A resized bitmap may round its proportional height to an integer pixel.
 expect(Math.abs(actual.resourceHeight-actual.resourceWidth*actual.height/actual.width)).toBeLessThanOrEqual(1);
}
