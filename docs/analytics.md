# Google Analytics 4 — 30 October 2026

The user supplied G-JXHZ3W8WHP and explicitly requested manual installation. index.html contains one async googletagmanager.com/gtag/js loader and one initialisation/config block. Both exclude Rocket Loader through data-cfasync=false. The measurement ID is public, not a secret.

The app uses full-page links and location.assign for language changes, so the default GA4 page_view per page load applies; no duplicate React event or manual send_page_view is added. No custom names, emails or passwords are added to gtag parameters. Automatic SDK collection depends on Google's implementation and account configuration.

Translated privacy/cookies disclosures were updated. Code installation does not demonstrate consent-law compliance, delivery to Google, ownership of the property or event receipt in its reports. The owner can inspect Realtime/DebugView in their Google Analytics account. No paid services or Google account settings are changed. AdSense verification remains; Adsterra remains paused.

Validation before publication: release build and static verifier passed; eight desktop/mobile checks passed across Analytics, AdSense and disabled-Adsterra suites. Mocked Google loaders test the queued configuration only, not reception by Google's servers. Public HTML must be checked after successful Cloudflare deployment.
