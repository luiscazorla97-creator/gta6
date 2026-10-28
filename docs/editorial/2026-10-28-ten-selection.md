# Ten-topic batch checked October 28, 2026

The new user brief asks for ten distinct articles in Spanish, English and French: thirty editions. The previous brief's two-topic count does not apply to this batch. Publication is authorized for completed, checked articles with appropriate imagery. Existing advertising now works according to the user; this batch does not alter it.

## Existing content and substitutions

Reviewed the thirty existing article records, all ninety localized URLs and their search intents before writing. Release date, platforms, named Leonida locations, individual character biographies, trailer literacy, PS5 features, general purchase/download instructions, Ultimate overview and Vintage preorder items already have coverage. Those candidate topics are retained and linked, rather than duplicated. An unannounced PC specification table or speculative accessibility menu would offer too little verified information for a useful full article; neither was commissioned.

The selected intents are:

1. Physical code-in-box versus a disc: what the purchased package actually contains.
2. Region restrictions: whether a code matches the buyer's platform account.
3. Standard-to-Ultimate upgrade: the add-on workflow after acquiring the base licence.
4. Preload date and preparation: schedule and library entitlement for an existing preorder, not a repeat purchase tutorial.
5. Collector's Box: physical collectibles versus an edition containing a game licence.
6. GTA+ offer redemption: claim deadlines, platform differences and subscription renewal.
7. Offline play on PS5: published compatibility and the console setting, not an Xbox claim or a launch-day test.
8. ESRB rating and parental controls: content suitability and family settings, explicitly identifying the US rating system.
9. GTA VI versus GTA V: a source-based comparison, without invented map-area ratios or benchmark results.
10. Reported 210 GB PS5 size: an explicitly labelled October 27 rumour/report, separate from the confirmed preload schedule. No final Rockstar size, Xbox size or day-one patch is inferred.

## Search evidence and limitations

Google autocomplete requests succeeded in English, Spanish and French. Visible completions included physical/disc, preload date/time, upgrade, collector box, GTA+ renewal, age ratings, GTA VI versus GTA V and size/poids/tamaño. These are qualitative query-discovery signals, not measured search volume, rankings or proof of commercial demand. Google Trends returned HTTP 429; no numerical trend score is claimed. Exact endpoints, observed completions, recent coverage and primary source checks are recorded in the companion research files.

## Media and implementation

The official GTA VI media publication was checked again and explicitly offers promotional imagery to download and share. Existing local WebP files have corresponding source URLs in `public/media/credits.json`; all sixteen open correctly. They remain Rockstar/Take-Two property, not public-domain assets. Each new article has a translated descriptive cover caption and a media source link. Where a game scene illustrates a commercial guide, the caption does not pretend to depict a store screen or the physical product. Extra figures are included only where explanatory; unrelated gameplay pictures are not added as filler.

The existing localized article schema, publication date, canonical, hreflang, JSON-LD and sitemap generation are retained. A small optional per-section figure field uses the existing editorial figure styling. No article is removed and no site redesign is undertaken. The current ten-topic aggregate is `src/batches/2026-10-28-ten.ts`.

## Validation before publication

The release build/type check and static verifier passed: 40 topics, 120 localized article routes, 164 total HTML documents, 5,958 internal links and 299 structured-data blocks. All 60 desktop/mobile browser checks passed. The new batch tests visit every topic through ES→EN→FR, inspect actual local image loading, production CSP, canonical/hreflang, source links, sitemap entries and horizontal overflow. Previous navigation, editorial and advertising regressions pass. Provider creatives are mocked; advertising configuration was not modified. Independent cross-review corrected the Japanese 170-day code expiry to explicitly concern PlayStation codes purchased in Japan and expanded the collector contents into the complete eleven-item list.
