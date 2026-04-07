import { Layers3, RadioTower, Search, Tags } from "lucide-react";

import { ChangelogFeed } from "@/components/changelog/changelog-feed";
import { SectionShell } from "@/components/section-shell";
import { Card, CardContent } from "@/components/ui/card";
import { getChangelogStats, getPublishedEntries } from "@/lib/changelog";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(
  "Changelog",
  "Browse the ShipLog public changelog, filter updates by category, search releases, and switch to timeline view.",
  "/changelog"
);

export default function ChangelogPage() {
  const entries = getPublishedEntries();
  const stats = getChangelogStats(entries);

  return (
    <SectionShell className="py-16 md:py-20">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
          Public changelog
        </p>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold tracking-tight sm:text-5xl">
          Every shipped change in one release feed
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Search by keyword, filter by release type, switch to the timeline view, or subscribe with RSS.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {[
          { label: "Published entries", value: stats.total.toString(), icon: Layers3 },
          { label: "Current version", value: stats.latestVersion, icon: Tags },
          { label: "Searchable archive", value: "Enabled", icon: Search },
          { label: "RSS feed", value: "Live", icon: RadioTower }
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{item.value}</p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-300">
                <item.icon className="size-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <ChangelogFeed entries={entries} />
      </div>
    </SectionShell>
  );
}
