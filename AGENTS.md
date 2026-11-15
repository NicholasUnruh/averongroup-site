# averongroup-site — agent instructions

Company site for Averon Group (the ECOMMERCE partners). React + Vite single page in `src/` (`App.jsx`, `styles.css`), deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```bash
npm ci && npm run build    # output in dist/; `npm run dev` for a local preview
```

## Rules

- Public repo: commits use the GitHub no-reply email (set in this repo's git config). Never commit personal emails, phone numbers or addresses.
- No partner names or photos on the site (owner, 2026-11-15).
- Copy must stay true: no invented clients, figures, years in business or certifications. Keep text short.
- Imagery must not imply assets we don't have (no stock warehouses, factories or products). The photo is a free Unsplash Alberta landscape (mountain reflected in a lake at blue hour, `photo-1677432658720-3d84f9d657b4`), the owner's pick. White text on it must stay readable: keep the shade behind the hero headline.
- Look: Mercury-style (mercury.com): dark, cinematic photo that carries through every section, "What we do" as open ruled columns with large numerals, the form in a glass panel, little text, the owner's picks on 2026-11-15. On phones the photo is pinned to the screen and the page scrolls over it, because stretching it over the tall page blurs it.
- Logo: lowercase wordmark "averon." with an amber dot, the owner's pick. Keep it clear of the Dallas HVAC Averon Group (theaverongroup.com): no "A" monogram, no triangles or chevrons, no orange-on-navy, no caps with "GROUP" stacked below. Layout or style direction changes go to the owner first; no agent screenshots.
- Contact is a form only (owner, 2026-11-15): no email addresses on the site. It posts to Web3Forms, which delivers to the team@ inbox; the access key is `FORM_KEY` in `src/App.jsx`.
- Domain `averongroup.ca` is at GoDaddy (Alex's account, delegate access). DNS stays at GoDaddy: Microsoft 365 email records live there. Apex A records point at the four GitHub Pages IPs (185.199.108–111.153) and `www` is a CNAME to `nicholasunruh.github.io`. The custom domain is set in the repo's Pages settings, not in a `CNAME` file, because the site deploys through Actions.
