import {test,expect} from '@playwright/test';
test('AdSense verification script is present exactly once on each language and ads.txt matches the publisher',async({request})=>{
 for(const locale of ['es','en','fr']){
  const response=await request.get('/'+locale+'/');expect(response.status()).toBe(200);
  const html=await response.text();
  const scripts=[...html.matchAll(/<script\b[^>]*src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-1382859681401211"[^>]*>/g)].map(m=>m[0]);
  expect(scripts).toHaveLength(1);expect(scripts[0]).toContain('async');expect(scripts[0]).toContain('crossorigin="anonymous"');expect(scripts[0]).toContain('data-cfasync="false"');
 }
 const txt=await request.get('/ads.txt');expect(txt.status()).toBe(200);expect((await txt.text()).trim()).toBe('google.com, pub-1382859681401211, DIRECT, f08c47fec0942fa0');
});
