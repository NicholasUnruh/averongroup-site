# averongroup-site — agent instructions

Static company site for Averon Group (the ECOMMERCE partners), served by GitHub Pages from `main`. Plain HTML and CSS, no build step: `index.html`, `favicon.svg`.

## Rules

- Public repo: commits use the GitHub no-reply email (set in this repo's git config). Never commit personal emails, phone numbers or addresses beyond what the site shows.
- Copy must stay true: no invented clients, figures, years in business or certifications.
- Look (clean corporate, navy) was the owner's pick on 2026-11-15; layout or style changes go to the owner first.
- Domain `averongroup.ca` is at GoDaddy (Alex's account, delegate access). DNS stays at GoDaddy: Microsoft 365 email records live there. Add the `CNAME` file only once the GoDaddy records point at GitHub Pages.

## Pending

- Full names, roles and the one-line description from the partners (team section shows first names and "Co-founder").
- Point `averongroup.ca` at Pages: apex A records 185.199.108.153, .109, .110, .111 and `www` CNAME to `nicholasunruh.github.io`; then set the custom domain and enforce HTTPS.
