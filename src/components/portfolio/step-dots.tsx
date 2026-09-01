import { cn } from "@/lib/utils";

export function StepDots({
  current,
  total = 4,
  onSelect,
}: {
  current: number;
  total?: number;
  onSelect?: (index: number) => void;
}) {
  return (
    <nav className="flex items-center justify-center gap-2" aria-label="作品页面">
      {Array.from({ length: total }, (_, index) => index).map((pageIndex) => (
        <button
          key={`page-${pageIndex + 1}`}
          type="button"
          aria-label={`查看第 ${pageIndex + 1} 页`}
          aria-current={pageIndex === current ? "step" : undefined}
          disabled={!onSelect}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300 disabled:cursor-default",
            pageIndex === current ? "w-7 bg-primary" : "w-1.5 bg-primary/20 hover:bg-primary/40",
          )}
          onClick={() => onSelect?.(pageIndex)}
        />
      ))}
    </nav>
  );
}
