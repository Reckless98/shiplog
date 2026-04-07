import { cn } from "@/lib/utils";

type SectionShellProps = {
  children: React.ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function SectionShell({
  children,
  className,
  eyebrow,
  title,
  description
}: SectionShellProps) {
  return (
    <section className={cn("mx-auto w-full max-w-7xl px-4 md:px-6", className)}>
      {(eyebrow || title || description) && (
        <div className="mb-8 max-w-2xl">
          {eyebrow ? (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      )}
      {children}
    </section>
  );
}
