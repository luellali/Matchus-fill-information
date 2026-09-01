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
        "max-w-[78%] rounded-[18px] px-4 py-2.5 text-[13px] leading-5",
        fromUser
          ? "chat-bubble-user ml-auto rounded-br-none font-medium"
          : "chat-bubble-assistant mr-auto rounded-bl-none backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}
