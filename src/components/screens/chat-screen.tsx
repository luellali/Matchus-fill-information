import { useMemo, useState } from "react";
import { Mic, Plus, Smile } from "lucide-react";

import chatAssistant from "@/assets/chat-assistant.png";
import { ChatBubble } from "@/components/portfolio/chat-bubble";
import { GenderSelector, type GenderValue } from "@/components/portfolio/gender-selector";
import { PageFrame } from "@/components/portfolio/page-frame";
import { ScreenFooter } from "@/components/portfolio/screen-footer";
import { OptionChip } from "@/components/portfolio/option-chip";

const questions = [
  {
    prompt: "嗨，欢迎来到 MatchUs！我想先了解一下，你希望在这里遇见怎样的人？",
    options: ["聊得来的朋友", "一起探索城市", "认真认识彼此"],
  },
  {
    prompt: "很棒。那你更喜欢哪一种相处节奏？",
    options: ["轻松随缘", "每天都能聊聊", "从共同兴趣开始"],
  },
  {
    prompt: "最后一个小问题：什么会让你觉得一次相遇很值得？",
    options: ["被认真倾听", "发现新的可能", "自然地做自己"],
  },
] as const;

export function ChatScreen({ onNext }: { onNext: () => void }) {
  const [answers, setAnswers] = useState<string[]>([]);
  const [gender, setGender] = useState<GenderValue | null>(null);
  const active = Math.min(answers.length, questions.length - 1);
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
    <PageFrame className="animate-screen-in">
      <div className="px-(--page-inline) pt-1">
        <div className="flex items-center justify-center gap-1.5">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${index <= active ? "w-6 bg-primary" : "w-1.5 bg-primary/15"}`}
            />
          ))}
        </div>
      </div>

      <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-(--page-inline) pb-4 pt-5">
        {transcript.map((question, index) => (
          <div key={question.prompt} className="contents">
            {index === 0 ? (
              <div className="flex flex-col items-start">
                <img
                  src={chatAssistant}
                  alt="MatchUs 提问助手"
                  className="mb-1 h-auto w-16 object-contain drop-shadow-[0_6px_12px_rgba(104,70,178,0.2)]"
                />
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
            <ChatBubble>收到啦。你的表达已经让 MatchUs 更懂你，最后方便透露你的性别吗？</ChatBubble>
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
