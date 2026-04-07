"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { ChevronDown, Clock3, Rss, Search } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  buildTimelineGroups,
  categoryMeta,
  categoryOptions,
  filterEntries
} from "@/lib/changelog";
import { type ChangelogEntry } from "@/lib/types";
import { formatDate, readingTimeLabel } from "@/lib/utils";

type ChangelogFeedProps = {
  entries: ChangelogEntry[];
};

function EntryCard({ entry }: { entry: ChangelogEntry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="h-full border-border/70 shadow-[0_24px_80px_-60px_rgba(91,33,182,0.5)] transition hover:-translate-y-1 hover:shadow-[0_28px_90px_-52px_rgba(91,33,182,0.45)]">
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge>{entry.version}</Badge>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{formatDate(entry.publishedAt)}</span>
              <span className="flex items-center gap-1">
                <Clock3 className="size-4" />
                {readingTimeLabel(entry.readTime)}
              </span>
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl">{entry.title}</CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {entry.categories.map((category) => (
              <Badge className={categoryMeta[category].className} key={category}>
                {categoryMeta[category].label}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {(expanded ? entry.highlights : entry.highlights.slice(0, 2)).map((highlight) => (
              <li className="flex gap-3" key={highlight}>
                <span className="mt-1 size-2 rounded-full bg-violet-500" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button onClick={() => setExpanded((value) => !value)} variant="ghost">
              {expanded ? "Hide details" : "Expand details"}
              <ChevronDown className={expanded ? "size-4 rotate-180" : "size-4"} />
            </Button>
            <Button asChild variant="outline">
              <Link href={`/changelog/${entry.slug}`}>Read full release</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}

function TimelineList({ entries }: { entries: ChangelogEntry[] }) {
  const groups = buildTimelineGroups(entries);

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <section className="grid gap-5 md:grid-cols-[180px_1fr]" key={group.label}>
          <div className="pt-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">
            {group.label}
          </div>
          <div className="relative space-y-4 before:absolute before:left-[7px] before:top-1 before:h-[calc(100%-1rem)] before:w-px before:bg-border/80">
            {group.entries.map((entry) => (
              <div className="relative pl-8" key={entry.slug}>
                <span className="absolute left-0 top-2 size-4 rounded-full border-4 border-background bg-violet-500" />
                <Card className="border-border/70 bg-background/90">
                  <CardContent className="space-y-3 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">{formatDate(entry.publishedAt)}</p>
                        <Link
                          className="mt-1 block text-lg font-semibold tracking-tight transition hover:text-violet-600 dark:hover:text-violet-300"
                          href={`/changelog/${entry.slug}`}
                        >
                          {entry.title}
                        </Link>
                      </div>
                      <Badge>{entry.version}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.summary}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function ChangelogFeed({ entries }: ChangelogFeedProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categoryOptions)[number]>("all");
  const [view, setView] = useState<"cards" | "timeline">("cards");
  const deferredQuery = useDeferredValue(query);
  const filteredEntries = filterEntries(entries, deferredQuery, category);

  return (
    <div className="space-y-8">
      <Card className="border-border/70">
        <CardContent className="flex flex-col gap-4 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-xl flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by release, category, or keyword"
                value={query}
              />
            </div>
            <Button asChild variant="outline">
              <Link href="/rss.xml">
                <Rss className="size-4" />
                RSS feed
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((option) => (
              <button
                className={
                  option === category
                    ? "rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white"
                    : "rounded-full border border-border/70 bg-background px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted/80 hover:text-foreground"
                }
                key={option}
                onClick={() => setCategory(option)}
                type="button"
              >
                {option === "all" ? "All updates" : categoryMeta[option].label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs onValueChange={(value) => setView(value as "cards" | "timeline")} value={view}>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {filteredEntries.length} {filteredEntries.length === 1 ? "release" : "releases"}
          </p>
          <TabsList>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="cards">
          <div className="grid gap-5 lg:grid-cols-2">
            {filteredEntries.map((entry) => (
              <EntryCard entry={entry} key={entry.slug} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="timeline">
          <TimelineList entries={filteredEntries} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
