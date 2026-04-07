export const changeCategories = [
  "feature",
  "fix",
  "improvement",
  "breaking"
] as const;

export const entryStatuses = ["draft", "published", "scheduled"] as const;

export type ChangeCategory = (typeof changeCategories)[number];
export type EntryStatus = (typeof entryStatuses)[number];

export type ChangelogAuthor = {
  name: string;
  role: string;
};

export type ChangelogEntry = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  version: string;
  publishedAt: string;
  status: EntryStatus;
  categories: ChangeCategory[];
  highlights: string[];
  integrations: string[];
  readTime: number;
  featured?: boolean;
  author: ChangelogAuthor;
};

export type TimelineGroup = {
  label: string;
  entries: ChangelogEntry[];
};

export type ChangelogStats = {
  total: number;
  published: number;
  draft: number;
  scheduled: number;
  latestVersion: string;
  categories: Record<ChangeCategory, number>;
};

export type EditableEntry = Pick<
  ChangelogEntry,
  "slug" | "title" | "summary" | "body" | "version" | "publishedAt" | "status" | "categories"
>;
