import {expect,type Locator} from '@playwright/test';

// Width descriptors let the browser choose a smaller resource. Intrinsic
// dimensions may be density-corrected; the reserved aspect ratio must agree.
export async function expectResponsiveEditorialImage(image:Locator){
 const actual=await image.evaluate(async(element:HTMLImageElement)=>{
  await element.decode();
  return {complete:element.complete,naturalWidth:element.naturalWidth,naturalHeight:element.naturalHeight,width:Number(element.getAttribute('width')),height:Number(element.getAttribute('height')),src:element.src,currentSrc:element.currentSrc,srcset:element.getAttribute('srcset')??'',sizes:element.getAttribute('sizes')??''};
 });
 expect(actual.complete).toBe(true);
 for(const value of [actual.naturalWidth,actual.naturalHeight,actual.width,actual.height])expect(value).toBeGreaterThan(0);
 expect(actual.srcset).not.toBe('');expect(actual.sizes).not.toBe('');
 const candidates=actual.srcset.split(',').map(value=>value.trim().split(/\s+/));
 for(const [url,descriptor] of candidates){expect(url).toMatch(/^\/(?:responsive|media)\//);expect(descriptor).toMatch(/^[1-9]\d*w$/);}
 expect(candidates.map(([url])=>new URL(url,actual.src).href)).toContain(actual.currentSrc);
 expect(Math.abs(actual.width/actual.height-actual.naturalWidth/actual.naturalHeight)).toBeLessThan(.01);
}
