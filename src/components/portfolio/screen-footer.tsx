import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ScreenFooter({
  label = "下一步",
  disabled,
  onClick,
  hint,
}: {
  label?: string;
  disabled?: boolean;
  onClick: () => void;
  hint?: string;
}) {
  return (
    <div className="relative z-20 border-t border-white/70 bg-white/72 px-(--page-inline) pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        {hint && <p className="min-w-0 flex-1 text-[10px] leading-4 text-muted-foreground">{hint}</p>}
        <Button
          variant="gradient"
          size="default"
          disabled={disabled}
          onClick={onClick}
          className={hint ? "min-w-28" : "w-full"}
        >
          {label}
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
