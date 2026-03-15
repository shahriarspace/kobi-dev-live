# Kobi Landing Page

Astro static site deployed to GitHub Pages at `kobidev.com`.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
```

## Build

```bash
npm run build    # Output: dist/
```

## Deployment

Automatically deployed via GitHub Actions on push to `main` (when files in `landing/` change).

Manual deploy: push to `main` or use GitHub Pages deploy action.

## Tech

- Astro 4 (static output)
- Tailwind CSS
- React island for code animation
- SEO: Open Graph, JSON-LD, sitemap
