import type { PropsWithChildren } from "react";

import { MatchHeader } from "@/components/portfolio/match-header";
import type { PageStage } from "@/components/portfolio/page-stage-indicator";
import { cn } from "@/lib/utils";

export function PageFrame({
  children,
  className,
  compactHeader = false,
  stage,
}: PropsWithChildren<{ className?: string; compactHeader?: boolean; stage?: PageStage }>) {
  return (
    <section className={cn("screen-surface relative flex min-h-0 flex-1 flex-col overflow-hidden", className)}>
      <MatchHeader compact={compactHeader} stage={stage} />
      {children}
    </section>
  );
}
