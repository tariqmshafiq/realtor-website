# Realtor Showcase — DMV / Northern Virginia

A personalized realtor showcase site for the DMV area. One page, one deploy, hundreds of "personalized" pages — each URL fills in the viewer's name and your contact details from query parameters (mail-merge style).

## URL parameters

| Param   | Meaning            | Default                               |
| ------- | ------------------ | ------------------------------------- |
| `to`    | Visitor's name     | `there`                               |
| `co`    | Company name       | `Mitchell Realty Group`               |
| `name`  | Your name          | `Sarah Mitchell`                      |
| `email` | Your email         | `sarah@mitchellrealtygroup.com`       |
| `phone` | Your phone         | `(703) 555-0142`                      |
| `line`  | Custom tagline     | `Your trusted guide to buying and selling in Northern Virginia.` |

Example:

```
https://yoursite.com/?to=Sarah&co=Acme+Realty&name=Jane+Doe&email=jane@acme.com&phone=(555)+214-9999&line=Let%27s+find+your+dream+home+in+the+DMV.
```

Everything (page `<title>`, hero greeting, bio, reviews, CTA buttons, `mailto:`/`tel:` links) is personalized per request. Params are optional — the page renders sensible defaults without them.

## Mail-merge workflow

1. Deploy once (e.g. Vercel).
2. In a spreadsheet, add columns: `to`, `co`, `name`, `email`, `phone`, `line`.
3. Generate a link per row: `https://yoursite.com/?to={to}&co={co}&name={name}&email={email}&phone={phone}` (URL-encode spaces as `+` or `%20`).
4. Send each person their own link.

## Dev

```bash
npm run dev       # http://localhost:3000
npm run lint      # eslint
npm run build     # production build (static page generates per request — route is dynamic)
```

Images are served from Unsplash via `next/image` (see `next.config.ts`).
