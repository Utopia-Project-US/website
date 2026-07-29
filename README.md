# Utopia Project US — Website

Public-facing pre-launch landing page for utopiaproject.us. Static HTML, no build step, no framework.

## Structure

```
website/
├── index.html          # the entire site — single page
├── images/              # all visual assets, referenced by relative path
└── README.md            # this file
```

## Deploying (Vercel)

1. Push this repo to GitHub under the `Utopia-Project-US` org.
2. In Vercel: New Project → Import → select this repo.
3. Framework preset: **Other**. No build command needed — it's static HTML.
4. Deploy. Attach the `utopiaproject.us` domain and Deployment Protection (password) under project Settings once live.

## Editing

- All copy, links, and structure live directly in `index.html` — no templating.
- Design tokens (colors, spacing) are CSS custom properties at the top of the `<style>` block in `index.html` — change once, applies everywhere.
- Images are pre-resized/compressed for web (see git history if you need the untouched originals — keep those in the backed-up old-site directory, not here).

## When the real site is ready

This page is intentionally minimal and meant to be fully replaced. When the actual site (framework, CMS, whatever it becomes) is ready to launch, this repo's `index.html` gets swapped out wholesale — nothing here is meant to be built on top of incrementally.
