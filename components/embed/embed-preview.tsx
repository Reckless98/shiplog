import { RadioTower, Rss } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categoryMeta } from "@/lib/changelog";
import { type ChangelogEntry } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type EmbedPreviewProps = {
  entries: ChangelogEntry[];
};

export function EmbedPreview({ entries }: EmbedPreviewProps) {
  return (
    <Card className="overflow-hidden border-violet-500/15 bg-gradient-to-b from-background via-background to-violet-500/5">
      <CardHeader className="border-b border-border/60 bg-background/70">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Badge className="mb-3 w-fit" variant="muted">
              Embedded widget preview
            </Badge>
            <CardTitle className="text-2xl">Latest updates</CardTitle>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Rss className="size-4" />
            RSS ready
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {entries.slice(0, 3).map((entry) => (
          <div
            className="rounded-2xl border border-border/60 bg-background/90 p-4 shadow-sm"
            key={entry.slug}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{formatDate(entry.publishedAt)}</p>
                <h3 className="mt-1 font-semibold tracking-tight">{entry.title}</h3>
              </div>
              <Badge>{entry.version}</Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{entry.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {entry.categories.map((category) => (
                <Badge className={categoryMeta[category].className} key={category}>
                  {categoryMeta[category].label}
                </Badge>
              ))}
            </div>
          </div>
        ))}
        <div className="rounded-2xl border border-dashed border-violet-500/20 bg-violet-500/5 p-4 text-sm text-muted-foreground">
          <div className="mb-2 flex items-center gap-2 font-medium text-foreground">
            <RadioTower className="size-4 text-violet-500" />
            Works in docs, release emails, and product sidebars
          </div>
          The widget is sized to drop into marketing pages without looking like a support portal.
        </div>
      </CardContent>
    </Card>
  );
}
