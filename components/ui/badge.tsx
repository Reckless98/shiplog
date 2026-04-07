import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-200",
        muted:
          "border border-slate-500/15 bg-slate-500/10 text-slate-700 dark:text-slate-200",
        success:
          "border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200",
        warning:
          "border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-200"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
