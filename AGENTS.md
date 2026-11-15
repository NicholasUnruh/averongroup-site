# averongroup-site — agent instructions

Company site for Averon Group (the ECOMMERCE partners). React + Vite single page in `src/` (`App.jsx`, `styles.css`), deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```bash
npm ci && npm run build    # output in dist/; `npm run dev` for a local preview
```

## Rules

- Public repo: commits use the GitHub no-reply email (set in this repo's git config). Never commit personal emails, phone numbers or addresses.
- No partner names or photos on the site (owner, 2026-11-15).
- Copy must stay true: no invented clients, figures, years in business or certifications. Keep text short.
- Imagery must not imply assets we don't have (no stock warehouses, factories or products). Hero is a free Unsplash Alberta landscape (sunrise over fog), the owner's pick.
- Look: Mercury-style (mercury.com): dark, cinematic hero photo, little text, the owner's pick on 2026-11-15. Layout or style direction changes go to the owner first; no agent screenshots.
- Contact is a form only (owner, 2026-11-15): no email addresses on the site. It posts to Web3Forms, which delivers to the team@ inbox; the access key is `FORM_KEY` in `src/App.jsx`.
- Domain `averongroup.ca` is at GoDaddy (Alex's account, delegate access). DNS stays at GoDaddy: Microsoft 365 email records live there. Apex A records point at the four GitHub Pages IPs (185.199.108–111.153) and `www` is a CNAME to `nicholasunruh.github.io`. The custom domain is set in the repo's Pages settings, not in a `CNAME` file, because the site deploys through Actions.
