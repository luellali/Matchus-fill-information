import { useMemo, useState } from "react"
import { RotateCcw, Sparkles } from "lucide-react"

import { PageFrame } from "@/components/portfolio/page-frame"
import { ScreenFooter } from "@/components/portfolio/screen-footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const bubbleGroups = [
  { group: "你是谁", color: "#7357e8", items: ["大六感", "日常派", "INTJ", "ENFP", "理性派", "浪漫派"] },
  { group: "与我靠近", color: "#9d6ae9", items: ["好奇", "INFJ", "INFP", "ENTP", "会倾听", "有分寸"] },
  { group: "兴趣偏向", color: "#c861d8", items: ["看展", "大自然", "城市漫游", "影迷", "音乐现场", "旅行"] },
] as const

const positions = [
  [5, 4, 64], [34, 1, 48], [58, 7, 52], [76, 2, 44], [20, 17, 45], [49, 20, 56],
  [2, 34, 58], [28, 32, 44], [50, 37, 50], [76, 31, 46], [15, 50, 48], [59, 50, 60],
  [4, 68, 55], [31, 66, 48], [54, 70, 52], [78, 64, 45], [20, 82, 43], [63, 84, 50],
] as const

export function PersonaScreen({ onRestart }: { onRestart: () => void }) {
  const bubbles = useMemo(() => bubbleGroups.flatMap((group) => group.items.map((label) => ({ label, group: group.group, color: group.color }))), [])
  const [selected, setSelected] = useState<string[]>(["ENFP", "会倾听", "城市漫游"])
  const [complete, setComplete] = useState(false)

  function toggle(label: string) {
    setComplete(false)
    setSelected((previous) => previous.includes(label) ? previous.filter((item) => item !== label) : [...previous, label])
  }

  if (complete) {
    return (
      <PageFrame className="animate-screen-in">
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="grid size-20 place-items-center rounded-[28px] brand-gradient text-white shadow-[var(--shadow-float)]">
            <Sparkles className="size-8" />
          </div>
          <p className="mt-7 text-[11px] font-semibold tracking-[0.18em] text-primary">PROFILE READY</p>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em]">你的 MatchUs 画像完成了</h1>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">真诚、好奇，也愿意走进一段有分寸的关系。现在，每一次推荐都会更接近你。</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {selected.map((item) => <span key={item} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">{item}</span>)}
          </div>
          <Button variant="outline" className="mt-9" onClick={onRestart}><RotateCcw />重新体验</Button>
        </div>
      </PageFrame>
    )
  }

  return (
    <PageFrame className="animate-screen-in">
      <div className="px-[var(--page-inline)] pt-3">
        <h1 className="text-[23px] font-semibold tracking-[-0.04em]">选择你的个性人设</h1>
        <div className="mt-3 flex gap-4">
          {bubbleGroups.map((group) => (
            <div key={group.group} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="size-2 rounded-full" style={{ backgroundColor: group.color }} />{group.group}
            </div>
          ))}
        </div>
      </div>

      <div className="persona-cloud relative mx-[var(--page-inline)] my-4 min-h-0 flex-1 overflow-hidden rounded-[30px] border border-white/80 bg-white/42 shadow-inner backdrop-blur-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,.96),rgba(248,242,255,.7)_46%,rgba(239,226,255,.55))]" />
        {bubbles.map((bubble, index) => {
          const [left, top, size] = positions[index]
          const active = selected.includes(bubble.label)
          return (
            <button
              key={bubble.label}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(bubble.label)}
              className={cn(
                "persona-bubble absolute grid place-items-center rounded-full border text-center font-medium transition-all duration-300",
                active ? "z-10 scale-110 border-transparent text-white shadow-[var(--shadow-float)]" : "border-primary/25 bg-white/72 text-foreground/66 hover:scale-105 hover:border-primary/50",
              )}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `clamp(${size}px, ${(size / 3.82).toFixed(2)}cqw, ${Math.round(size * 1.2)}px)`,
                height: `clamp(${size}px, ${(size / 3.82).toFixed(2)}cqw, ${Math.round(size * 1.2)}px)`,
                background: active ? `linear-gradient(135deg, ${bubble.color}, #d26bda)` : undefined,
                animation: `bubble-float ${3.6 + (index % 4) * 0.55}s ease-in-out ${index * -0.18}s infinite`,
              }}
            >
              {bubble.label}
            </button>
          )
        })}
        <div className="persona-orb pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(135deg,#7357e8,#d563db)] opacity-90 blur-[1px]" />
      </div>
      <ScreenFooter label="完成我的画像" disabled={selected.length < 3} onClick={() => setComplete(true)} hint={`已点亮 ${selected.length} 个人设`} />
    </PageFrame>
  )
}

