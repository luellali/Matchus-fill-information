import { useState } from "react";
import { Sparkles } from "lucide-react";

import chatAssistant from "@/assets/chat-assistant.png";
import { OptionChip } from "@/components/portfolio/option-chip";
import { PageFrame } from "@/components/portfolio/page-frame";
import { ScreenFooter } from "@/components/portfolio/screen-footer";

const groups = [
  {
    title: "家庭背景",
    options: [
      "🏠 已购房",
      "🏡 有房有车",
      "👧 独生子女",
      "🏢 体制内家庭",
      "🚗 已购车",
      "👫 有兄弟姐妹",
      "💼 经商家庭",
      "💕 家庭氛围和睦",
      "🌇 本地家庭",
    ],
  },
  {
    title: "成长背景",
    options: [
      "🎗️ 曾经是学霸",
      "🌍 有留学经历",
      "🏃 体育生",
      "📚 考公人",
      "🎓 本科在读",
      "📚 硕士在读",
      "🔬 博士在读",
      "🎨 艺术类专业",
      "🗣️ 多语言能力",
    ],
  },
  {
    title: "择偶偏向",
    options: [
      "📍 同城优先",
      "🎓 学历相近",
      "💬 聊得来最重要",
      "🎓 智性恋爱好者",
      "💞 寻找长期关系",
      "🌈 性格互补",
      "👀 看重第一眼感觉",
      "🤝 温柔体贴",
      "🚭 不抽烟",
      "☀️ 喜欢情绪稳定",
      "🏃 偏爱运动型",
      "🧠 偏爱上进型",
    ],
  },
  {
    title: "兴趣爱好",
    options: [
      "🏋️ 有健身习惯",
      "🐱 大橘大利",
      "🥾 户外运动",
      "🎬 电影",
      "📸 摄影",
      "✈️ 旅行",
      "🎵 现场音乐",
      "🍳 做饭",
      "🖼️ 看展",
    ],
  },
] as const;

export function TagScreen({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<string[]>(["🏡 有房有车", "📚 硕士在读", "💞 寻找长期关系"]);

  function toggle(value: string) {
    setSelected((previous) =>
      previous.includes(value) ? previous.filter((item) => item !== value) : [...previous, value],
    );
  }

  return (
    <PageFrame className="animate-screen-in">
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-(--page-inline) pb-6 pt-3">
        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Sparkles className="size-4" />
            <span className="text-[11px] font-semibold tracking-[0.15em]">ABOUT YOU</span>
          </div>
          <h1 className="text-[24px] font-semibold tracking-[-0.04em] text-foreground">选择最代表你的标签</h1>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">无需面面俱到，先选下此刻最像你的部分。</p>
        </div>

        <div className="space-y-6">
          {groups.map((group) => (
            <section key={group.title}>
              <h2 className="mb-3 text-sm font-semibold text-foreground/68">{group.title}</h2>
              <div className="flex flex-wrap gap-2">
                {group.options.map((option) => (
                  <OptionChip
                    key={option}
                    label={option}
                    selected={selected.includes(option)}
                    onClick={() => toggle(option)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <img
        src={chatAssistant}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-5 z-10 h-auto w-20 select-none drop-shadow-[0_9px_18px_rgba(104,70,178,0.2)]"
        style={{ bottom: "calc(max(1rem, env(safe-area-inset-bottom)) + 4.75rem)" }}
      />
      <ScreenFooter
        disabled={selected.length < 3}
        onClick={onNext}
        hint={`已选择 ${selected.length} 个标签 · 至少选择 3 个`}
      />
    </PageFrame>
  );
}
