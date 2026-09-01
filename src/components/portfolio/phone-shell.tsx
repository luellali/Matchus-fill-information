import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type PhoneShellProps = PropsWithChildren<{
  className?: string;
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (event: React.PointerEvent<HTMLDivElement>) => void;
}>;

export function PhoneShell({ children, className, onPointerDown, onPointerUp }: PhoneShellProps) {
  return (
    <main
      className={cn(
        "relative mx-auto flex h-dvh w-full max-w-107.5 flex-col overflow-hidden bg-background sm:h-[min(874px,calc(100dvh-32px))] sm:rounded-[34px] sm:border sm:border-white/80 sm:shadow-[0_28px_80px_rgba(55,35,93,0.22)]",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {children}
    </main>
  );
}
