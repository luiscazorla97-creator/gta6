# Current status — 30 October 2026

The user requested temporary removal while requesting AdSense approval. All five Adsterra units have enabled=false and popunder remains disabled. AdSlot renders no markup for disabled units; no scripts or placements are requested. Public unit IDs and the integration are retained for reversible restoration only on user request. Google AdSense verification remains installed; no approval claim. The enabled-ad fixture suite automatically skips while all units are off; tests/ads-disabled.spec.ts checks actual lack of requests and slots.

The following sections document the previous enabled integration and are historical while paused.

# Adsterra integration

Five banner formats are configured and enabled in `src/ads/config.ts`; no public admin/CMS exists. At the owner’s request on 2026-10-28, enabled banners load automatically, matching viewport/container width and proximity. The site no longer presents its own acceptance prompt. Provider and browser controls are not bypassed.

| Unit | Placement | Width gate |
| --- | --- | --- |
| 728×90, 31958941 | Homepage after discovery categories; article after introduction | Desktop, container at least 728 px |
| 160×300, 31958939 | Article side column without narrowing body | Viewport at least 1440 px |
| 300×250, 31958938 | After the fourth article paragraph, one instance | Container at least 300 px |
| 320×50, 31958940 | Homepage and below article introduction | Mobile, container at least 320 px; not alongside desktop banner |
| Native, 31958937 | After homepage news; before related articles | Fluid width, one instance |

At 320 px viewport width, fixed units that do not fit the content column are skipped rather than causing overflow. Native remains fluid.

## Direct loading and script order

Provider tags execute directly inside dedicated containers in the publisher page body; FansGTA does not wrap them in an additional iframe. Adsterra may create its own creative iframe through the supplied `format: 'iframe'` option. These are different mechanisms. The provider URLs, unit keys and sizes remain those supplied by the owner.

Because React mounts these containers after the document has been parsed, `postscribe` 2.0.8 handles the supplied synchronous banner snippets and any `document.write` output in the intended container. Its stream queue serializes execution, and each banner stream sets its own `atOptions` before loading the provider script and restores the previous value when the stream finishes. This avoids shared configuration races. React does not rely on `dangerouslySetInnerHTML` to execute scripts. The native target container exists before its asynchronous provider tag executes. Responsive fit, proximity loading and duplicate prevention still apply.

Tags use `data-cfasync="false"` before `type="text/javascript"` to exclude them from Cloudflare Rocket Loader. This does not repair a provider endpoint that returns 404 or 403. The public-page CSP permits the HTTPS scripts, creative frames, images and connections needed by the direct integration; it does not allow `unsafe-eval`. Provider scripts now execute in the publisher page context, without the former wrapper's storage and origin restrictions.

Adsterra's [static HTML guide](https://help-publishers.adsterra.com/en/articles/5210780-adding-ads-to-a-static-html-site) places banner and native snippets in the page body and warns against repeating a native unit on one page. Its [publisher terms, section 4.7](https://adsterra.com/publishers-terms-managed/) require prior written consent before placing its ad tag inside an additional iframe. Its [Cloudflare guide](https://help-publishers.adsterra.com/en/articles/5213852-using-adsterra-ads-with-cloudflare) documents the Rocket Loader exclusion. These sources support the placement and attribute choices; they do not certify this React adapter or establish successful real delivery.

## Automatic loading and privacy

Enabled units load without an acceptance step on this site. The old fansgta:ad-consent preference is no longer read and no new advertising-choice record is created. Legacy records may remain until visitors clear browser data. The cookie page now explains automatic loading and has no nonfunctional accept/reject controls. It does not claim that these provider units are cookie-free, non-personalised or universally compliant. Provider-side notices and browser restrictions are not bypassed.

YouTube retains its independent external-media preference. The popunder remains disabled. Public unit management continues through protected project configuration.

## Popunder

Unit 31958936 is **disabled** and is never mounted or requested. `enabled`, `frequencyVerifiedByProvider` and an explicit eligibility signal would all be needed for a later reviewed integration. No browser storage pretends to enforce the provider’s 24-hour frequency. Provider-side frequency controls are unverified and must be confirmed in Adsterra before any activation. No admin UI is fabricated: configuration changes require access to the protected repository and a deployment. A future CMS should persist settings under administrative RLS, not a public toggle.

## Verification limits

### Error attribution and optional mobile report

Postscribe temporarily forwards every global `window.onerror` to the active stream. FansGTA now treats a runtime error as that slot's failure only when the currently executing script belongs to its container or the reported source matches a script admitted to that stream. A definite failure to download the unit's bootstrap remains an error. An unscoped page exception or secondary resource failure is recorded as a warning rather than declaring the whole advertisement unavailable. No CORS attribute or browser privacy bypass was added.

`?ads-debug=1` enables a client-only report at the end of the page. It identifies public unit IDs, load/runtime/resource/CSP events and the bootstrap source, with URL query/fragment information omitted. It does not send telemetry or claim that a loaded script represents a real impression. Without this query, the panel is absent and histories are not collected.

The mobile top banner and the desktop leaderboard are different units, so Windows success alone does not identify the cause of an iPhone failure. Current tests compare the same responsive layout on Chromium and WebKit. WebKit's local HTTP preview excludes the HTTPS-upgrade directive because it upgrades loopback assets to HTTPS; the live site's policy retains that directive.

Earlier direct checks of the supplied banner and native script endpoints returned HTTP 403 with empty JavaScript bodies from this environment, including a browser-style user agent and site referrer. Those requests did not reproduce the complete visitor browsing context and do not prove that Adsterra is responsible for the blank slots. A successful script response also does not guarantee a creative or a paid impression.

Automated tests use mocked provider responses to check loading, script order, responsive widths, duplicates, failure reporting and layout. They do **not** demonstrate real creative delivery, fill rate, revenue or provider approval. Real delivery must be checked in a normal visitor session and the publisher dashboard. No alternate provider domain, unit key or fake creative is used to conceal a failure.

## Why the previous wrapper was removed

The owner reports the domain approved and units active and re-supplied matching snippets. The previous integration executed them inside an extra sandboxed FansGTA iframe without `allow-same-origin`. That gives the document an opaque origin and restricts storage and some JavaScript APIs; successful mock scripts did not exercise those provider requirements. See the [iframe sandbox reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#allow-same-origin). The wrapper also differed from Adsterra's documented body placement. The direct integration removes these known differences and updates the main-page CSP accordingly. This is a correction to our integration, not evidence by itself that a real advertisement was served.
