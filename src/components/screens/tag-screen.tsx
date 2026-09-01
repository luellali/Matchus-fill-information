import { useState } from "react"
import { Sparkles } from "lucide-react"

import { OptionChip } from "@/components/portfolio/option-chip"
import { PageFrame } from "@/components/portfolio/page-frame"
import { ScreenFooter } from "@/components/portfolio/screen-footer"

const groups = [
  { title: "来自背景", options: ["互联网", "学生党", "创意行业", "研究生", "自由职业", "城市探索者", "夜猫子", "轻社恐"] },
  { title: "成长背景", options: ["慢热真诚", "有留学经历", "南方人", "北方人", "独生子女", "和宠物长大", "艺术生", "小城青年"] },
  { title: "好奇偏向", options: ["阅读", "电影", "摄影", "旅行", "现场音乐", "做饭", "展览", "心理学", "桌游", "运动"] },
] as const

export function TagScreen({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<string[]>(["创意行业", "慢热真诚", "电影"])

  function toggle(value: string) {
    setSelected((previous) => previous.includes(value) ? previous.filter((item) => item !== value) : [...previous, value])
  }

  return (
    <PageFrame className="animate-screen-in">
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-[var(--page-inline)] pb-6 pt-3">
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
              <h2 className="mb-3 text-[12px] font-semibold text-foreground/68">{group.title}</h2>
              <div className="flex flex-wrap gap-2">
                {group.options.map((option) => (
                  <OptionChip key={option} label={option} selected={selected.includes(option)} onClick={() => toggle(option)} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <ScreenFooter
        disabled={selected.length < 3}
        onClick={onNext}
        hint={`已选择 ${selected.length} 个标签 · 至少选择 3 个`}
      />
    </PageFrame>
  )
}

