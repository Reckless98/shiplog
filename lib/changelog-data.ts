import { type ChangelogEntry } from "@/lib/types";

export const changelogEntries: ChangelogEntry[] = [
  {
    slug: "release-2-8-0-internal-roadmap-sync",
    title: "Internal roadmap sync",
    summary:
      "Draft support for linking roadmap initiatives to planned changelog entries before launch.",
    body: `## Overview

This draft wires roadmap placeholders into the editor so PMs can prepare launch notes before release day.

## In progress

- Link one roadmap initiative to many pending entries.
- Show ownership handoff between PM, engineering, and support.
- Add a ready-for-review checklist before publishing.

## Notes

This release is still in draft while we validate the review workflow with two internal teams.`,
    version: "2.8.0",
    publishedAt: "2026-05-12",
    status: "draft",
    categories: ["feature"],
    highlights: [
      "Roadmap links in the editor sidebar",
      "Owner handoff markers for launch prep",
      "Review checklist before publish"
    ],
    integrations: ["Linear", "Slack"],
    readTime: 4,
    author: {
      name: "Nina Park",
      role: "Product"
    }
  },
  {
    slug: "release-2-7-1-usage-digest-email",
    title: "Usage digest email",
    summary:
      "Scheduled weekly email digest for subscribers who want a release summary instead of per-update notifications.",
    body: `## What's coming

The weekly digest groups product updates by version and sends one summary email to subscribers.

## Planned scope

- Weekly and monthly digest options
- Workspace-level unsubscribe copy
- Highlight the three most important changes from the past period

## Why now

Several teams asked for a lower-noise option than one email per release. This ships next after approval workflows.`,
    version: "2.7.1",
    publishedAt: "2026-04-29",
    status: "scheduled",
    categories: ["feature", "improvement"],
    highlights: [
      "Weekly and monthly digest cadence",
      "Auto-summary of top updates",
      "Subscriber controls per workspace"
    ],
    integrations: ["Email", "RSS"],
    readTime: 3,
    author: {
      name: "Ari Moran",
      role: "Growth"
    }
  },
  {
    slug: "release-2-7-0-shared-approval-workflows",
    title: "Shared approval workflows",
    summary:
      "Scheduled approval flow for release notes that need legal, support, or product review before publishing.",
    body: `## What's coming

Approval workflows add a review lane to the editor so teams can coordinate releases without side-channel checklists.

## Planned scope

- Assign one or more reviewers before publish
- Track review state directly on the entry
- Lock publish for entries that still need sign-off

## Breaking note

Teams using custom publish automation will need to pass the new review state before marking an entry as published.`,
    version: "2.7.0",
    publishedAt: "2026-04-18",
    status: "scheduled",
    categories: ["feature", "breaking"],
    highlights: [
      "Reviewer assignment built into the editor",
      "Explicit review state on every entry",
      "Publish lock for unapproved releases"
    ],
    integrations: ["Slack", "Webhook"],
    readTime: 4,
    author: {
      name: "Nina Park",
      role: "Product"
    }
  },
  {
    slug: "release-2-6-0-event-api-and-widget-polish",
    title: "Event API and widget polish",
    summary:
      "ShipLog can now expose release events to internal tooling while keeping the embedded widget cleaner on small screens.",
    body: `## New

The new event API gives teams a structured stream of published changelog entries for internal dashboards, support bots, and launch automation.

## Improvements

- Embedded widgets now collapse long summaries after two lines on mobile.
- Version badges stay pinned at the top of each card while scrolling.
- Category tags wrap cleanly when an entry includes multiple update types.

## For developers

The event payload includes the entry slug, version, categories, publish date, and summary.`,
    version: "2.6.0",
    publishedAt: "2026-04-02",
    status: "published",
    categories: ["feature", "improvement"],
    highlights: [
      "Structured release event API",
      "Cleaner mobile widget layout",
      "Pinned version badges in the changelog feed"
    ],
    integrations: ["Webhook", "Vercel", "Slack"],
    readTime: 5,
    featured: true,
    author: {
      name: "Maya Chen",
      role: "Engineering"
    }
  },
  {
    slug: "release-2-5-1-permission-fixes-and-rss-hardening",
    title: "Permission fixes and RSS hardening",
    summary:
      "A reliability pass for admin permissions, role visibility, and RSS feed generation.",
    body: `## Fixed

- Editors without scheduling access no longer see schedule controls in the composer.
- Role badges in the admin table now match the real publish state after refresh.
- RSS items now escape markdown punctuation correctly for feed readers.

## Changed

We also tightened cache headers on the feed so subscribers see new entries faster after publish.`,
    version: "2.5.1",
    publishedAt: "2026-03-24",
    status: "published",
    categories: ["fix", "improvement"],
    highlights: [
      "Permission-based schedule controls",
      "Accurate status refresh in admin",
      "Safer RSS output for feed readers"
    ],
    integrations: ["RSS", "Slack"],
    readTime: 4,
    author: {
      name: "Joel Hart",
      role: "Platform"
    }
  },
  {
    slug: "release-2-5-0-audience-targeting-and-segment-tags",
    title: "Audience targeting and segment tags",
    summary:
      "Mark entries for admins, beta customers, or everyone and keep the public feed focused.",
    body: `## New

Audience targeting lets teams write one update and choose where it belongs.

## Included

- Segment tags for beta, enterprise, internal, and all customers
- Internal-only notes that stay visible in the admin editor
- Audience chips on the preview card so reviewers can catch mistakes before publish

## Why it matters

Support teams can now prepare internal context without exposing it to the public changelog.`,
    version: "2.5.0",
    publishedAt: "2026-03-11",
    status: "published",
    categories: ["feature", "improvement"],
    highlights: [
      "Audience segment tags on every entry",
      "Internal-only notes in editor preview",
      "Safer public feed targeting"
    ],
    integrations: ["Intercom", "Notion"],
    readTime: 6,
    author: {
      name: "Ari Moran",
      role: "Growth"
    }
  },
  {
    slug: "release-2-4-1-public-search-speed-pass",
    title: "Public search speed pass",
    summary:
      "Search across changelog entries now feels faster, especially on feeds with heavier markdown bodies.",
    body: `## Fixed

- Reduced search payload size by indexing summaries before full markdown bodies.
- Fixed keyboard focus loss after clearing the search box.
- Timeline view now preserves the current query when switching from cards.

## Result

Teams with long release histories should see faster filtering and fewer layout jumps.`,
    version: "2.4.1",
    publishedAt: "2026-02-27",
    status: "published",
    categories: ["fix", "improvement"],
    highlights: [
      "Faster query handling on long feeds",
      "Stable focus behavior after clearing search",
      "Query persistence across views"
    ],
    integrations: ["Search"],
    readTime: 3,
    author: {
      name: "Maya Chen",
      role: "Engineering"
    }
  },
  {
    slug: "release-2-4-0-launch-checklists-and-owner-notes",
    title: "Launch checklists and owner notes",
    summary:
      "Each release can now carry an internal checklist so the changelog doubles as launch control.",
    body: `## New

Teams can attach internal checklist items to a release while keeping the public note concise.

## Included

- Launch checklist block in the editor sidebar
- Owner notes for support and customer success
- Preview labels that separate internal notes from public copy

## Typical use

Use it for docs links, rollout reminders, and handoffs that should sit next to the release itself.`,
    version: "2.4.0",
    publishedAt: "2026-02-18",
    status: "published",
    categories: ["feature"],
    highlights: [
      "Internal launch checklist per release",
      "Owner notes in the editor",
      "Preview labels for internal-only content"
    ],
    integrations: ["Linear", "Slack"],
    readTime: 5,
    author: {
      name: "Nina Park",
      role: "Product"
    }
  },
  {
    slug: "release-2-3-2-webhook-retry-logs",
    title: "Webhook retry logs",
    summary:
      "Webhook deliveries now expose retry history so teams can debug failed downstream automations.",
    body: `## Fixed

Webhook history now records retry count, last error, and the final delivery state.

## Improvements

- Retry logs are visible directly in the admin dashboard.
- Failed deliveries link back to the originating changelog entry.
- Timeout messages now include the destination host.`,
    version: "2.3.2",
    publishedAt: "2026-02-06",
    status: "published",
    categories: ["fix", "improvement"],
    highlights: [
      "Retry logs in admin",
      "Error details tied to the originating release",
      "Destination host shown for timeouts"
    ],
    integrations: ["Webhook", "Slack"],
    readTime: 4,
    author: {
      name: "Joel Hart",
      role: "Platform"
    }
  },
  {
    slug: "release-2-3-0-embed-themes-and-snippet-builder",
    title: "Embed themes and snippet builder",
    summary:
      "Build an embeddable changelog widget, preview theme options, and copy the install snippet without leaving admin.",
    body: `## New

Embedded changelog widgets now support light, dark, and auto themes with a builder in admin.

## Included

- Snippet generator with iframe and script embed options
- Live preview against the current published feed
- Theme controls for radius, accent, and compact spacing

## Notes

This release makes ShipLog much easier to drop into docs portals and product sidebars.`,
    version: "2.3.0",
    publishedAt: "2026-01-29",
    status: "published",
    categories: ["feature", "improvement"],
    highlights: [
      "Theme-aware embed builder",
      "Iframe and script install snippets",
      "Live preview using published entries"
    ],
    integrations: ["Docs", "Vercel", "Notion"],
    readTime: 6,
    featured: true,
    author: {
      name: "Ari Moran",
      role: "Growth"
    }
  },
  {
    slug: "release-2-2-1-rich-editor-fix-pack",
    title: "Rich editor fix pack",
    summary:
      "Small but important fixes for markdown formatting, paste behavior, and preview consistency.",
    body: `## Fixed

- Ordered lists pasted from docs tools keep the right numbering.
- Double line breaks no longer disappear in preview mode.
- Version input now keeps a leading zero for prerelease tags.

## Why it matters

This update removes a few paper cuts that showed up during heavier launch weeks.`,
    version: "2.2.1",
    publishedAt: "2026-01-18",
    status: "published",
    categories: ["fix"],
    highlights: [
      "Reliable list paste behavior",
      "Consistent markdown preview spacing",
      "Safer version input handling"
    ],
    integrations: ["Editor"],
    readTime: 3,
    author: {
      name: "Maya Chen",
      role: "Engineering"
    }
  },
  {
    slug: "release-2-2-0-status-pages-meet-release-notes",
    title: "Status pages meet release notes",
    summary:
      "Pair status messaging with product updates so launches and incident follow-ups can live in one place.",
    body: `## New

Teams can now link a changelog entry to a service status note for launches, migrations, and post-incident communication.

## Included

- Incident follow-up links on release entries
- Status labels in the public feed for operational updates
- Internal note field for support context

## Recommended use

Pair it with scheduled releases when a rollout depends on infrastructure changes.`,
    version: "2.2.0",
    publishedAt: "2026-01-09",
    status: "published",
    categories: ["feature", "improvement"],
    highlights: [
      "Link operational status notes to releases",
      "Status labels in the public feed",
      "Support context field in admin"
    ],
    integrations: ["Statuspage", "Slack"],
    readTime: 5,
    author: {
      name: "Joel Hart",
      role: "Platform"
    }
  },
  {
    slug: "release-2-1-0-scheduled-publishing",
    title: "Scheduled publishing",
    summary:
      "Queue releases ahead of launch day and let ShipLog publish them at the exact date you choose.",
    body: `## New

Scheduled publishing is now available for changelog entries.

## Included

- Publish date picker in the editor
- Scheduled status badge in admin
- Validation to keep future-dated entries out of the public feed

## Team impact

Product marketing can prep copy earlier, while engineering still controls the actual release window.`,
    version: "2.1.0",
    publishedAt: "2025-12-19",
    status: "published",
    categories: ["feature"],
    highlights: [
      "Publish date picker in admin",
      "Scheduled status badge",
      "Future-dated entries stay hidden until launch"
    ],
    integrations: ["Slack", "Calendar"],
    readTime: 5,
    author: {
      name: "Nina Park",
      role: "Product"
    }
  },
  {
    slug: "release-2-0-0-editor-rewrite",
    title: "Editor rewrite",
    summary:
      "A full editor rebuild with cleaner preview states, stronger version metadata, and a new content model.",
    body: `## Breaking change

ShipLog 2.0 introduces a new entry model with first-class version fields, category tags, and preview metadata.

## What changed

- The editor now stores version and category metadata separately from the markdown body.
- Preview cards reflect the final public layout before publish.
- Admin views use explicit draft, published, and scheduled states.

## Migration note

Older custom scripts that posted raw markdown only will need to include version metadata before creating entries.`,
    version: "2.0.0",
    publishedAt: "2025-12-02",
    status: "published",
    categories: ["breaking", "feature"],
    highlights: [
      "New structured entry model",
      "Live public-card preview in the editor",
      "Explicit lifecycle states in admin"
    ],
    integrations: ["API", "Webhook"],
    readTime: 7,
    featured: true,
    author: {
      name: "Maya Chen",
      role: "Engineering"
    }
  },
  {
    slug: "release-1-9-0-changelog-search-and-rss",
    title: "Changelog search and RSS",
    summary:
      "Search the public feed, subscribe with RSS, and share a cleaner release archive with customers.",
    body: `## New

ShipLog now includes a searchable public changelog and a generated RSS feed.

## Included

- Query search across titles and summaries
- RSS endpoint for feed readers and automations
- Smaller card layout for long release archives

## Why it matters

Customers can find the update they need without reading every release note in sequence.`,
    version: "1.9.0",
    publishedAt: "2025-11-03",
    status: "published",
    categories: ["feature", "improvement"],
    highlights: [
      "Searchable public changelog",
      "Generated RSS feed",
      "Compact archive cards for older releases"
    ],
    integrations: ["RSS", "Slack"],
    readTime: 4,
    author: {
      name: "Ari Moran",
      role: "Growth"
    }
  }
];
