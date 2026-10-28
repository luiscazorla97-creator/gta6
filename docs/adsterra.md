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

## Isolation and loading

Each unit is emitted as a dedicated `/ads/<unit>.html` document at build time. Browser-native parser ordering puts `atOptions` before its synchronous provider script. Each frame has its own global namespace, so concurrently loaded units cannot overwrite one another. React does not execute raw scripts using dangerouslySetInnerHTML. App strict-mode effects do not initialise the provider twice; a frame is created only once per mounted unit.

Frames are sandboxed without same-origin or top-navigation permissions. Legitimate ad links can open separate tabs; no application code opens windows or intercepts navigation. Native content may report its height; the parent verifies the exact frame source and bounds the size. A provider incompatible with these restrictions may require support review; this integration does not claim unsupported compatibility.

Public content retains a restrictive CSP. Only the isolated ad documents permit the HTTPS scripts, frames and resources needed by dynamically served creatives. They are noindex/nofollow, are absent from the sitemap, and retain provider snippets supplied by the user.

## Automatic loading and privacy

Enabled units load without an acceptance step on this site. The old fansgta:ad-consent preference is no longer read and no new advertising-choice record is created. Legacy records may remain until visitors clear browser data. The cookie page now explains automatic loading and has no nonfunctional accept/reject controls. It does not claim that these provider units are cookie-free, non-personalised or universally compliant. Provider-side notices and browser restrictions are not bypassed.

YouTube retains its independent external-media preference. The popunder remains disabled. Public unit management continues through protected project configuration.

## Popunder

Unit 31958936 is **disabled**. Its code is not emitted into any ad document, and it is never mounted. `enabled`, `frequencyVerifiedByProvider` and an explicit eligibility signal would all be needed for a later reviewed integration. No browser storage pretends to enforce the provider’s 24-hour frequency. Provider-side frequency controls are unverified and must be confirmed in Adsterra before any activation. No admin UI is fabricated: configuration changes require access to the protected repository and a deployment. A future CMS should persist settings under administrative RLS, not a public toggle.

## Provider limitation

Direct checks of the supplied banner and native script endpoints returned HTTP 403 with empty JavaScript bodies from this environment, including a normal browser-style user-agent and site referrer. The Adsterra privacy URL was reachable and redirected to `/privacy-policy-managed/`. Automated tests mock creatives to validate automatic loading, responsive sizing, namespace isolation, duplicates and layout. They do **not** demonstrate real ad delivery, revenue or provider approval. Real delivery must be checked in a normal visitor session and the publisher dashboard; no alternate code or domain has been invented to hide this limitation.
