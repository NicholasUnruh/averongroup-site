# averongroup-site — agent instructions

Company site for Averon Group (the ECOMMERCE partners). React + Vite single page in `src/` (`App.jsx`, `styles.css`), deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```bash
npm ci && npm run build    # output in dist/; `npm run dev` for a local preview
```

## Rules

- Public repo: commits use the GitHub no-reply email (set in this repo's git config). Never commit personal emails, phone numbers or addresses.
- No partner names or photos on the site (owner, 2026-11-15).
- Copy must stay true: no invented clients, figures, years in business or certifications. The hero "Product screen" panel is decorative and shows no numbers.
- Look: "Midnight tech" dark theme, the owner's pick on 2026-11-15. Layout or style direction changes go to the owner first; no agent screenshots.
- Domain `averongroup.ca` is at GoDaddy (Alex's account, delegate access). DNS stays at GoDaddy: Microsoft 365 email records live there.

## Pending

- Point `averongroup.ca` at Pages: apex A records 185.199.108.153, .109, .110, .111 and `www` CNAME to `nicholasunruh.github.io`; then set the custom domain in the repo's Pages settings and enforce HTTPS.
