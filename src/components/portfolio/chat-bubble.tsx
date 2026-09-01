import { cn } from "@/lib/utils";

export function ChatBubble({
  children,
  fromUser = false,
  className,
}: {
  children: React.ReactNode;
  fromUser?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[78%] rounded-2xl px-4 py-2.5 text-[13px] leading-5 shadow-sm",
        fromUser
          ? "ml-auto rounded-br-md bg-(--brand-gradient) text-white"
          : "mr-auto rounded-bl-md border border-white/90 bg-white/84 text-foreground/78 backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}
