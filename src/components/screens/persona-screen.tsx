import { useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";

import chatAssistant from "@/assets/chat-assistant.png";
import { PageFrame } from "@/components/portfolio/page-frame";
import { PersonaMatchRow, type PersonaMatchOption } from "@/components/portfolio/persona-match-row";
import { ScreenIntro } from "@/components/portfolio/screen-intro";
import { ScreenFooter } from "@/components/portfolio/screen-footer";
import { Button } from "@/components/ui/button";

type MatchGroup = {
  source: string;
  compact?: boolean;
  options: readonly PersonaMatchOption[];
};

const matchGroups: readonly MatchGroup[] = [
  {
    source: "水瓶座",
    options: [
      { label: "白羊座", left: 0, top: 8, size: 68 },
      { label: "射手座", left: 52, top: 0, size: 72 },
      { label: "双子座", left: 25, top: 46, size: 70 },
      { label: "天秤座", left: 69, top: 38, size: 72 },
    ],
  },
  {
    source: "ENFP",
    options: [
      { label: "INTJ", left: 34, top: 0, size: 68 },
      { label: "ENTP", left: 66, top: 24, size: 72 },
      { label: "INFJ", left: 0, top: 38, size: 68 },
      { label: "INFP", left: 42, top: 52, size: 70 },
    ],
  },
  {
    source: "狗狗型",
    options: [
      { label: "猫猫型", left: 0, top: 8, size: 72 },
      { label: "狐狸型", left: 69, top: 0, size: 72 },
      { label: "大象型", left: 35, top: 40, size: 76 },
      { label: "狗狗型", left: 61, top: 62, size: 72 },
      { label: "海豚型", left: 17, top: 70, size: 72 },
    ],
  },
  {
    source: "主水木",
    compact: true,
    options: [
      { label: "主金", left: 8, top: 8, size: 72 },
      { label: "主木火", left: 55, top: 10, size: 76 },
      { label: "主金水", left: 35, top: 58, size: 72 },
    ],
  },
];

export function PersonaScreen({ onRestart }: { onRestart: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);

  function toggle(label: string) {
    setComplete(false);
    setSelected((previous) =>
      previous.includes(label) ? previous.filter((item) => item !== label) : [...previous, label],
    );
  }

  if (complete) {
    return (
      <PageFrame className="animate-screen-in">
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="grid size-20 place-items-center rounded-[28px] brand-gradient text-white shadow-(--shadow-float)">
            <Sparkles className="size-8" />
          </div>
          <p className="mt-7 text-[11px] font-semibold tracking-[0.18em] text-primary">PROFILE READY</p>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em]">你的 MatchUs 画像完成了</h1>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
            真诚、好奇，也愿意走进一段有分寸的关系。现在，每一次推荐都会更接近你。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {selected.map((item) => (
              <span
                key={item}
                className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
              >
                {item}
              </span>
            ))}
          </div>
          <Button variant="outline" className="mt-9" onClick={onRestart}>
            <RotateCcw />
            重新体验
          </Button>
        </div>
      </PageFrame>
    );
  }

  return (
    <PageFrame className="animate-screen-in">
      <div className="px-(--page-inline) pt-3">
        <ScreenIntro
          eyebrow="PERSONA MATCH"
          title="选择你的个性人设"
          description="从最像你的身份出发，选择让你更想靠近的匹配气泡。"
          className="mb-0"
        />
        <div className="mt-6 grid grid-cols-[92px_minmax(0,1fr)] gap-3 text-[13px] font-semibold text-primary">
          <h2 className="text-center text-base">你是？</h2>
          <h2 className="text-base pl-6">与这些匹配</h2>
        </div>
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-(--page-inline) pb-24 pt-2">
        {matchGroups.map((group) => (
          <PersonaMatchRow
            key={group.source}
            source={group.source}
            options={group.options}
            selected={selected}
            onToggle={toggle}
            compact={group.compact}
          />
        ))}
      </div>

      <img
        src={chatAssistant}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-5 z-10 h-auto w-20 select-none drop-shadow-[0_9px_18px_rgba(104,70,178,0.2)]"
        style={{ bottom: "calc(max(1rem, env(safe-area-inset-bottom)) + 4.75rem)" }}
      />
      <ScreenFooter
        label="下一步"
        disabled={selected.length < 1}
        onClick={() => setComplete(true)}
        hint={selected.length ? `已选择 ${selected.length} 个匹配气泡` : "请至少选择 1 个气泡"}
      />
    </PageFrame>
  );
}
