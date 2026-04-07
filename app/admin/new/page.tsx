import { EditorShell } from "@/components/admin/editor-shell";
import { SectionShell } from "@/components/section-shell";
import { buildMetadata } from "@/lib/metadata";
import { type EditableEntry } from "@/lib/types";

export const metadata = buildMetadata(
  "New entry",
  "Create a new ShipLog changelog entry with version tags, categories, markdown, and publish date.",
  "/admin/new"
);

const emptyEntry: EditableEntry = {
  slug: "",
  title: "",
  summary: "",
  body: "",
  version: "",
  publishedAt: "",
  status: "draft",
  categories: ["feature"]
};

export default function NewEntryPage() {
  return (
    <SectionShell className="py-16 md:py-20">
      <div className="mb-10 max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
          New release
        </p>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold tracking-tight sm:text-5xl">
          Create a changelog entry
        </h1>
      </div>
      <EditorShell initialEntry={emptyEntry} mode="new" />
    </SectionShell>
  );
}
