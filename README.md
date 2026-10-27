# FansGTA · fansgta.com

Independent GTA editorial portal in Spanish, English and French. This project lives in `/workspace/gta6` and never touches BarberControl or its backend.

## Development

Node 22 or 24. No credentials are needed for development or builds.

```sh
cd /workspace/gta6
npm ci --cache /tmp/fansgta-npm-cache --no-audit --no-fund
npm run dev -- --port 5173
```

## Production

```sh
npm run build          # staging build: noindex
npm run build:release  # editorial launch build: indexable
npm run preview -- --port 4173
```

TypeScript, Vite browser compilation, SSR compilation and static generation run in sequence. The release currently generates 91 generated route documents: three homepages, 27 category pages, 60 article translations and one 404 page. Every public article and category can be read without JavaScript. Empty categories stay noindex and are excluded from the sitemap even in a release build.

## Tests

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Playwright starts the production preview itself. Elsewhere, install a Playwright Chromium browser through its supported installer and omit the executable override. This environment blocks the Playwright download host but has system Chromium. Do not disable TLS verification.

The browser suite covers static pages without JavaScript, real category and article URLs, multilingual SEO metadata, structured data, language switching on an article, search, favorites and persistence, map filters/progress, mobile navigation, newsletter honesty and video consent. See `docs/verification.md` for executed results.

## Editorial publishing

`src/articles.ts` contains the twenty original editorial articles and their translations. Every article has its own stable localized slug, section, summary, headings, sources and dates. `src/routes.ts` defines localized category paths. Keep slugs stable; add a 301 redirect if changing one. Adding an article to the data array makes it available in its category, search, static output and sitemap on the next build. Homepage selections are curated separately in `src/App.tsx`.

These are evergreen guides and analyses, not live-verified breaking news. Links identify references rather than proving a recent source check. There are no invented release dates, cheats, mission rewards, vehicle specifications or claimed traffic counts. `src/config.ts` deliberately keeps release date/platforms unset until a live official-source check succeeds.

## Images and video

Article covers and the hero now use real GTA VI imagery obtained from Rockstar’s public Media page, which invites visitors to download and share media. Images retain Rockstar credit, with source URLs recorded in public/media/credits.json. The demo map remains original and fictional. This is not a claim that Rockstar trademarks or media are public domain.

A historical official first-trailer reference is available in `src/OfficialVideo.tsx`. The page does not request YouTube resources until the visitor explicitly loads the privacy-enhanced embedded player. Playback availability could not be checked live from this environment. The interaction is tested with a mocked player, not represented as an end-to-end check of YouTube.

## Deployment

See `docs/cloudflare-launch.md`. User authorization to launch has been given, but a production deployment requires an authenticated Cloudflare connection and working network access. Cloudflare Pages Git builds must use **`npm run build:release`**, output **`dist`**, and Node 22 or 24. The included `_headers` restricts resource origins and allows only the optional YouTube player as an external frame. `_redirects` handles `/` and the `www` host; custom domain and HTTPS verification remain required after deployment.

## Remaining work

- Cloudflare account connection, Pages deployment, custom domains and HTTPS verification.
- Live verification of current Rockstar announcements and image reuse terms.
- Licensed game screenshots, when permissions are established.
- Supabase Auth/RLS and private CMS in a **separate** Supabase project.
- Reviewed-source daily automation; it is not running in this chat or in a worker.
- Full map search/panning/admin and verified game data. Current map is clearly fictional, with local demo progress.
- AdSense, analytics/consent integration, production legal/contact information and Search Console. No ad network or analytics is connected and newsletter addresses are not collected.
