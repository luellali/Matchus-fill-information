import { useCallback, useEffect, useMemo, useState } from "react";

import { PhoneShell } from "@/components/portfolio/phone-shell";
import { PortfolioNavigation } from "@/components/portfolio/portfolio-navigation";
import { ChatScreen } from "@/components/screens/chat-screen";
import { DiscoverScreen } from "@/components/screens/discover-screen";
import { PersonaScreen } from "@/components/screens/persona-screen";
import { TagScreen } from "@/components/screens/tag-screen";
import { useSwipe } from "@/hooks/use-swipe";
import { isInteractiveElement } from "@/lib/dom";
import { clamp } from "@/lib/utils";

const stageIds = ["discover", "chat", "tags", "persona"] as const;

function getStageFromHash(hash: string) {
  const stageId = hash.replace("#", "");
  const index = stageIds.indexOf(stageId as (typeof stageIds)[number]);
  return index >= 0 ? index : 0;
}

function App() {
  const [stage, setStage] = useState(() => getStageFromHash(window.location.hash));

  const goTo = useCallback((next: number) => {
    setStage(clamp(next, 0, stageIds.length - 1));
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${stageIds[stage]}`);
  }, [stage]);

  useEffect(() => {
    const syncStageFromHash = () => {
      const nextStage = getStageFromHash(window.location.hash);
      const canonicalHash = `#${stageIds[nextStage]}`;
      if (window.location.hash !== canonicalHash) {
        window.history.replaceState(null, "", canonicalHash);
      }
      setStage(nextStage);
    };
    window.addEventListener("hashchange", syncStageFromHash);
    return () => window.removeEventListener("hashchange", syncStageFromHash);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        stage === 0 ||
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        isInteractiveElement(event.target)
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(stage + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(stage - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, stage]);

  const swipe = useSwipe({
    onSwipeLeft: () => stage > 0 && goTo(stage + 1),
    onSwipeRight: () => goTo(stage - 1),
  });

  const screen = useMemo(() => {
    switch (stage) {
      case 0:
        return <DiscoverScreen onNext={() => goTo(1)} />;
      case 1:
        return <ChatScreen onNext={() => goTo(2)} />;
      case 2:
        return <TagScreen onNext={() => goTo(3)} />;
      default:
        return <PersonaScreen onRestart={() => goTo(0)} />;
    }
  }, [goTo, stage]);

  return (
    <div className="app-backdrop relative min-h-dvh sm:grid sm:place-items-center sm:p-4">
      <div className="relative mx-auto w-full max-w-107.5">
        <PhoneShell {...swipe}>
          <div key={stage} className="contents">
            {screen}
          </div>
        </PhoneShell>

        <PortfolioNavigation
          current={stage}
          total={stageIds.length}
          onPrevious={() => goTo(stage - 1)}
          onNext={() => goTo(stage + 1)}
          onSelect={goTo}
        />
      </div>
    </div>
  );
}

export default App;
