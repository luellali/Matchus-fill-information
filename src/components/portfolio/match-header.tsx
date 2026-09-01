import { Ellipsis, SlidersHorizontal } from "lucide-react";

import { type PageStage, PageStageIndicator } from "@/components/portfolio/page-stage-indicator";
import { Button } from "@/components/ui/button";

export function MatchHeader({ compact = false, stage }: { compact?: boolean; stage?: PageStage }) {
  return (
    <header className="relative z-30 shrink-0 px-(--page-inline) pt-[env(safe-area-inset-top)]">
      <div className="relative flex h-14 items-center justify-between">
        <Button variant="ghost" size="icon" className="-ml-2 size-12 [&_svg]:size-6" aria-label="筛选">
          <SlidersHorizontal className="text-primary" />
        </Button>

        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <div className="match-header-title text-xl font-semibold tracking-[-0.02em]">MatchUs</div>
          {!compact && <div className="mx-auto mt-0.5 h-0.5 w-8 rounded-full brand-gradient opacity-50" />}
        </div>

        <Button variant="ghost" size="icon" className="-mr-2 size-12 [&_svg]:size-6" aria-label="更多">
          <Ellipsis className="text-foreground/75" />
        </Button>
      </div>

      {stage && <PageStageIndicator stage={stage} />}
    </header>
  );
}
