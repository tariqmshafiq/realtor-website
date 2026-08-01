# Realtor Showcase — Northern Virginia & the DMV

A realtor showcase page for the DMV, written for the visitors who come to check out a realtor's track record. One deploy, one URL pattern, hundreds of personalized pages — each link is customized for a specific realtor by URL parameters (mail-merge style).

Visitors see the realtor's name, company, contact details, reviews, featured work, and territory — all filled in for that agent. The page `<title>` is personalized too, so link previews carry the realtor's name.

## URL parameters

| Param   | Meaning                       | Default                                   |
| ------- | ----------------------------- | ----------------------------------------- |
| `name`  | Realtor's full name           | `Sarah Mitchell`                          |
| `co`    | Company / brokerage           | `Mitchell Realty Group`                   |
| `email` | Realtor's email               | `sarah@mitchellrealtygroup.com`           |
| `phone` | Realtor's phone               | `(703) 555-0142`                          |
| `line`  | Custom tagline                | `A realtor's work is measured in closings, not claims. Here's the proof.` |
| `to`    | Visitor's first name (optional greeting) | *(hidden if omitted)*              |

Example (live at [dmvwebdev.vercel.app](https://dmvwebdev.vercel.app/)):

```
https://dmvwebdev.vercel.app/?name=James+Carter&co=Evergreen+Realty&email=james@evergreenrealty.com&phone=(571)+333-0101&line=Twelve+years%2C+400%2B+closings%2C+one+standard.
```

Everything is personalized per request — the page `<title>`, the hero, the "about" section, the review headlines, the contact block, and the `tel:` / `mailto:` links. All parameters are optional; the page renders sensible defaults without them. Add `to=VisitorName` for a light "Hi {name}, welcome." greeting.

## Outreach workflow (send to many realtors)

1. Deploy once (already live at `https://dmvwebdev.vercel.app/`).
2. In a spreadsheet, add columns: `name`, `co`, `email`, `phone`, `line`, and optionally `to`.
3. Build a link per realtor: `https://dmvwebdev.vercel.app/?name={name}&co={co}&email={email}&phone={phone}` (URL-encode spaces as `+` or `%20`).
4. Send each realtor their own link. One deploy, hundreds of personalized pages, zero extra hosting.

## Design

Restrained, editorial aesthetic: monochrome ink palette, generous whitespace, serif display type, hairline rules, and a single gold accent. Stock photography is served from Unsplash via `next/image` (see `next.config.ts`).

## Dev

```bash
npm run dev       # http://localhost:3000
npm run lint      # eslint
npm run build     # production build (route is dynamic — renders per request)
```
