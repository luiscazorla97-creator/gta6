# Current status — re-enabled 30 October 2026

After initially pausing Adsterra, the user explicitly requested reactivation at the top, bottom and both sides, loading automatically while awaiting AdSense approval. All five supplied banner formats are enabled. SiteAds provides top/bottom bands on every route, using 728x90 on fitting desktop screens and 320x50 on fitting mobile screens. Both 160x300 side placements appear at viewport widths of at least 1760 px, in the existing outer gutters; they scroll normally, without a custom sticky/overlay format. No article width is reduced. Existing rectangle/native placements remain; native occurs at most once per page. The former per-article top/sidebar copies were removed to keep placement intentional.

Top/bottom bands and fitting rails initialise eagerly without an advertising acceptance step or scrolling requirement. Inline/native remain proximity-loaded. Slots that cannot fit are skipped; 320 px screens can use the fluid native placement. The Analytics banner remains independent and blocks GA4 until acceptance. AdSense verification and ads.txt are unchanged. A later explicit October 30 request enabled the supplied popunder on internal navigation; see the Popunder section. No paid service, security-rule change, fake creative, anti-blocking bypass or subscription was introduced.

The August 28, 2026 official static HTML guide was checked again: https://help-publishers.adsterra.com/en/articles/5210780-adding-ads-to-a-static-html-site. It states that repeating a Static Banner code counts impressions per unique visitor; the same supplied sidebar/leaderboard/mobile code is reused for its two positions, without inventing new IDs or claiming twice the revenue. Native code is not repeated. Older blog warnings about repeats are not used to invent extra units. Direct per-slot execution and the existing postscribe queue preserve atOptions through repeated instances. No provider-side frequency/approval change is made.

Temporary means pending actual AdSense approval, not a guessed date. This executor has no account-side AdSense approval monitor. Retire Adsterra when the owner confirms approval or effective account access verifies it; do not claim an automatic approval transition exists.

The sections below explain the adapter; the older placement table describes the earlier layout. Current placements are the site-wide bands/rails above.

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

YouTube retains its independent external-media preference. Popunder activation follows the later October 30 request described below. Public unit management continues through protected project configuration.

## Popunder

The user explicitly supplied and authorized `https://abscloud.org/1/411b396510ae8d6a491f3f094ff61658` on October 30, superseding the earlier disabled state. Unit 31958936 is enabled. The SDK is prepared on the destination after a trusted same-tab internal link to an existing article, section or localized homepage. Native navigation is never canceled or delayed; no synthetic click or custom window-opening workaround is used. Direct visits, Analytics choices, theme/search buttons, same-page anchors, legal/external/download links and modified/new-tab clicks do not arm it.

The pending destination lasts 60 seconds in per-tab sessionStorage. Local SDK activation is capped at once per 30 minutes per tab, reserved before the request to avoid repeated failures/reloads. If session storage is blocked, navigation remains usable and no popunder SDK is prepared. This cap controls **SDK loading**, not the provider's actual popup frequency. `providerFrequencyVerified` remains false: dashboard window caps and real delivery have not been verified. Browser controls are not bypassed, and a newly loaded SDK may require a subsequent user interaction under its own implementation.

The script has `data-cfasync="false"` set before its source, exactly preserving the supplied URL. Banner units, Analytics consent, AdSense verification and security headers remain unchanged. The direct endpoint request returned HTTP 403 from this cloud environment. Mocked browser checks verify script activation and navigation, never real window opening, fill or revenue. No administrative panel or provider-side frequency guarantee is fabricated.

## Verification limits

### Error attribution and optional mobile report

Postscribe temporarily forwards every global `window.onerror` to the active stream. FansGTA now treats a runtime error as that slot's failure only when the currently executing script belongs to its container or the reported source matches a script admitted to that stream. A definite failure to download the unit's bootstrap remains an error. An unscoped page exception or secondary resource failure is recorded as a warning rather than declaring the whole advertisement unavailable. No CORS attribute or browser privacy bypass was added.

`?ads-debug=1` enables a client-only report at the end of the page. It identifies public unit IDs, load/runtime/resource/CSP events and the bootstrap source, with URL query/fragment information omitted. It does not send telemetry or claim that a loaded script represents a real impression. Without this query, the panel is absent and histories are not collected.

The mobile top banner and the desktop leaderboard are different units, so Windows success alone does not identify the cause of an iPhone failure. Current tests compare the same responsive layout on Chromium and WebKit. WebKit's local HTTP preview excludes the HTTPS-upgrade directive because it upgrades loopback assets to HTTPS; the live site's policy retains that directive.

Earlier direct checks of the supplied banner and native script endpoints returned HTTP 403 with empty JavaScript bodies from this environment, including a browser-style user agent and site referrer. Those requests did not reproduce the complete visitor browsing context and do not prove that Adsterra is responsible for the blank slots. A successful script response also does not guarantee a creative or a paid impression.

Automated tests use mocked provider responses to check loading, script order, responsive widths, duplicates, failure reporting and layout. They do **not** demonstrate real creative delivery, fill rate, revenue or provider approval. Real delivery must be checked in a normal visitor session and the publisher dashboard. No alternate provider domain, unit key or fake creative is used to conceal a failure.

## Why the previous wrapper was removed

The owner reports the domain approved and units active and re-supplied matching snippets. The previous integration executed them inside an extra sandboxed FansGTA iframe without `allow-same-origin`. That gives the document an opaque origin and restricts storage and some JavaScript APIs; successful mock scripts did not exercise those provider requirements. See the [iframe sandbox reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#allow-same-origin). The wrapper also differed from Adsterra's documented body placement. The direct integration removes these known differences and updates the main-page CSP accordingly. This is a correction to our integration, not evidence by itself that a real advertisement was served.

## Reactivation verification — 30 October

Release build and static verification passed: 200 HTML pages, 7,587 internal links, 371 structured-data blocks; 52 prior topics/156 editions retained. The combined 48-case browser run covered automatic top/bottom/sides, production-CSP provider fixtures with nested document.write/storage, failures and queue recovery, responsive sizes, native single-instance, resize preservation, Analytics rejection/acceptance/withdrawal, AdSense and article navigation. One desktop test exposed an asynchronous fixture route being fulfilled after its request context was disposed; the page route is now drained before closing that test. The targeted withdrawal check was rerun on both desktop/mobile. This was test-fixture cleanup, not a relaxed application assertion. No application change was made to mask it.

Direct provider bootstrap checks with ordinary TLS/proxy, browser user-agent and FansGTA referrer returned HTTP 403 with zero-byte bodies for all five supplied endpoints in this environment. Evidence: /tmp/fansgta-adsterra-restored-endpoints.json during this run. Do not infer a universal provider-side fault or claim real fill from fixture results. No alternate domain, fake ad or bypass was introduced. Public deployment/placement verification remains required before reporting completion.

Final observed results: the two withdrawal checks passed after the fixture cleanup fix; all 48 distinct checks are covered by passing results across these runs. Both placement checks passed again and desktop/mobile screenshots were visually inspected. No content overlap or page overflow found. Root Analytics-consent implementation remains unchanged; only its provider-mocking/fixture cleanup tests were adjusted. git diff --check passed.

## Corrección del popunder tras el aviso del usuario (30 de octubre)

El SDK no estaba dentro de un banner ni iframe: se añadía a document.body desde un componente global. El problema comprobable era de tiempo: se cargaba después de la navegación completa y reservaba 30 minutos incluso cuando la descarga fallaba. Así se perdía el clic que había iniciado la navegación y se suprimía el SDK en páginas siguientes. Esto no explica por sí solo el 403 del proveedor.

Se sustituye ese cargador por una única etiqueta async en index.html, antes de </head>, con la URL exacta y data-cfasync=false. Adsterra exige cabecera para HTML estático: https://adsterra.com/blog/popunder-traffic-monetization/ (sección de instalación). Se elimina la reserva local de 30 minutos, no se duplica el SDK al hidratar y no se interceptan enlaces ni se crean ventanas propias. Los controles de frecuencia y ventana quedan a cargo del proveedor y navegador. Los banners, sus IDs, la CSP, AdSense y el consentimiento independiente de Analytics no cambian. La nueva comprobación HTTPS con Referer fansgta.com también devolvió HTTP 403, cuerpo vacío, desde esta nube. Eso impide confirmar entrega real; las pruebas simulan el SDK y comprueban que puede recibir el primer clic real antes de navegar.

## Laterales 160 × 600 solicitados el 31 de octubre

El usuario entregó la clave 83b265326d039193990417c5911eaf72 y su script https://bauval.org/22/83b265326d039193990417c5911eaf72. Sustituye la anterior unidad lateral 160×300 (clave bda767ca1714356b89730236ba25d4cd, ID histórico 31958939) en ambos costados. No se adivina un nuevo ID numérico del panel: la clave sirve como referencia local de diagnóstico. El adaptador conserva atOptions {key,format:iframe,height:600,width:160,params:{}} durante cada ejecución serializada y la exclusión Rocket Loader. Ambos laterales usan la misma unidad suministrada en contenedores independientes. Se muestran desde 1760px cuando caben en los márgenes, sin superponer texto ni forzar 320px extra en móvil. Las pruebas usan anuncios simulados; no acreditan entrega real, impresiones o ingresos del proveedor.

## Decisión vigente: solo banners estáticos (31 de octubre)

El usuario pidió retirar el anuncio que abre una ventana al hacer clic por considerarlo invasivo. Se elimina la etiqueta abscloud de la cabecera, se marca popunder.enabled=false y se corrige la información publicitaria ES/EN/FR. Este pedido sustituye las autorizaciones previas del popunder: no reactivarlo sin una solicitud nueva explícita. Continúan los banners superiores, inferiores, inline/nativo y ambos laterales 160×600 con sus claves y carga serializada. No cambia Analytics, AdSense ni las reglas de seguridad. No se añaden interceptores para compensar el SDK retirado.
