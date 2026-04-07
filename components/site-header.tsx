import Link from "next/link";
import { Sailboat, Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/site-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link className="flex items-center gap-3" href="/">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
            <Sailboat className="size-5" />
          </div>
          <div>
            <p className="font-semibold tracking-tight">ShipLog</p>
            <p className="text-xs text-muted-foreground">Release notes for product teams</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-background/80 p-1 md:flex">
          {navItems.map((item) => (
            <Link
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted/80 hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden md:inline-flex" variant="secondary">
            <Link href="/admin">
              <Sparkles className="size-4" />
              Open demo admin
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
