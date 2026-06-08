// ─── Canonical Site URL ────────────────────────────────────────────────────────
// Single source of truth for the canonical domain used across:
//   • PageSEO (canonical, OG, Twitter, JSON-LD)
//   • next-sitemap.config.js (siteUrl, STATIC_PAGE_META keys)
//   • public/robots.txt (Sitemap reference)
//
// NEVER use bare 'https://uixplor.com' (non-www) strings elsewhere in the codebase.
// Always import SITE_URL from here.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = 'https://www.uixplor.com';
export const SITE_NAME = 'UIXplor';
