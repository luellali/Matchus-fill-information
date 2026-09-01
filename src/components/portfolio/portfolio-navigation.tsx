import { ArrowLeft, ArrowRight } from "lucide-react";

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

      <nav
        className="absolute left-1/2 z-70 flex -translate-x-1/2 items-center gap-2 sm:hidden"
        style={{ bottom: "max(5.25rem, calc(env(safe-area-inset-bottom) + 4.25rem))" }}
        aria-label="作品页面导航"
      >
        <Button
          variant="outline"
          size="icon"
          className="size-9 border-white/90 bg-white/78 shadow-[var(--shadow-float)] backdrop-blur-xl"
          disabled={previousDisabled}
          onClick={onPrevious}
          aria-label="上一页"
        >
          <ArrowLeft />
        </Button>
        <div className="rounded-full border border-white/90 bg-white/78 px-3 py-3 shadow-[var(--shadow-float)] backdrop-blur-xl">
          <StepDots current={current} total={total} onSelect={onSelect} />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="size-9 border-white/90 bg-white/78 shadow-[var(--shadow-float)] backdrop-blur-xl"
          disabled={nextDisabled}
          onClick={onNext}
          aria-label="下一页"
        >
          <ArrowRight />
        </Button>
      </nav>
    </>
  );
}
