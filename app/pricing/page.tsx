import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";

import { SectionShell } from "@/components/section-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";
import { pricingTiers } from "@/lib/site-content";

export const metadata = buildMetadata(
  "Pricing",
  "ShipLog pricing for starter, growth, and enterprise teams that need changelog publishing and release notes workflows.",
  "/pricing"
);

export default function PricingPage() {
  return (
    <SectionShell className="py-16 md:py-20">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
          Pricing
        </p>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold tracking-tight sm:text-5xl">
          Plans for teams shipping a public release feed
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Three plans, one workflow: write updates, publish them, and keep the public feed current.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <Card
            className={tier.featured ? "border-violet-500/30 shadow-[0_20px_80px_-50px_rgba(91,33,182,0.5)]" : ""}
            key={tier.name}
          >
            <CardHeader>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <p className="text-4xl font-semibold tracking-tight">{tier.price}</p>
              <CardDescription className="text-sm leading-6">{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {tier.features.map((feature) => (
                  <li className="flex gap-3" key={feature}>
                    <Check className="mt-0.5 size-4 text-violet-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full" variant={tier.featured ? "default" : "outline"}>
                <Link href="/docs">
                  See implementation details
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
