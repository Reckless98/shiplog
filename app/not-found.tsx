import Link from "next/link";

import { SectionShell } from "@/components/section-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SectionShell className="py-24 text-center">
      <div className="mx-auto max-w-2xl space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
          Missing page
        </p>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold tracking-tight sm:text-5xl">
          That release page is not here.
        </h1>
        <p className="text-lg text-muted-foreground">
          It may still be in draft, scheduled for later, or the link is simply wrong.
        </p>
        <div className="flex justify-center gap-3">
          <Button asChild>
            <Link href="/changelog">Go to changelog</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
