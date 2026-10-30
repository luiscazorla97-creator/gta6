import {test,expect} from '@playwright/test';
test('GA4 loader and configuration occur once on each localised homepage',async({request})=>{
 for(const locale of ['es','en','fr']){
  const html=await (await request.get('/'+locale+'/')).text();
  expect([...html.matchAll(/src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-JXHZ3W8WHP"/g)]).toHaveLength(1);
  expect([...html.matchAll(/gtag\('config', 'G-JXHZ3W8WHP'\)/g)]).toHaveLength(1);
 }
});
test('manual tag queues one configuration without adding a second page-view event',async({page})=>{
 await page.route('https://www.googletagmanager.com/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await page.route('https://pagead2.googlesyndication.com/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await page.goto('/es/');
 const queue=await page.evaluate(()=>((window as unknown as {dataLayer:IArguments[]}).dataLayer??[]).map(x=>Array.from(x)));
 expect(queue.filter(x=>x[0]==='config'&&x[1]==='G-JXHZ3W8WHP')).toHaveLength(1);
 expect(queue.filter(x=>x[0]==='event'&&x[1]==='page_view')).toHaveLength(0);
});
