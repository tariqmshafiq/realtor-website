# Realtor Showcase — Northern Virginia & the DMV

A personal realtor showcase page, sent to realtors themselves. One deploy, one URL pattern, hundreds of "personalized" pages — each link is customized for a specific agent by URL parameters (mail-merge style).

Open the page and the realtor's name, company, contact details, reviews, and page title are all filled in for them.

## URL parameters

| Param   | Meaning                       | Default                               |
| ------- | ----------------------------- | ------------------------------------- |
| `to`    | Realtor's first name (greeting) | `there`                              |
| `name`  | Realtor's full name           | `Sarah Mitchell`                      |
| `co`    | Company / brokerage           | `Mitchell Realty Group`               |
| `email` | Realtor's email               | `sarah@mitchellrealtygroup.com`       |
| `phone` | Realtor's phone               | `(703) 555-0142`                      |
| `line`  | Custom tagline                | `A realtor site, built around you. …` |

Example:

```
https://yoursite.com/?to=James&name=James+Carter&co=Evergreen+Realty&email=james@evergreenrealty.com&phone=(571)+333-0101
```

Everything below is personalized per request — the page `<title>`, the greeting, the "about" section, the review headlines, the contact block, and the `tel:` / `mailto:` links. All parameters are optional; the page renders sensible defaults without them.

## Outreach workflow (send to many realtors)

1. Deploy once (e.g. Vercel).
2. In a spreadsheet, add columns: `to`, `name`, `co`, `email`, `phone`, `line`.
3. Build a link per realtor: `https://yoursite.com/?to={to}&name={name}&co={co}&email={email}&phone={phone}` (URL-encode spaces as `+` or `%20`).
4. Send each realtor their own link. One deploy, hundreds of personalized pages, zero extra hosting.

## Design

Restrained, editorial aesthetic: monochrome ink palette, generous whitespace, serif display type, hairline rules, and a single gold accent. Stock photography is served from Unsplash via `next/image` (see `next.config.ts`).

## Dev

```bash
npm run dev       # http://localhost:3000
npm run lint      # eslint
npm run build     # production build (route is dynamic — renders per request)
```
