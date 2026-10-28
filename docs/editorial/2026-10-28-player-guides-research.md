# Player guides research — checked 2026-10-28

This bounded sub-batch contains three new topics and nine complete language editions in `src/batches/2026-10-28-player-guides.ts`. The parent batch owns integration, media-rights review, inventory, validation and publication. No automatic schedule or new subscription has been enabled.

## Duplicate review and distinct search intent

Reviewed all 30 entries in `docs/editorial/inventory.json` and the existing purchase guide.

| New article ID | Main query | Why it is distinct |
| --- | --- | --- |
| gta-6-gta-plus-redemption-2026-10-28 | gta 6 gta plus pre order / auto renew | The existing purchase guide briefly mentions the bonus. This guide answers account eligibility, platform-specific redemption steps, different claim deadlines, existing-member extension and renewal management. It links to the buying guide rather than repeating its checkout and price comparison. |
| gta-6-offline-ps5-2026-10-28 | gta 6 offline play / offline story mode | Existing console preparation is general, and the buying guide covers obtaining the game. This guide explains the specific PS5 offline listing and system licence setting, with explicit limits before release. It does not duplicate a generic console or platform overview. |
| gta-6-esrb-parental-controls-2026-10-28 | gta 6 age rating esrb / age rating and why | No existing rating or family-controls article. This guide uses the actual GTA VI ESRB record and separates content restrictions, time limits and spending controls. It does not infer a GTA VI rating from GTA V. |

## Observed Google autocomplete signals

On 2026-10-28 the Google suggestions endpoint returned HTTP 200 for all three English queries below. These are query suggestions, **not** search volume, popularity rankings, growth percentages or proof of commercial demand. Locale: `hl=en`, client: `firefox`; no country filter specified. Some suggestions are misleading questions, not confirmed game features.

1. `gta 6 gta plus`
   - Endpoint: https://suggestqueries.google.com/complete/search?client=firefox&hl=en&q=gta+6+gta+plus
   - Returned suggestions included `gta 6 gta plus benefits`, `gta 6 gta plus subscription`, `gta 6 gta plus pre order`, `gta 6 gta plus auto renew`, `gta 6 free gta plus`.
2. `gta 6 offline`
   - Endpoint: https://suggestqueries.google.com/complete/search?client=firefox&hl=en&q=gta+6+offline
   - Returned suggestions included `gta 6 offline mode`, `gta 6 offline or online`, `gta 6 offline play`, `gta 6 offline story mode`, `gta 6 offline single player`.
3. `gta 6 age rating`
   - Endpoint: https://suggestqueries.google.com/complete/search?client=firefox&hl=en&q=gta+6+age+rating
   - Returned suggestions included `gta 6 age rating and why`, `gta 6 age rating esrb`, `gta 6 age rating us`, `gta 6 age rating details`, `gta 6 age rating uk`.

No quantitative Google Trends evidence was collected within this subtask. The parent batch records its own Trends checks and any access limitation.

Additional qualitative coverage observed through web search:

- GTA+ redemption: https://www.itechguides.com/how-to-redeem-a-gta-subscription-code-on-playstation-and-xbox/ — dated October 15, 2026; community question dated October 11 at https://www.reddit.com/r/GTA6/comments/1x2odux/who_is_redeeming_free_gta/ . These establish current questions, not factual authority for the offer.
- Offline play: https://www.itechguides.com/can-you-play-gta-6-offline-or-will-it-require-an-internet-connection/ — dated October 17, 2026; https://www.svg.com/2293694/can-you-play-gta-6-without-internet-connection/ — search indicated October 24. Secondary speculation about activation is not used as official fact.
- Ratings: https://www.videogameschronicle.com/news/gta-6-rating-pulled-after-revealing-sex-scenes-and-drug-use/ and https://www.pcgamer.com/games/grand-theft-auto/grand-theft-auto-6-features-detailed-decapitation-and-frequent-and-prominent-drug-use-according-to-hastily-deleted-pegi-rating/ — recent coverage about a withdrawn PEGI listing. The article does **not** treat that withdrawn record as a current official PEGI rating.

## Primary sources and claim boundaries

### GTA+ redemption

- https://support.rockstargames.com/articles/3SZF8cy8dG7lHsLf38uWK1/redeeming-the-one-month-gta-membership-included-with-your-grand-theft-auto-vi-pre-order — checked directly. Qualifying digital Standard/Ultimate purchase before November 20, 2026; immediate redemption is possible; PlayStation deadline March 31, 2027; Microsoft deadline 180 days from purchase through Offers & Credits; one redemption per platform account; existing members extend their next billing date; refund/reorder does not create another month; monthly renewal until cancellation.
- https://www.playstation.com/en-us/support/games/gta-vi-offer-terms/ — checked directly. Purchase through November 19 is equivalent to Rockstar's before-November-20 wording; same purchasing account; eligible stores/age requirements; separate Ultimate upgrade is not eligible; next charge displayed on activation; cancel through subscription management before that payment. Regional exclusions are not silently removed: the article instructs readers to verify their local store.
- https://support.rockstargames.com/articles/6XJ81z9IhWrcqVaQY8FP0f/games-available-in-gta-games-library — the subscription library is a separate product. No claim that the GTA VI base game or a new GTA VI online mode is included. No numerical recurring price is invented or converted between markets.

### PS5 offline play

- https://www.playstation.com/en-us/games/grand-theft-auto-vi/ — checked directly; lists offline play enabled and one player. Scope is PS5 documentation, not a launch-day functional test or a universal Xbox claim.
- https://www.playstation.com/en-us/support/account/ps5-console-sharing-offline-play/ — checked directly; Settings > Users and Accounts > Other > Console Sharing and Offline Play, one PS5 at a time, purchased/downloaded games available offline under that system arrangement.
- https://store.playstation.com/en-us/product/EP1004-PPSA01547_00-GTAVISTANDARD001/ — legal terms allow some content/features/services to require internet, account registration or a single-use code. Therefore no statement that all future game functions work without any connection or activation.
- https://www.playstation.com/en-us/support/games/troubleshoot-downloaded-playstation-game/ — library/download troubleshooting. No unverified download size, code, day-one patch, launch failure or PC system requirement.

### Ratings and families

- https://www.esrb.org/ratings/41627/grand-theft-auto-vi/ — checked directly, current game-specific record. M / Mature 17+, PS5/Xbox Series; named content warnings and in-game purchases. The article paraphrases these warnings without inventing specific scenes or mechanics.
- https://www.esrb.org/ratings-guide/ — distinguishes age categories, content descriptors and interactive elements. ESRB does not replace the classification used in every country. Its current page also includes GTA VI in its Most Viewed Games area; this is not labelled as Google search evidence.
- https://www.playstation.com/en-us/support/account/ps5-parental-controls-spending-limits/ — checked directly. Family setup, PS5 menu path, child-account restrictions, spending and communications, and signing out/back in when controls change during play.
- https://support.microsoft.com/en-us/family-safety/set-app-and-game-limits — app/game limits on compatible linked devices. The article links to these instructions without inventing an Xbox-specific menu path or presenting time controls as an age-rating override.

## Images, language and source links

Reused cover keys `vice-city`, `leonida-keys`, and `lucia`, all existing authentic Rockstar GTA VI imagery in `public/media/credits.json`. Each article supplies ES/EN/FR captions explicitly identifying illustration context: no fake redemption UI, no claimed offline test, no claim of a child-friendly game mode. Parent review retains the recorded official media/share conditions and credit, rather than inferring permission from Google Images.

Each article has six or seven topic-specific sections, translated title/slug/excerpt/body, practical numbered paragraphs and three FAQ answers. Internal references use existing canonical Spanish URLs so `Interior.localReference` selects the appropriate localized edition. Date metadata is October 28, 2026 across all versions. Type checking passed after the file was written; publication is not claimed by this subtask.
