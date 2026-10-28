# Purchase details research — checked 2026-10-28

## Inventory and intent boundaries

Reviewed `docs/editorial/inventory.json`, the existing two-topic batch and article type before writing. Three new intents are distinct from the existing purchase/download workflow and Ultimate overview:

1. **Physical code-in-box:** what a retail box provides, no-disc consequences for downloads and gifting, announced shipping/pickup timing and single-use PlayStation redemption. It does not repeat store prices or the general purchase walkthrough.
2. **Code/account regions:** verifying the intended account country, interpreting Rockstar's platform-specific region groups, Japan's expiry condition and troubleshooting. It does not present region changes as a way around restrictions.
3. **Standard → Ultimate upgrade:** validating the existing entitlement and choosing the add-on rather than repurchasing the full game. The existing Ultimate overview remains the detailed contents article.

IDs and three localized slugs are declared only in `src/batches/2026-10-28-purchase-details.ts`. Each entry includes complete ES/EN/FR sections, excerpt, body, cover caption, date, references, numbered practical checks and FAQ. Existing credited official assets (`hero`, `vice-city`, `jason`) illustrate the game and are not represented as images of packaging, region labels or exclusive edition content.

## Primary sources actually queried

- https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions — retrieved complete page, updated August 18, 2026. Confirms PS5/Series X|S, Standard/Ultimate, separate upgrade, prior redemption for boxed Standard, no disc, November 12 shipping/pickup/preload, regional groups and Japan's 170-day rule. The page's date is retained rather than pretending it is a new October announcement.
- https://store.rockstargames.com/game/buy-gta-vi — retrieved complete page. Confirms code-in-box and digital upgrade route. Its scraped comparison UI repeats some hidden Standard/Ultimate rows, so those duplicated rows were not interpreted as proof that Standard contains every Ultimate item.
- https://www.playstation.com/en-us/support/account/check-account-country-region/ — retrieved current official instructions; explains country/region lookup and that an existing account's region cannot be changed.
- https://www.playstation.com/en-us/support/store/redeem-ps-store-voucher-code/ — retrieved current instructions; account choice, one-time vouchers and no transfers between accounts support the practical advice.
- https://www.playstation.com/en-us/support/store/ps-store-voucher-code-problems/ — retrieved current official checks for region, validity, history, service status, damaged/retailer-activated vouchers and support evidence.

No exact add-on price is inferred by subtracting edition prices. No claim that a regional upgrade button is currently enabled without a transaction check. No invented download size, permanent connection requirement, launch-unlock hour, box contents beyond confirmed support information, PC entitlement or cross-platform ownership.

## Qualitative interest signals actually found

Searches used phrases including `GTA 6 physical edition code box disc October 2026`, `GTA 6 Ultimate Edition Upgrade how Standard physical official`, `GTA 6 region code October 2026`, and official PlayStation redemption/country queries.

- Physical edition: https://www.itechguides.com/gta-6-physical-edition-whats-in-the-box-and-which-bonus-digital-buyers-get/ (October 13, 2026); https://timesaver.gg/blog/gta-6-physical-copy (search result dated two days before this check). Older identifiable coverage provides context: https://www.pushsquare.com/news/2026/06/gta-6-physical-edition-doesnt-come-with-discs-its-a-code-in-the-box . These are evidence of continued editorial attention, not primary confirmation or search-volume measurements.
- Codes/regions: https://howtoplayhub.com/gta-6/ps5-retail-code-region-locked (updated October 21, 2026); https://www.gtabuddy.com/gta-6/guides/codes-and-regions/ (indexed current guide); https://www.reddit.com/r/GTA6unmoderated/comments/1x40q4u/gta_6_physical_edition_uk_should_i_redeem_my_code/ (October 12, 2026 buyer question). The article does not repeat the thread's region-switching suggestion.
- Upgrade: https://www.reddit.com/r/GTA6/comments/1x8y2fi/am_i_able_to_upgrade_to_ultimate_edition/ (October 18, 2026); https://www.reddit.com/r/IndiaPS5/comments/1xbgv6d/gta_6_is_it_possible_to_upgrade_to_ultimate/ (October 21, 2026); https://6charts.com/news/gta-6-ultimate-edition-upgrade-20-dollars-xbox-null-price-playstation-05-00-utc (October 23, 2026 search result). These demonstrate visible questions and recent coverage, not demand volume; their prices are not substituted for a verified current offer.

No Google Trends numbers, Google search volumes or rankings were obtained. No topic is described as the most searched.
