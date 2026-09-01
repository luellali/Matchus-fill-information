import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

export type PersonaMatchOption = {
  label: string;
  left: number;
  top: number;
  size: number;
};

type PersonaMatchRowProps = {
  source: string;
  options: readonly PersonaMatchOption[];
  selected: readonly string[];
  onToggle: (label: string) => void;
  compact?: boolean;
};

export function PersonaMatchRow({ source, options, selected, onToggle, compact = false }: PersonaMatchRowProps) {
  return (
    <section className="grid grid-cols-[92px_minmax(0,1fr)] gap-3">
      <div className="flex justify-center pt-3">
        <div className="grid size-[86px] place-items-center rounded-full bg-[linear-gradient(145deg,#7964df,#9e8ae9)] px-2 text-center text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(104,80,195,0.2)]">
          {source}
        </div>
      </div>

      <div className={cn("persona-match-options relative min-w-0", compact ? "h-[148px]" : "h-[184px]")}>
        {options.map((option, index) => {
          const active = selected.includes(option.label);

          return (
            <button
              key={option.label}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(option.label)}
              className={cn(
                "persona-match-option absolute grid place-items-center rounded-full border px-1 text-center text-[12px] font-semibold leading-4 transition-all duration-300 active:scale-95",
                active
                  ? "z-10 scale-105 border-transparent brand-gradient text-white shadow-[var(--shadow-float)]"
                  : "border-primary/65 bg-[linear-gradient(145deg,rgba(255,255,255,.92),rgba(255,235,244,.72))] text-primary/76 shadow-[0_5px_14px_rgba(92,70,157,0.08)] hover:scale-105 hover:border-primary",
              )}
              style={
                {
                  left: `${option.left}%`,
                  top: `${option.top}%`,
                  "--bubble-size": `${option.size}px`,
                  animation: active
                    ? undefined
                    : `bubble-float ${3.8 + (index % 3) * 0.65}s ease-in-out ${index * -0.32}s infinite`,
                } as CSSProperties
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
