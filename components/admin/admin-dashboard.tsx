"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FilePenLine, Plus, RadioTower, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { categoryMeta, getChangelogStats, statusMeta } from "@/lib/changelog";
import { loadLocalEntries } from "@/lib/storage";
import { type ChangelogEntry, type EditableEntry, type EntryStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type AdminDashboardProps = {
  entries: ChangelogEntry[];
};

function mergeEntries(entries: ChangelogEntry[], localEntries: EditableEntry[]) {
  const mappedLocal = localEntries.map<ChangelogEntry>((entry) => ({
    ...entry,
    highlights:
      entry.summary
        .split(".")
        .map((part) => part.trim())
        .filter(Boolean)
        .slice(0, 3) || [entry.summary],
    integrations: ["Local draft"],
    readTime: 3,
    author: {
      name: "Local editor",
      role: "Browser storage"
    }
  }));

  const nextEntries = [
    ...mappedLocal,
    ...entries.filter((entry) => !mappedLocal.some((local) => local.slug === entry.slug))
  ];

  return nextEntries.sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
  );
}

export function AdminDashboard({ entries }: AdminDashboardProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | EntryStatus>("all");
  const [mergedEntries, setMergedEntries] = useState(entries);

  useEffect(() => {
    setMergedEntries(mergeEntries(entries, loadLocalEntries()));
  }, [entries]);

  const filteredEntries = mergedEntries.filter((entry) => {
    const matchesStatus = status === "all" ? true : entry.status === status;
    const haystack = `${entry.title} ${entry.summary} ${entry.version}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  const stats = getChangelogStats(mergedEntries);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total entries", value: stats.total.toString() },
          { label: "Published", value: stats.published.toString() },
          { label: "Scheduled", value: stats.scheduled.toString() },
          { label: "Current version", value: stats.latestVersion }
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Badge className="mb-3 w-fit" variant="muted">
                Demo admin
              </Badge>
              <CardTitle className="text-2xl">Release workspace</CardTitle>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link href="/rss.xml">
                  <RadioTower className="size-4" />
                  Preview RSS
                </Link>
              </Button>
              <Button asChild>
                <Link href="/admin/new">
                  <Plus className="size-4" />
                  New entry
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative max-w-lg flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search entries"
                value={query}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "published", "scheduled", "draft"] as const).map((option) => (
                <button
                  className={
                    option === status
                      ? "rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white"
                      : "rounded-full border border-border/70 bg-background px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted/80 hover:text-foreground"
                  }
                  key={option}
                  onClick={() => setStatus(option)}
                  type="button"
                >
                  {option === "all" ? "All states" : statusMeta[option].label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="min-w-full text-left text-sm">
            <thead className="border-y border-border/60 bg-muted/30 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Entry</th>
                <th className="px-6 py-4 font-medium">Version</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Categories</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr className="border-b border-border/50" key={entry.slug}>
                  <td className="px-6 py-5 align-top">
                    <p className="font-medium tracking-tight">{entry.title}</p>
                    <p className="mt-1 max-w-sm text-muted-foreground">{entry.summary}</p>
                  </td>
                  <td className="px-6 py-5 align-top">{entry.version}</td>
                  <td className="px-6 py-5 align-top">
                    <Badge className={statusMeta[entry.status].className}>
                      {statusMeta[entry.status].label}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="flex max-w-xs flex-wrap gap-2">
                      {entry.categories.map((category) => (
                        <Badge className={categoryMeta[category].className} key={category}>
                          {categoryMeta[category].label}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top text-muted-foreground">
                    {formatDate(entry.publishedAt)}
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/edit/${entry.slug}`}>
                          <FilePenLine className="size-3.5" />
                          Edit
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/changelog/${entry.slug}`}>View</Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
