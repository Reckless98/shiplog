import Link from "next/link";
import { ArrowRight, Braces, CalendarDays, PencilLine, Radar, Rss } from "lucide-react";

import { EmbedPreview } from "@/components/embed/embed-preview";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublishedEntries } from "@/lib/changelog";
import { buildMetadata } from "@/lib/metadata";
import {
  featureCards,
  heroMetrics,
  integrations,
  siteConfig
} from "@/lib/site-content";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata(
  "ShipLog",
  "A changelog and release notes app for dev teams. Publish updates, organize releases, and embed the feed anywhere.",
  "/"
);

export default function HomePage() {
  const entries = getPublishedEntries();
  const featuredEntries = entries.filter((entry) => entry.featured).slice(0, 3);

  return (
    <div className="pb-12">
      <SectionShell className="pt-16 md:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="space-y-8">
            <Badge className="w-fit">LaunchNotes-style workflow, tighter footprint</Badge>
            <div className="space-y-6">
              <h1 className="max-w-3xl font-[var(--font-heading)] text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
                Release notes your team can publish without turning launch day into a ritual.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                {siteConfig.name} combines a public changelog, an admin editor, and an embeddable widget so dev teams can keep users current without managing three separate tools.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/changelog">
                  Explore the changelog
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/admin">Open the admin demo</Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {heroMetrics.map((metric, index) => (
                <Reveal delay={index * 0.05} key={metric.label}>
                  <Card className="border-violet-500/10 bg-background/75">
                    <CardContent className="p-5">
                      <p className="text-2xl font-semibold tracking-tight">{metric.value}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <EmbedPreview entries={entries} />
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell
        className="mt-24"
        description="The app is structured like a real release workflow: compose the update, review the public card, then publish to a searchable feed."
        eyebrow="Core workflow"
        title="Built for teams that ship often"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {featureCards.map((feature, index) => (
            <Reveal delay={index * 0.08} key={feature.title}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-6">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        className="mt-24"
        description="Signal the tools a release touches without turning the page into a logo strip."
        eyebrow="Integrations"
        title="Ready for the systems around your launches"
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          {integrations.map((integration, index) => (
            <Reveal delay={index * 0.04} key={integration}>
              <Card className="border-border/70 bg-background/80">
                <CardContent className="flex items-center justify-between gap-4 p-5">
                  <span className="font-medium">{integration}</span>
                  <Radar className="size-4 text-violet-500" />
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        className="mt-24"
        description="A few product areas that matter most in daily use."
        eyebrow="Product surface"
        title="From draft editor to public feed"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              icon: PencilLine,
              title: "Markdown editor",
              text: "Write the release in markdown, assign version metadata, and tag the update before it goes live."
            },
            {
              icon: CalendarDays,
              title: "Scheduled publish",
              text: "Queue launches ahead of time and keep draft, scheduled, and published states visible in admin."
            },
            {
              icon: Braces,
              title: "Embeds and RSS",
              text: "Give docs, launch pages, and feed readers the same release stream without copy-paste drift."
            }
          ].map((item, index) => (
            <Reveal delay={index * 0.05} key={item.title}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-300">
                    <item.icon className="size-5" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="text-sm leading-6">{item.text}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        className="mt-24"
        description="The public feed is the product. These releases show the depth and structure we expect users to work with."
        eyebrow="Featured releases"
        title="Recent highlights from the changelog"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredEntries.map((entry, index) => (
            <Reveal delay={index * 0.08} key={entry.slug}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <Badge>{entry.version}</Badge>
                    <span className="text-sm text-muted-foreground">{formatDate(entry.publishedAt)}</span>
                  </div>
                  <CardTitle>{entry.title}</CardTitle>
                  <CardDescription className="text-sm leading-6">{entry.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/changelog/${entry.slug}`}>Read release</Link>
                  </Button>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Rss className="size-4" />
                    Feed-ready
                  </span>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="mt-24">
        <Reveal>
          <Card className="overflow-hidden border-violet-500/15 bg-gradient-to-r from-violet-600 via-indigo-600 to-slate-950 text-white dark:from-violet-500 dark:via-indigo-500">
            <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
                  Start with the public feed
                </p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight md:text-4xl">
                  The app already has the landing page, changelog feed, pricing, docs, and admin routes wired up.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/pricing">See pricing</Link>
                </Button>
                <Button asChild className="border-white/20 text-white hover:bg-white/10" size="lg" variant="outline">
                  <Link href="/docs">Read docs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </SectionShell>
    </div>
  );
}
