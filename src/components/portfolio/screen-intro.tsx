import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type ScreenIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function ScreenIntro({ eyebrow, title, description, className }: ScreenIntroProps) {
  return (
    <div className={cn("flex flex-col mb-7 gap-0.5", className)}>
      <div className="flex items-center gap-2 text-primary">
        <Sparkles className="size-4" />
        <span className="text-[11px] font-semibold tracking-[0.15em]">{eyebrow}</span>
      </div>
      <h1 className="text-[24px] font-semibold tracking-[-0.04em] text-foreground">{title}</h1>
      <p className="text-xs leading-5 text-muted-foreground">{description}</p>
    </div>
  );
}
