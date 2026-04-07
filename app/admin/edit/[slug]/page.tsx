import { notFound } from "next/navigation";

import { EditorShell } from "@/components/admin/editor-shell";
import { SectionShell } from "@/components/section-shell";
import { getAllEntries, getEntryBySlug } from "@/lib/changelog";
import { buildMetadata } from "@/lib/metadata";
import { type EditableEntry } from "@/lib/types";

type EditEntryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: EditEntryPageProps) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);

  if (!entry) {
    return buildMetadata("Release not found", "The requested admin entry could not be loaded.");
  }

  return buildMetadata(`Edit ${entry.title}`, entry.summary, `/admin/edit/${entry.slug}`);
}

export function generateStaticParams() {
  return getAllEntries().map((entry) => ({
    slug: entry.slug
  }));
}

export default async function EditEntryPage({ params }: EditEntryPageProps) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const editableEntry: EditableEntry = {
    slug: entry.slug,
    title: entry.title,
    summary: entry.summary,
    body: entry.body,
    version: entry.version,
    publishedAt: entry.publishedAt,
    status: entry.status,
    categories: entry.categories
  };

  return (
    <SectionShell className="py-16 md:py-20">
      <div className="mb-10 max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
          Edit release
        </p>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold tracking-tight sm:text-5xl">
          {entry.title}
        </h1>
      </div>
      <EditorShell initialEntry={editableEntry} mode="edit" />
    </SectionShell>
  );
}
