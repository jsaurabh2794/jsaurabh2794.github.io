# jsaurabh2794.github.io

Single-page portfolio for Saurabh Kumar. Hand-written HTML, CSS and JavaScript —
no framework, no build step, no dependencies.

## Structure

```
index.html              entire page
assets/css/styles.css   design tokens + all styling
assets/js/main.js       nav, scrollspy, reveals, typing, dynamic year
assets/img/favicon.svg
assets/Saurabh_Kumar_Resume.pdf   linked by the download buttons
RESUME.md               updated resume content, source for the PDF
```

## Run locally

Any static server works, since there is nothing to compile:

```powershell
npx serve .
```

Or use the VS Code **Live Server** extension. Opening `index.html` via `file://`
mostly works, but the web manifest will warn.

## Deploy to GitHub Pages

1. Create a repo named exactly `jsaurabh2794.github.io`.
2. Push this folder to the `main` branch.
3. **Settings → Pages → Build and deployment → Deploy from a branch**,
   choose `main` and `/ (root)`.

No Actions workflow is needed. `.nojekyll` stops Jekyll from touching the output.

The site publishes to `https://jsaurabh2794.github.io/`.

## Before publishing

- [ ] Export `RESUME.md` to PDF and save as `assets/Saurabh_Kumar_Resume.pdf`
      (a placeholder copy of the old resume is there now).
- [ ] Optional: add `assets/img/og-image.png` (1200×630) and reference it with
      `og:image` / `twitter:image` in `index.html` for richer link previews.

## Content notes

- Years of experience is computed at runtime from `2017-09-01`, so it never goes stale.
- The email address is assembled in JavaScript rather than sitting in the HTML source.
- No phone number appears anywhere on the site by design.
