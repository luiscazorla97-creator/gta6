# FansGTA · fansgta.com

Independent GTA editorial portal in Spanish, English and French. Isolated checkout: `/workspace/gta6`. Never modify BarberControl or reuse its backend.

## Run and verify

Node 22 or 24.

```sh
npm ci --cache /tmp/fansgta-npm-cache --no-audit --no-fund
npm run dev -- --port 5173
npm run build          # staging: noindex
npm run build:release  # editorial launch: eligible pages indexable
node scripts/verify-static.mjs
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

The production pipeline type-checks, builds the browser bundle and SSR entry, generates public HTML, then generates five isolated advertising documents. There are 30 editorial articles in three languages, category pages, four legal/contact pages per language, a custom 404 and a root homepage copy. Empty categories and advertising documents stay noindex and out of the sitemap. `npm run preview -- --port 4173` runs the built site internally. Playwright starts its preview itself; on other machines use a supported Chromium installation without disabling TLS.

## Content and SEO

`src/news.ts`, `src/articles.ts`, `src/characters.ts`, `src/expansions.ts` and `src/theories.ts` provide source-linked histories, news, guides and clearly labelled fan theories. Twenty existing pieces gained topic-specific context; six character histories and two theories were added. Article contents link to sections, related profiles are selected by relationship, and localized routes remain stable.

The character hub includes Jason, Lucia, Cal, Boobie, Dre’Quan, Bae-Luxe and Roxy (one joint Real Dimez history), Raul and Brian. Lori and DWNPLY are covered where named, without invented standalone biographies.

Canonical, hreflang, metadata, JSON-LD, sitemap and crawlable HTML are generated in `scripts/static-pages.mjs`. Google popularity is not fabricated; indexing and ranking are not guaranteed. See `docs/search-indexing.md` for owner verification and sitemap submission. Search Console and Bing Webmaster accounts have not been connected.

## Media and regions

Real Rockstar images have credits and source URLs in `public/media/credits.json`; WebP versions are served locally. The original fictional map has been replaced by a selector/gallery of Rockstar-named regions. This is not represented as a complete official map or verified geometry. A complete official map was not found in the consulted pages. Mount Kalaga is named without a substituted unrelated image when a specific asset is unavailable.

The first official YouTube trailer is visible without a load button, without autoplay, using the privacy-enhanced domain. External-media preferences can disable it. The policy accurately explains that player loading contacts YouTube even before playback. Tests mock player responses and do not claim live playback verification.

## Advertising

See `docs/adsterra.md`. Five supplied banner formats load **automatically**, subject to responsive fit and viewport proximity. The owner requested removal of the site’s acceptance prompt on 2026-10-28. Provider/browser controls remain in effect. Scripts run in isolated sandboxed documents, avoiding shared atOptions races. Popunder is disabled and never requested. No CMS/admin exists: protected repository configuration is the current management path. No private credentials are in ad configuration.

Provider script checks returned empty HTTP 403 responses from this environment. Mocks verify integration behaviour; actual fill/revenue/provider acceptance remains unverified. No AdSense or Google Analytics is connected.

## Legal and contact

Privacy, cookies/preferences, terms and contact are real localized pages. The user-designated contact is `soporte@barbercontrol.org`; this does not connect databases or code to another project. The newsletter currently checks email format without storing or sending addresses. Policy text covers actual hosting, browser storage, YouTube and automatically loaded Adsterra without claiming universal legal compliance.

## Publication

The user authorizes direct GitHub/Cloudflare publication. Repository: `luiscazorla97-creator/gta6`, production branch `main`. Cloudflare Pages project `fansgta`, command `npm run build:release`, output `dist`. Authentication is supplied through environment settings, never chat or committed files. Explicit deployment triggers have been used; do not assume webhook delivery is healthy because a source configuration exists.

Pages does not support host-level `_redirects` source rules. The root uses an absolute apex redirect; deep www URLs use apex canonical metadata and a client redirect. A host-wide edge 301 would require the appropriate zone-rule access. Verify public HTTP/TLS and headers after each production change.

## Still separate work

Supabase Auth/RLS/private CMS, verified full game map/tools, daily reviewed-source automation, Google/Bing owner verification and any future additional networks. No purchases, paid plans or new fees have been activated by this work.

## Requested editorial batches

Follow AGENTS.md and docs/editorial/user-brief.md for each new requested batch. Review docs/editorial/inventory.json before choosing topics and update it after publication. The 2026-10-28 batch adds one verified PS5 feature report and one legal purchase/preload tutorial in three languages. Source research, interest signals, limitations and prices are recorded in docs/editorial/2026-10-28-research.md. No unattended daily schedule is enabled.
