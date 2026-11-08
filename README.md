# Fjallaskíðun — website redesign demo

A non-binding design proposal for Fjallaskíðun, focused on helping visitors find, compare and choose a tour.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS 4, Lucide icons. There is no router library: `src/lib/router.tsx` handles the two routes.

```bash
npm ci
npm run dev       # local development
npm run build     # type-check + production build to dist/
npm run preview   # serve dist/ locally
```

## Structure

- `src/data/tours.ts`: all tour content as structured data (ready to move to a CMS later).
- `src/data/site.ts`: company facts, team, contact details and links.
- `src/components/`: header, hero, tour finder, cards, comparison, sections and footer.
- `src/pages/TourPage.tsx`: the reusable tour detail page at `/ferdir/:slug`.

## Content rules

- All facts come from fjallaskidun.is as of 8 November 2026. Values the site does not state are `null` and show as "Upplýsingar ekki tiltækar".
- No dates are shown: every dated tour on the current site falls in spring 2026, which has passed.
- Booking buttons link to the real product pages, or to an email inquiry where the current site asks for one. There is no checkout in this demo.
- Photos are mood images from Unsplash, all under the free Unsplash License (checked 8 Nov 2026). They're listed with credits in `src/data/photos.ts` and in the footer. Most aren't from Iceland or from Fjallaskíðun's tours, so the UI labels them "Stemningsmynd". Replace them with Fjallaskíðun's own licensed photos before launch. Photos from the current site have no stated licence and are not used.
- Images are hotlinked from `images.unsplash.com` with responsive `srcset`. To change a crop, set `position` on the photo.

## Deployment (Netlify)

`netlify.toml` sets the build (`npm run build` → `dist`), an SPA fallback for `/ferdir/*`, and `X-Robots-Tag: noindex, nofollow`. `index.html` also carries a robots `noindex` meta tag, and `robots.txt` disallows all crawlers.
