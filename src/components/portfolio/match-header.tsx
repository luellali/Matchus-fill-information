import { Ellipsis, SlidersHorizontal } from "lucide-react";

import { type PageStage, PageStageIndicator } from "@/components/portfolio/page-stage-indicator";

export function MatchHeader({ compact = false, stage }: { compact?: boolean; stage?: PageStage }) {
  return (
    <header className="relative z-30 shrink-0 px-(--page-inline) pt-[env(safe-area-inset-top)]">
      <div className="relative flex h-14 items-center justify-between">
        <span className="-ml-2 grid size-12 place-items-center [&_svg]:size-6" aria-hidden="true">
          <SlidersHorizontal className="text-primary" />
        </span>

        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <div className="match-header-title text-xl font-semibold tracking-[-0.02em]">MatchUs</div>
          {!compact && <div className="mx-auto mt-0.5 h-0.5 w-8 rounded-full brand-gradient opacity-50" />}
        </div>

        <span className="-mr-2 grid size-12 place-items-center [&_svg]:size-6" aria-hidden="true">
          <Ellipsis className="text-foreground/75" />
        </span>
      </div>

      {stage && <PageStageIndicator stage={stage} />}
    </header>
  );
}
