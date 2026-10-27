# Search discovery

The site serves public HTML in Spanish, English and French, with canonical links, hreflang, per-page metadata, BlogPosting/WebPage/BreadcrumbList data, a sitemap and crawlable internal links. Empty sections and ad documents are noindex. More words alone do not establish ranking; added sections are topic-specific and source-linked.

Google and Bing independently decide crawling, indexing and ranking. A crawlable site and sitemap do not prove inclusion. No verified Google Search Console or Bing Webmaster owner connection is available to this task, so no submission or ownership verification is claimed.

For Google: add a domain property for fansgta.com in Search Console, verify ownership using the exact TXT record Google provides, then submit https://fansgta.com/sitemap.xml. If using a URL-prefix property instead, follow the provided HTML verification method. Do not invent a verification token. Inspect a few important URLs and request indexing after verification; do not use deprecated sitemap-ping endpoints or claim the Indexing API is appropriate for ordinary gaming articles.

For Bing: verify the site in Webmaster Tools (or use its supported Search Console import after Google verification) and submit the same sitemap.

Cloudflare Pages `_redirects` does not support domain-level source matches. The root redirect now uses an absolute apex destination. Deep www pages carry apex canonical tags and a client redirect. A host-wide edge 301 for every deep URL would require the appropriate Cloudflare zone redirect-rule access; no unsupported `_redirects` host rule remains.
