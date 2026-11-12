import type {Page} from '@playwright/test';

// Keep normal TLS checks and the inherited cloud proxy for the live-origin suite.
// route.fetch uses the runtime CA trust; this does not ignore certificate errors.
export async function routePublicContent(page:Page,baseURL:string|undefined){
 if(baseURL?.replace(/\/$/,'')==='https://fansgta.com'){
  await page.route('https://fansgta.com/**',async route=>{
   const response=await route.fetch({timeout:45000});
   await route.fulfill({response});
  });
 }
}

// A test-only blank image keeps unrelated external video-poster availability
// separate from homepage card/hydration checks. No blocked image is retrieved,
// and these checks do not certify YouTube video or thumbnail delivery.
export async function fixtureVideoPoster(page:Page){
 await page.route('https://i.ytimg.com/**',route=>route.fulfill({
  status:200,contentType:'image/svg+xml',
  body:'<svg xmlns="http://www.w3.org/2000/svg" width="480" height="270"></svg>',
 }));
}

// Finish outstanding proxy fetches before Playwright disposes its API context.
// Waiting retains failures from active handlers instead of ignoring them.
export async function finishPublicContentRoutes(page:Page,baseURL:string|undefined){
 if(baseURL?.replace(/\/$/,'')==='https://fansgta.com')
  await page.unrouteAll({behavior:'wait'});
}
