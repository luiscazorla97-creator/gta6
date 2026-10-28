# FansGTA standing instructions

Work only on FansGTA; never modify BarberControl or its backend. Use the existing checkout, not a new worktree unless explicitly requested.

For each user-requested article batch follow docs/editorial/user-brief.md. The user expects roughly five new topics on future daily requests unless the current request gives a different number. The initial 2026-10-28 brief asks for two topics, one current-interest report and one practical tutorial, each in Spanish, English and French. Publication to GitHub/Cloudflare is authorized once complete and verified; purchases/paid services are not.

Before writing, inspect existing articles and docs/editorial/inventory.json. Compare the search intent, not only titles. Update an equivalent article rather than republish it. Record topic decisions and checked sources in docs/editorial. Refresh the inventory after adding or updating a batch.

Research current sources and dates. Use Google Trends/news/search when available, recording access limits. Never invent search volume, Google popularity, quotes, leaks, prices, platforms or launch/download availability. Clearly separate confirmed information, third-party reports and rumours. Tutorials distinguish buying, preordering, preloading and playable access; prices must specify actual market, currency and check date in every language.

Use authentic GTA imagery with recorded source/rights context, translated descriptive alt and captions. Preserve localized slugs, metadata, canonical, hreflang, sources near claims and relevant internal links. No general redesign or content deletion for an article batch.

Advertising currently loads automatically with no site acceptance prompt, by the user's explicit 2026-10-28 instruction. Retain responsive/lazy per-slot tags and serialized banner configuration; do not reintroduce the opaque-origin publisher iframe wrapper. Keep truthful privacy text; do not claim cookie-free ads or bypass browser/provider controls. Popunder remains disabled. See docs/adsterra.md. Real provider scripts have returned HTTP 403; passing mocks does not verify real delivery.

Use npm run build:release, node scripts/verify-static.mjs and appropriate browser checks. Explicit Cloudflare deployment triggers have been required; verify public pages before claiming publication. A Codex automation named “Noticias diarias de FansGTA” was enabled at the user’s request on 2026-10-28. Scheduled runs research and publish two distinct GTA VI news topics in Spanish, English and French after verification, with duplicate/source/media checks. Its timezone is America/New_York and its cadence is daily with flexible timing. Do not fabricate news to reach the target; report insufficient material or access. Manual batch requests keep their explicitly requested scope.
