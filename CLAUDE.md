# Client site starter (Gateway demo)

A reusable starter for Melva client websites: **Astro** (static site) + **Decap CMS** (editor at `/admin`) + **Netlify** (hosting, login, forms). This copy is a demo for Gateway Student Accommodation (gatewayres.co.za), built 2026-11-10 before any contract, with Gateway's public text and placeholder photos.

## How it fits together

- **Pages** are in `src/pages/` (home, rooms list and one page per room, news list and one page per post, contact, thanks, 404, `rss.xml`, `robots.txt`). One layout, `src/layouts/Base.astro`, handles every page's title, description, canonical link, link-preview image and Google structured data.
- **Editable content** (what the client changes in `/admin`):
  - News posts: `src/content/blog/*.md`
  - Rooms: `src/content/rooms/*.md`
  - Site settings (contact details, homepage banner, "what's included", institutions, apply link, demo mode): `src/data/site.json`
  - The fields are defined twice and **must stay in step**: `src/content.config.ts` (what the site expects) and `public/admin/config.yml` (what the editor shows).
- **Photos** live in `src/assets/` (not `public/`) so Astro resizes and converts them to WebP at build time. The editor uploads straight there: blog to `src/assets/blog`, rooms to `src/assets/rooms`, settings to `src/assets/site`. Image paths in content files are relative (`../../assets/...`), which is what Astro needs. Settings images are resolved by `assetImage()` in `src/lib/site.ts`.
- **Publishing:** the editor commits to `main` on GitHub through Netlify Git Gateway; Netlify rebuilds (about a minute).
- **Contact form:** Netlify Forms (`data-netlify="true"` on the form in `src/pages/contact.astro`), redirects to `/thanks/`. Needs form detection on in Netlify, plus an email notification.
- **Logins:** Netlify Identity, invite only. Invite emails land on the homepage with a token; an inline script in `Base.astro` forwards them to `/admin/`.

## Demo mode (important)

`demoMode: true` in `src/data/site.json` adds `noindex`, makes `robots.txt` block everything and shows a "Demo site" bar. This stops the demo competing with the client's real site in Google. **Switch it off at launch** (editor: Site settings > Demo mode).

## Brand

Colours and fonts are CSS variables at the top of `src/styles/global.css` (`--ink`, `--paper`, `--brand`, `--accent`, `--font-display`, `--font-serif`...). **Currently styled like melva.studio as a test** (2026-11-10): cream `#fff7ee`, brown `#442411`, slate blue `#6d8eb3`, periwinkle `#6887f4`; big bold uppercase Helvetica headings, Times for names and titles, square corners, and no pill buttons (calls to action are plain bold text with an arrow). The first placeholder look (teal and sand, Fraunces + Inter) is in git history (commit `867b3dc`). Blog covers are always cropped to 16:9 so any upload looks consistent. Logo and favicon are placeholders until Gateway's real logo is supplied.

## Placeholders to replace

- All photos (generated gradients labelled "January shoot"); real shoot planned for January 2027.
- Room prices are empty (hidden) until Gateway confirms them; room descriptions are short drafts from their current site.
- Apply links point at Gateway's current WordPress booking page (application portal is a possible phase 2).
- WhatsApp number empty (hidden) until confirmed.

## Commands

- `npm run dev`: local preview at localhost:4321
- `npm run build`: build to `dist/`
- `npm run cms` (with `npm run dev` running): try the editor locally at localhost:4321/admin/ without logging in

## Rules

- No em dashes in site copy or chat (Melissa's standing rule).
- Keep this file current after any structural change.
