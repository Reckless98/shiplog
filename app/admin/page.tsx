import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { SectionShell } from "@/components/section-shell";
import { getAllEntries } from "@/lib/changelog";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(
  "Admin",
  "ShipLog admin dashboard with release entry status, stats, and quick actions for editing updates.",
  "/admin"
);

export default function AdminPage() {
  const entries = getAllEntries();

  return (
    <SectionShell className="py-16 md:py-20">
      <div className="mb-10 max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
          Admin workspace
        </p>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold tracking-tight sm:text-5xl">
          Manage drafts, scheduled releases, and published notes
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          This portfolio build uses local draft storage for editor changes so the flow stays interactive without introducing a backend.
        </p>
      </div>
      <AdminDashboard entries={entries} />
    </SectionShell>
  );
}
