# ShipLog
ShipLog keeps release notes, changelog publishing, and editorial workflow in one place.

Teams ship constantly, then lose time turning commits, tickets, and fixes into release notes people can actually read. ShipLog gives you a public changelog, release detail pages, RSS, and a small admin surface so updates can be written once and published cleanly.

## Features
- Public changelog feed with search and category filters
- Card and timeline views for browsing releases
- Per-release pages rendered from markdown content
- Related release links and metadata for version context
- Admin list with draft, published, and scheduled states
- Editor routes for new entries and existing release updates
- RSS feed at `/rss.xml`
- Local draft persistence so the editor stays useful without a backend
- Seeded release data across multiple versions

Tech stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Radix UI primitives, React Markdown, Fuse.js, Framer Motion, next-themes, Vitest.

## Routes
- `/` landing page
- `/changelog`, `/changelog/[slug]` public feed and release detail
- `/admin`, `/admin/new` release management and new entry flow
- `/admin/edit/[slug]` existing entry editor
- `/docs`, `/pricing`, `/rss.xml` documentation, plans, and feed output

## Development
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Testing
`npm test`

Build with `npm run build`.
