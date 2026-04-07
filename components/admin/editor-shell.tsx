"use client";

import Link from "next/link";
import { startTransition, useState } from "react";
import { ArrowRight, NotebookTabs, RotateCcw, Save } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categoryMeta, generateSlug, statusMeta } from "@/lib/changelog";
import { saveLocalEntry } from "@/lib/storage";
import {
  changeCategories,
  type ChangeCategory,
  type EditableEntry,
  entryStatuses
} from "@/lib/types";
import { formatDate } from "@/lib/utils";

type EditorShellProps = {
  mode: "new" | "edit";
  initialEntry: EditableEntry;
};

function EditorField({
  label,
  children,
  hint
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">{label}</span>
      {children}
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export function EditorShell({ mode, initialEntry }: EditorShellProps) {
  const [entry, setEntry] = useState(initialEntry);
  const [feedback, setFeedback] = useState<string | null>(null);
  const derivedSlug = entry.slug || generateSlug(entry.title) || "untitled-release";

  function updateField<Key extends keyof EditableEntry>(key: Key, value: EditableEntry[Key]) {
    setEntry((current) => ({
      ...current,
      [key]: value
    }));
  }

  function toggleCategory(category: ChangeCategory) {
    setEntry((current) => ({
      ...current,
      categories: current.categories.includes(category)
        ? current.categories.filter((value) => value !== category)
        : [...current.categories, category]
    }));
  }

  function handleSave() {
    const savedEntry = saveLocalEntry({
      ...entry,
      slug: derivedSlug,
      categories: entry.categories.length ? entry.categories : ["feature"]
    });

    if (!savedEntry) {
      return;
    }

    startTransition(() => {
      setFeedback(`Saved locally as ${savedEntry.slug} at ${new Date().toLocaleTimeString()}.`);
    });
  }

  function resetDraft() {
    setEntry(initialEntry);
    setFeedback("Reset the form back to its starting state.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
      <Card>
        <CardHeader className="gap-3">
          <Badge className="w-fit" variant="muted">
            {mode === "new" ? "Create entry" : "Edit entry"}
          </Badge>
          <CardTitle className="text-2xl">
            {mode === "new" ? "Write a new release update" : "Refine this release entry"}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            This demo stores edits in browser storage so you can test the workflow without a backend.
          </p>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-5 md:grid-cols-2">
            <EditorField label="Title">
              <Input
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="Summarize the release"
                value={entry.title}
              />
            </EditorField>
            <EditorField label="Version" hint="Shown on cards and the release detail page.">
              <Input
                onChange={(event) => updateField("version", event.target.value)}
                placeholder="2.7.0"
                value={entry.version}
              />
            </EditorField>
          </div>

          <EditorField label="Summary" hint="Keep this short. It drives cards, embeds, and tables.">
            <Textarea
              className="min-h-[110px]"
              onChange={(event) => updateField("summary", event.target.value)}
              placeholder="Give readers the sharp version of what changed."
              value={entry.summary}
            />
          </EditorField>

          <div className="grid gap-5 md:grid-cols-2">
            <EditorField label="Status">
              <div className="flex flex-wrap gap-2">
                {entryStatuses.map((status) => (
                  <button
                    className={
                      entry.status === status
                        ? "rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white"
                        : "rounded-full border border-border/70 bg-background px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted/80 hover:text-foreground"
                    }
                    key={status}
                    onClick={() => updateField("status", status)}
                    type="button"
                  >
                    {statusMeta[status].label}
                  </button>
                ))}
              </div>
            </EditorField>
            <EditorField label="Publish date">
              <Input
                onChange={(event) => updateField("publishedAt", event.target.value)}
                type="date"
                value={entry.publishedAt}
              />
            </EditorField>
          </div>

          <EditorField label="Categories" hint="Pick all tags that describe the release.">
            <div className="flex flex-wrap gap-2">
              {changeCategories.map((category) => {
                const active = entry.categories.includes(category);
                return (
                  <button
                    className={
                      active
                        ? `rounded-full px-4 py-2 text-sm font-medium ${categoryMeta[category].className}`
                        : "rounded-full border border-border/70 bg-background px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted/80 hover:text-foreground"
                    }
                    key={category}
                    onClick={() => toggleCategory(category)}
                    type="button"
                  >
                    {categoryMeta[category].label}
                  </button>
                );
              })}
            </div>
          </EditorField>

          <EditorField
            label="Markdown body"
            hint="Supports headings, bullets, and checklists. The preview updates as you type."
          >
            <Textarea
              className="min-h-[340px] font-mono text-[13px] leading-6"
              onChange={(event) => updateField("body", event.target.value)}
              placeholder="## What changed"
              value={entry.body}
            />
          </EditorField>

          <div className="rounded-3xl border border-dashed border-violet-500/25 bg-violet-500/5 p-4 text-sm text-muted-foreground">
            Slug preview: <span className="font-medium text-foreground">{derivedSlug}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleSave}>
              <Save className="size-4" />
              Save local draft
            </Button>
            <Button onClick={resetDraft} variant="outline">
              <RotateCcw className="size-4" />
              Reset
            </Button>
            <Button asChild variant="ghost">
              <Link href="/admin">
                Back to admin
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          {feedback ? <p className="text-sm text-violet-700 dark:text-violet-300">{feedback}</p> : null}
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border/60">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Badge className="mb-3 w-fit" variant="muted">
                Live preview
              </Badge>
              <CardTitle className="text-2xl">{entry.title || "Untitled release"}</CardTitle>
            </div>
            <Badge>{entry.version || "0.0.0"}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {entry.publishedAt ? formatDate(entry.publishedAt) : "Pick a publish date"}
          </p>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-wrap gap-2">
            {entry.categories.length ? (
              entry.categories.map((category) => (
                <Badge className={categoryMeta[category].className} key={category}>
                  {categoryMeta[category].label}
                </Badge>
              ))
            ) : (
              <Badge variant="muted">No category selected</Badge>
            )}
            <Badge className={statusMeta[entry.status].className}>
              {statusMeta[entry.status].label}
            </Badge>
          </div>
          <div className="rounded-3xl border border-border/60 bg-muted/20 p-5">
            <p className="text-sm leading-6 text-muted-foreground">
              {entry.summary || "Your summary will appear here."}
            </p>
          </div>
          <div className="markdown">
            {entry.body ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.body}</ReactMarkdown>
            ) : (
              <div className="rounded-3xl border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
                Start writing markdown to see the release body preview.
              </div>
            )}
          </div>
          <div className="rounded-3xl border border-dashed border-border/70 bg-background/60 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <NotebookTabs className="size-4 text-violet-500" />
              Notes for the demo
            </div>
            <p className="text-sm text-muted-foreground">
              Admin changes are stored locally in the browser so the editor feels real without adding a database to this portfolio build.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
