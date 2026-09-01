import { Mic, Plus, Smile } from "lucide-react";
import { useMemo, useState } from "react";

import chatAssistant from "@/assets/chat-assistant.png";
import { ChatBubble } from "@/components/portfolio/chat-bubble";
import { GenderSelector, type GenderValue } from "@/components/portfolio/gender-selector";
import { OptionChip } from "@/components/portfolio/option-chip";
import { PageFrame } from "@/components/portfolio/page-frame";
import { ScreenFooter } from "@/components/portfolio/screen-footer";

const introMessage =
  "嗨，欢迎来到 MatchUs！我是你的 AI 匹配助手，告诉我基本资料，我就能帮你找到更合拍的人。准备好了吗？";

const questions = [
  {
    prompt: "先告诉我，希望大家怎么称呼你？",
    id: "name",
    options: ["无尽夏", "小宇", "阿言"],
  },
  {
    prompt: "很高兴认识你。你希望在这里遇见怎样的人？",
    id: "intent",
    options: ["聊得来的朋友", "一起探索城市", "认真认识彼此"],
  },
  {
    prompt: "最后一个小问题：什么会让你觉得一次相遇很值得？",
    id: "value",
    options: ["被认真倾听", "发现新的可能", "自然地做自己"],
  },
] as const;

export function ChatScreen({ onNext }: { onNext: () => void }) {
  const [answers, setAnswers] = useState<string[]>([]);
  const [gender, setGender] = useState<GenderValue | null>(null);
  const completed = answers.length === questions.length;

  const transcript = useMemo(
    () => questions.slice(0, Math.min(answers.length + 1, questions.length)),
    [answers.length],
  );

  function answer(value: string) {
    if (completed) return;
    setAnswers((previous) => [...previous, value]);
  }

  return (
    <PageFrame className="animate-screen-in" stage="chat">
      <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-(--page-inline) pb-4 pt-3">
        {transcript.map((question, index) => (
          <div key={question.prompt} className="contents">
            {index === 0 ? (
              <div className="flex flex-col items-start gap-2">
                <img
                  src={chatAssistant}
                  alt="MatchUs 提问助手"
                  className="h-auto w-16 object-contain drop-shadow-[0_6px_12px_rgba(104,70,178,0.2)]"
                />
                <ChatBubble>{introMessage}</ChatBubble>
                <ChatBubble>{question.prompt}</ChatBubble>
              </div>
            ) : (
              <ChatBubble>{question.prompt}</ChatBubble>
            )}
            {answers[index] ? (
              <ChatBubble fromUser>{answers[index]}</ChatBubble>
            ) : (
              <div className="flex flex-wrap justify-end gap-2 pl-8">
                {question.options.map((option) => (
                  <OptionChip key={option} label={option} onClick={() => answer(option)} />
                ))}
              </div>
            )}
          </div>
        ))}
        {completed && (
          <>
            <ChatBubble>{answers[0]}，方便透露你的性别吗？</ChatBubble>
            <ChatBubble>一经确认后将无法在本次体验中修改哦～</ChatBubble>
            <GenderSelector value={gender} onChange={setGender} />
          </>
        )}
      </div>

      {!completed || !gender ? (
        <div className="flex items-center gap-3 border-t border-white/70 bg-white/64 px-(--page-inline) pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
          <Mic className="size-5.5 shrink-0 text-primary" />
          <div className="h-10 flex-1 rounded-full border border-white bg-white/75 shadow-sm" />
          <Smile className="size-5.5 shrink-0 text-primary" />
          <Plus className="size-5.5 shrink-0 text-primary" />
        </div>
      ) : (
        <ScreenFooter label="选择我的标签" onClick={onNext} />
      )}
    </PageFrame>
  );
}
