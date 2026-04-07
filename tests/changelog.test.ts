import { describe, expect, it } from "vitest";

import {
  buildTimelineGroups,
  filterEntries,
  generateSlug,
  getAllEntries,
  getChangelogStats,
  getPublishedEntries
} from "@/lib/changelog";

describe("changelog helpers", () => {
  it("returns only published entries in descending date order", () => {
    const entries = getPublishedEntries();

    expect(entries.every((entry) => entry.status === "published")).toBe(true);
    expect(entries[0]?.version).toBe("2.6.0");
    expect(entries.at(-1)?.version).toBe("1.9.0");
  });

  it("filters entries by category and query", () => {
    const entries = getPublishedEntries();
    const results = filterEntries(entries, "future-dated entries", "feature");

    expect(results).toHaveLength(1);
    expect(results[0]?.slug).toBe("release-2-1-0-scheduled-publishing");
  });

  it("builds timeline groups from newest to oldest month", () => {
    const entries = getPublishedEntries();
    const groups = buildTimelineGroups(entries);

    expect(groups[0]?.label).toBe("April 2026");
    expect(groups[0]?.entries[0]?.slug).toBe("release-2-6-0-event-api-and-widget-polish");
  });

  it("calculates total status counts across all entries", () => {
    const stats = getChangelogStats(getAllEntries());

    expect(stats.total).toBe(15);
    expect(stats.published).toBe(12);
    expect(stats.scheduled).toBe(2);
    expect(stats.draft).toBe(1);
    expect(stats.categories.breaking).toBe(2);
  });

  it("creates clean slugs from free text", () => {
    expect(generateSlug("  Shared approval workflows! ")).toBe(
      "shared-approval-workflows"
    );
  });
});
