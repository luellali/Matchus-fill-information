import { PersonStanding } from "lucide-react";

import { cn } from "@/lib/utils";

export type GenderValue = "F" | "M";

type GenderSelectorProps = {
  value: GenderValue | null;
  onChange: (value: GenderValue) => void;
};

const genders: GenderValue[] = ["F", "M"];

export function GenderSelector({ value, onChange }: GenderSelectorProps) {
  return (
    <fieldset className="flex justify-center py-0.5">
      <legend className="sr-only">选择你的性别</legend>
      <div className="flex h-31 w-[213px] items-end justify-between gap-3">
        {genders.map((gender) => {
          const selected = value === gender;

          return (
            <button
              key={gender}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={gender === "F" ? "选择 F" : "选择 M"}
              onClick={() => onChange(gender)}
              className={cn(
                "group flex w-24 flex-col items-center gap-1 rounded-[16px] py-1 text-primary transition-all duration-300 active:scale-95",
                selected ? "-translate-y-1" : "opacity-82 hover:-translate-y-0.5 hover:opacity-100",
              )}
            >
              <span
                className={cn(
                  "relative grid h-[84px] w-[78px] place-items-center overflow-hidden rounded-[11px] border-2 bg-white/72 shadow-[0_8px_18px_rgba(91,61,151,0.13)] transition-all duration-300",
                  gender === "F" ? "-rotate-10" : "rotate-10",
                  selected
                    ? "border-primary bg-[linear-gradient(145deg,rgba(224,212,255,0.98),rgba(255,225,244,0.94))] shadow-[0_10px_22px_rgba(111,80,230,0.26)]"
                    : "border-[#a991ff] group-hover:border-primary",
                )}
                aria-hidden="true"
              >
                <span className={cn("absolute -left-3 -top-3 size-10 rounded-full", gender === "F" ? "bg-[#b7a2ff]/38" : "bg-[#ffb7ca]/42")} />
                <span className={cn("absolute -bottom-5 -right-4 size-14 rounded-full", gender === "F" ? "bg-[#8ba7ff]/30" : "bg-[#ff9f97]/34")} />
                <PersonStanding className={cn("relative size-11 stroke-[1.8]", gender === "F" ? "text-[#6952dc]" : "text-[#e76f72]")} />
                {selected && <span className="absolute right-2 top-2 size-2.5 rounded-full border-2 border-white bg-primary shadow-sm" />}
              </span>
              <span className="text-[16px] font-bold leading-none">{gender}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
