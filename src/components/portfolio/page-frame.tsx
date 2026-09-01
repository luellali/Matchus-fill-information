import type { PropsWithChildren } from "react";

import { MatchHeader } from "@/components/portfolio/match-header";
import { cn } from "@/lib/utils";

export function PageFrame({
  children,
  className,
  compactHeader = false,
}: PropsWithChildren<{ className?: string; compactHeader?: boolean }>) {
  return (
    <section className={cn("screen-surface relative flex min-h-0 flex-1 flex-col overflow-hidden", className)}>
      <MatchHeader compact={compactHeader} />
      {children}
    </section>
  );
}
