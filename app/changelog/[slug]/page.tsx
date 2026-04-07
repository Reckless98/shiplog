import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { SectionShell } from "@/components/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  categoryMeta,
  getEntryBySlug,
  getPublishedEntries,
  getRelatedEntries
} from "@/lib/changelog";
import { buildMetadata } from "@/lib/metadata";
import { formatDate, readingTimeLabel } from "@/lib/utils";

type ChangelogEntryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params
}: ChangelogEntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);

  if (!entry || entry.status !== "published") {
    return buildMetadata("Release not found", "The requested release was not found.");
  }

  return buildMetadata(entry.title, entry.summary, `/changelog/${entry.slug}`);
}

export function generateStaticParams() {
  return getPublishedEntries().map((entry) => ({
    slug: entry.slug
  }));
}

export default async function ChangelogEntryPage({
  params
}: ChangelogEntryPageProps) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);

  if (!entry || entry.status !== "published") {
    notFound();
  }

  const relatedEntries = getRelatedEntries(entry, 3);

  return (
    <SectionShell className="py-16 md:py-20">
      <div className="max-w-4xl">
        <Button asChild className="mb-6" variant="ghost">
          <Link href="/changelog">
            <ArrowLeft className="size-4" />
            Back to changelog
          </Link>
        </Button>
        <div className="space-y-5">
          <Badge>{entry.version}</Badge>
          <h1 className="font-[var(--font-heading)] text-4xl font-semibold tracking-tight sm:text-5xl">
            {entry.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{entry.summary}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{formatDate(entry.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Clock3 className="size-4" />
              {readingTimeLabel(entry.readTime)}
            </span>
            <span>{entry.author.name}</span>
            <span>{entry.author.role}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {entry.categories.map((category) => (
              <Badge className={categoryMeta[category].className} key={category}>
                {categoryMeta[category].label}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_300px]">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.body}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Release details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Integrations</p>
                <p className="mt-2">{entry.integrations.join(", ")}</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Highlights</p>
                <ul className="mt-2 space-y-2">
                  {entry.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related releases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {relatedEntries.map((relatedEntry) => (
                <Link
                  className="block rounded-2xl border border-border/60 p-4 transition hover:border-violet-500/30 hover:bg-muted/20"
                  href={`/changelog/${relatedEntry.slug}`}
                  key={relatedEntry.slug}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium tracking-tight">{relatedEntry.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(relatedEntry.publishedAt)}
                      </p>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionShell>
  );
}
