import { ArrowLeft, ArrowRight, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useEffect, useState } from "react";

import { StepDots } from "@/components/portfolio/step-dots";
import { Button } from "@/components/ui/button";

type PortfolioNavigationProps = {
  current: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
};

export function PortfolioNavigation({ current, total, onPrevious, onNext, onSelect }: PortfolioNavigationProps) {
  const previousDisabled = current === 0;
  const nextDisabled = current === total - 1;

  const [mobileExpanded, setMobileExpanded] = useState(false);

  useEffect(() => {
    if (!mobileExpanded) return;

    const timeoutId = window.setTimeout(() => setMobileExpanded(false), 4500);
    return () => window.clearTimeout(timeoutId);
  }, [mobileExpanded]);

  function runMobileNavigation(action: () => void) {
    action();
    setMobileExpanded(false);
  }

  function selectMobilePage(index: number) {
    onSelect(index);
    setMobileExpanded(false);
  }

  return (
    <>
      <div className="absolute -right-20 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 sm:flex">
        <Button variant="outline" size="icon" disabled={previousDisabled} onClick={onPrevious} aria-label="上一页">
          <ArrowLeft />
        </Button>
        <div className="rounded-full border border-white/80 bg-white/68 px-2 py-4 shadow-lg backdrop-blur-xl">
          <StepDots current={current} total={total} onSelect={onSelect} />
        </div>
        <Button variant="outline" size="icon" disabled={nextDisabled} onClick={onNext} aria-label="下一页">
          <ArrowRight />
        </Button>
      </div>

      {mobileExpanded ? (
        <nav
          className="absolute right-2 top-1/2 z-70 flex -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-white/90 bg-white/82 px-1.5 py-2 shadow-[var(--shadow-float)] backdrop-blur-xl sm:hidden"
          aria-label="作品页面导航"
        >
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full text-foreground/58"
            onClick={() => setMobileExpanded(false)}
            aria-label="收起页面导航"
          >
            <PanelRightOpen />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-9 border-white/90 bg-white/78 shadow-sm"
            disabled={previousDisabled}
            onClick={() => runMobileNavigation(onPrevious)}
            aria-label="上一页"
          >
            <ArrowLeft />
          </Button>
          <div className="rounded-full bg-primary/4 px-2 py-3">
            <StepDots current={current} total={total} onSelect={selectMobilePage} orientation="vertical" />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-9 border-white/90 bg-white/78 shadow-sm"
            disabled={nextDisabled}
            onClick={() => runMobileNavigation(onNext)}
            aria-label="下一页"
          >
            <ArrowRight />
          </Button>
        </nav>
      ) : (
        <button
          type="button"
          className="absolute right-0 top-1/2 z-70 flex h-18 w-7 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-l-full border border-r-0 border-white/90 bg-white/78 text-primary shadow-[var(--shadow-float)] backdrop-blur-xl transition-transform active:translate-x-0.5 sm:hidden"
          onClick={() => setMobileExpanded(true)}
          aria-label={`展开页面导航，当前第 ${current + 1} 页，共 ${total} 页`}
          aria-expanded="false"
        >
          <PanelRightClose className="size-3.5" />
          <span className="text-[9px] font-semibold tabular-nums" aria-hidden="true">
            {current + 1}/{total}
          </span>
        </button>
      )}
    </>
  );
}
