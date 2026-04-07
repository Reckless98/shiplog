import Link from "next/link";
import { Code2, ExternalLink, Rss, ScrollText } from "lucide-react";

import { EmbedPreview } from "@/components/embed/embed-preview";
import { SectionShell } from "@/components/section-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublishedEntries } from "@/lib/changelog";
import { buildMetadata } from "@/lib/metadata";
import { docSections } from "@/lib/site-content";

export const metadata = buildMetadata(
  "Docs",
  "ShipLog integration docs covering widget embeds, markdown release entries, and the RSS endpoint.",
  "/docs"
);

export default function DocsPage() {
  const entries = getPublishedEntries();

  return (
    <SectionShell className="py-16 md:py-20">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
          Docs
        </p>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold tracking-tight sm:text-5xl">
          Embed the changelog or wire it into the rest of your launch stack
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          The demo focuses on the public feed and editor, but the integration surface is already mapped.
        </p>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
        <div className="space-y-6">
          {docSections.map((section, index) => (
            <Card key={section.title}>
              <CardHeader>
                <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-300">
                  {index === 0 ? (
                    <Code2 className="size-5" />
                  ) : index === 1 ? (
                    <Rss className="size-5" />
                  ) : (
                    <ScrollText className="size-5" />
                  )}
                </div>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                <p>{section.body}</p>
                {index === 0 ? (
                  <pre className="overflow-x-auto rounded-3xl border border-border/60 bg-slate-950 p-5 text-xs text-slate-100">
{`<script
  src="https://shiplog.app/widget.js"
  data-workspace="acme"
  data-theme="system"
></script>`}
                  </pre>
                ) : index === 1 ? (
                  <pre className="overflow-x-auto rounded-3xl border border-border/60 bg-slate-950 p-5 text-xs text-slate-100">
{`GET https://shiplog.app/rss.xml`}
                  </pre>
                ) : (
                  <pre className="overflow-x-auto rounded-3xl border border-border/60 bg-slate-950 p-5 text-xs text-slate-100">
{`## Launch checklist

- Docs published
- Support briefed
- Release tagged as 2.6.0`}
                  </pre>
                )}
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent className="flex items-center justify-between gap-4 p-6">
              <div>
                <p className="font-medium tracking-tight">Need the live feed?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse the public changelog or open the RSS endpoint directly.
                </p>
              </div>
              <Link
                className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:underline dark:text-violet-300"
                href="/changelog"
              >
                Open changelog
                <ExternalLink className="size-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
        <EmbedPreview entries={entries} />
      </div>
    </SectionShell>
  );
}
