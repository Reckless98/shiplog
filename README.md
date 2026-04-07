# ShipLog

ShipLog is a portfolio web app for changelogs and release notes.
It includes a public changelog feed, per-release detail pages, pricing and docs pages, and a demo admin workspace for writing updates.

Tech stack: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui components, Framer Motion, next-themes, Lucide icons, Vitest.

## What it does

- `/` presents the product, feature areas, integrations, and an embedded changelog preview.
- `/changelog` shows a searchable public feed with category filters, card view, timeline view, and an RSS entry point.
- `/changelog/[slug]` renders full release notes with metadata, markdown content, and related releases.
- `/admin` lists entries with draft, published, and scheduled states plus basic release stats.
- `/admin/new` and `/admin/edit/[slug]` provide a markdown editor, version tagging, category selection, and publish-date controls.
- `/pricing` covers starter, growth, and enterprise plans.
- `/docs` documents embeds, markdown release formatting, and RSS.

## Notes

- The dataset ships with 15 realistic release entries across multiple versions.
- Public routes read published mock data.
- The demo editor stores changes in browser local storage so the admin workflow stays interactive without adding a database.
- `/rss.xml` returns a generated RSS feed from published entries.

## Project structure

- `app/` route files, metadata, global styles, and the RSS route.
- `components/` reusable UI primitives, changelog feed, admin dashboard, editor, and embed preview.
- `lib/` mock release data, filtering/stat helpers, metadata helpers, and local draft storage helpers.
- `tests/` Vitest coverage for changelog utilities.
- `.github/workflows/ci.yml` runs lint and build on push and pull request.

## Development

`npm install`
`npm run lint`
`npm test`
`npm run build`

## License

MIT
