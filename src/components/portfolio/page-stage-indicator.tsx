import type { CSSProperties } from "react";

import chatStageIcon from "@/assets/stage-chat.png";
import personaStageIcon from "@/assets/stage-persona.png";
import tagsStageIcon from "@/assets/stage-tags.png";

export type PageStage = "chat" | "tags" | "persona";

const stageConfig: Record<PageStage, { activeIndex: number; icon: string; label: string }> = {
  chat: { activeIndex: 1, icon: chatStageIcon, label: "资料问答" },
  tags: { activeIndex: 2, icon: tagsStageIcon, label: "标签选择" },
  persona: { activeIndex: 3, icon: personaStageIcon, label: "个性人设" },
};

const indicatorSlots = Array.from({ length: 5 }, (_, index) => index);

export function PageStageIndicator({ stage }: { stage: PageStage }) {
  const { activeIndex, icon, label } = stageConfig[stage];

  return (
    <div className="page-stage-indicator" role="img" aria-label={`当前阶段：${label}`}>
      {indicatorSlots.map((index) => {
        const active = index === activeIndex;
        const animationStyle = { "--stage-dot-index": index } as CSSProperties;

        return (
          <span key={index} className="page-stage-slot" style={animationStyle} aria-hidden="true">
            {active ? (
              <span className="page-stage-active">
                <img className="page-stage-icon" src={icon} alt="" />
              </span>
            ) : (
              <span className="page-stage-dot" />
            )}
          </span>
        );
      })}
    </div>
  );
}
