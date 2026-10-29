# Saffron & Stone

A responsive South Indian restaurant campaign site built with React, Vite, GSAP ScrollTrigger, Framer Motion, and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local URL in the terminal. Create a production build with `npm run build`, or preview it with `npm run preview`.

## Scroll experiences

- The signature sequence pins a desktop viewport and scrubs through four overlapping food photographs. Image position, scale, rotation, opacity, scene background, and copy all follow the scroll position, so the sequence reverses naturally when scrolling upward.
- On mobile, the signature dishes become stacked photographic panels for a straightforward touch experience.
- The specialties gallery maps vertical scrolling to a pinned horizontal track on desktop; mobile uses native horizontal touch scrolling.
- Both GSAP contexts clean up their ScrollTriggers when unmounted. The signature animation is skipped when reduced motion is requested.

## Content to customize

Restaurant address, hours, phone, email, prices, and menu copy are illustrative placeholders. Replace them with verified business details before publishing. Food and ambience photographs are referenced by Unsplash image URLs in `src/main.jsx` and `src/styles.css`; swap those IDs for licensed restaurant photography when available.

The main implementation is in `src/main.jsx`, with responsive styles in `src/styles.css`.
