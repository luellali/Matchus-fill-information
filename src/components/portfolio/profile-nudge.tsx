import { useCallback, useEffect, useRef, useState } from "react";

import profileNudgeImage from "@/assets/profile-nudge.png";
import { Button } from "@/components/ui/button";

type ProfileNudgeProps = {
  onContinue: () => void;
};

type NudgePhase = "visible" | "exiting";

export function ProfileNudge({ onContinue }: ProfileNudgeProps) {
  const [phase, setPhase] = useState<NudgePhase>("visible");
  const replayTimer = useRef<number | null>(null);

  const replayNudge = useCallback(() => {
    if (replayTimer.current !== null) return;

    // The portfolio has one valid CTA, so dismiss attempts replay the prompt instead of hiding it permanently.
    setPhase("exiting");
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 80 : 560;
    replayTimer.current = window.setTimeout(() => {
      setPhase("visible");
      replayTimer.current = null;
    }, delay);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") replayNudge();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [replayNudge]);

  useEffect(() => {
    return () => {
      if (replayTimer.current !== null) window.clearTimeout(replayTimer.current);
    };
  }, []);

  return (
    <div
      className="profile-nudge-layer"
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-nudge-title"
      onClick={replayNudge}
      onKeyDown={(event) => {
        if (event.key === "Escape") replayNudge();
      }}
      tabIndex={-1}
      onPointerDown={(event) => event.stopPropagation()}
      onPointerUp={(event) => event.stopPropagation()}
    >
      <div className="profile-nudge-scrim" aria-hidden="true" />

      <div className="profile-nudge-toast">
        <img className="profile-nudge-image" src={profileNudgeImage} alt="" aria-hidden="true" />
        <div className="min-w-0">
          <p className="profile-nudge-eyebrow">快来三分钟完成资料填写～</p>
          <p id="profile-nudge-title" className="profile-nudge-title">
            填写资料，每一次匹配<span>更懂你</span>
          </p>
        </div>
        <Button
          variant="gradient"
          size="sm"
          className="profile-nudge-action"
          onClick={(event) => {
            event.stopPropagation();
            onContinue();
          }}
        >
          立即前往
        </Button>
      </div>
    </div>
  );
}
