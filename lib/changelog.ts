import Fuse from "fuse.js";

import { changelogEntries } from "@/lib/changelog-data";
import {
  changeCategories,
  type ChangeCategory,
  type ChangelogEntry,
  type ChangelogStats,
  type TimelineGroup
} from "@/lib/types";
import { formatMonthYear } from "@/lib/utils";

export const categoryMeta: Record<
  ChangeCategory,
  { label: string; className: string }
> = {
  feature: {
    label: "Feature",
    className:
      "border border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-200"
  },
  fix: {
    label: "Fix",
    className:
      "border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200"
  },
  improvement: {
    label: "Improvement",
    className:
      "border border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-200"
  },
  breaking: {
    label: "Breaking",
    className:
      "border border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-200"
  }
};

export const statusMeta = {
  draft: {
    label: "Draft",
    className:
      "border border-slate-500/15 bg-slate-500/10 text-slate-700 dark:text-slate-200"
  },
  published: {
    label: "Published",
    className:
      "border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200"
  },
  scheduled: {
    label: "Scheduled",
    className:
      "border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-200"
  }
} as const;

export const categoryOptions = ["all", ...changeCategories] as const;

export function sortEntries(entries: ChangelogEntry[]) {
  return [...entries].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
  );
}

export function getAllEntries() {
  return sortEntries(changelogEntries);
}

export function getPublishedEntries() {
  return sortEntries(
    changelogEntries.filter((entry) => entry.status === "published")
  );
}

export function getEntryBySlug(slug: string) {
  return changelogEntries.find((entry) => entry.slug === slug);
}

export function getChangelogStats(entries: ChangelogEntry[]): ChangelogStats {
  return entries.reduce<ChangelogStats>(
    (stats, entry, index) => {
      stats.total += 1;
      stats[entry.status] += 1;

      for (const category of entry.categories) {
        stats.categories[category] += 1;
      }

      if (index === 0) {
        stats.latestVersion = entry.version;
      }

      return stats;
    },
    {
      total: 0,
      published: 0,
      draft: 0,
      scheduled: 0,
      latestVersion: entries[0]?.version ?? "0.0.0",
      categories: {
        feature: 0,
        fix: 0,
        improvement: 0,
        breaking: 0
      }
    }
  );
}

export function filterEntries(
  entries: ChangelogEntry[],
  query: string,
  category: (typeof categoryOptions)[number]
) {
  const normalized = query.trim();
  const scopedEntries =
    category === "all"
      ? entries
      : entries.filter((entry) => entry.categories.includes(category));

  if (!normalized) {
    return scopedEntries;
  }

  const fuse = new Fuse(scopedEntries, {
    keys: ["title", "summary", "body", "highlights", "version", "categories"],
    threshold: 0.32,
    ignoreLocation: true
  });

  return fuse.search(normalized).map((match) => match.item);
}

export function buildTimelineGroups(entries: ChangelogEntry[]): TimelineGroup[] {
  const groups = new Map<string, ChangelogEntry[]>();

  for (const entry of entries) {
    const label = formatMonthYear(entry.publishedAt);
    const current = groups.get(label) ?? [];
    current.push(entry);
    groups.set(label, current);
  }

  return [...groups.entries()].map(([label, groupedEntries]) => ({
    label,
    entries: groupedEntries
  }));
}

export function getRelatedEntries(entry: ChangelogEntry, limit = 3) {
  return getPublishedEntries()
    .filter((candidate) => candidate.slug !== entry.slug)
    .sort((left, right) => {
      const leftScore = left.categories.filter((value) =>
        entry.categories.includes(value)
      ).length;
      const rightScore = right.categories.filter((value) =>
        entry.categories.includes(value)
      ).length;

      return rightScore - leftScore;
    })
    .slice(0, limit);
}

export function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
