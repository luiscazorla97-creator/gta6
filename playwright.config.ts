import { defineConfig } from '@playwright/test';
const chromiumLaunch=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH}:{};
const webkitMobile=process.env.FANSGTA_WEBKIT==='1';
export default defineConfig({
 testDir:'./tests',fullyParallel:true,
 use:{baseURL:'http://127.0.0.1:4173',headless:true},
 webServer:{command:'npm run preview -- --port 4173',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI},
 projects:[
  {name:'desktop',use:{browserName:'chromium',launchOptions:chromiumLaunch,viewport:{width:1440,height:1000}}},
  {name:'mobile',use:{browserName:webkitMobile?'webkit':'chromium',launchOptions:webkitMobile?{}:chromiumLaunch,viewport:{width:390,height:844},isMobile:true,hasTouch:true}},
 ],
});
