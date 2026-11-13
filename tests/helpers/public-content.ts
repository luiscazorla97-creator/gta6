import type {Page} from '@playwright/test';

// Own-origin requests use the browser's normal proxy and certificate validation.
// Fixtures below do not reroute or replace FansGTA content.

// A test-only blank image keeps unrelated external video-poster availability
// separate from homepage card/hydration checks. No blocked image is retrieved,
// and these checks do not certify YouTube video or thumbnail delivery.
export async function fixtureVideoPoster(page:Page){
 await page.route('https://i.ytimg.com/**',route=>route.fulfill({
  status:200,contentType:'image/svg+xml',
  body:'<svg xmlns="http://www.w3.org/2000/svg" width="480" height="270"></svg>',
 }));
}

// Finish outstanding fixture callbacks before Playwright closes the context.
// Waiting retains failures from active handlers instead of ignoring them.
export async function finishPublicContentRoutes(page:Page,baseURL:string|undefined){
 if(baseURL?.replace(/\/$/,'')==='https://fansgta.com')
  await page.unrouteAll({behavior:'wait'});
}
