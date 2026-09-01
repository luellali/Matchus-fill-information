import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type OptionChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export function OptionChip({ label, selected, onClick, className }: OptionChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-8 items-center justify-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95",
        selected
          ? "border-primary bg-primary text-white shadow-[0_6px_14px_rgba(115,87,232,0.24)]"
          : "border-primary/20 bg-white/78 text-foreground/72 hover:border-primary/45 hover:text-primary",
        className,
      )}
    >
      {selected && <Check className="size-3" strokeWidth={3} />}
      {label}
    </button>
  );
}
