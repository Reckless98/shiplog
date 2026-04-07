import Link from "next/link";

import { navItems, siteConfig } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 md:flex-row md:justify-between md:px-6">
        <div className="max-w-md space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">{siteConfig.name}</h2>
          <p className="text-sm text-muted-foreground">
            Product changelog pages and admin workflows for teams that ship often.
          </p>
          <p className="text-sm text-muted-foreground">
            RSS:{" "}
            <Link className="text-violet-600 hover:underline dark:text-violet-300" href="/rss.xml">
              /rss.xml
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          {navItems.map((item) => (
            <Link className="transition hover:text-foreground" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
