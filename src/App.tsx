import { useCallback, useEffect, useMemo, useState } from "react";

import { PhoneShell } from "@/components/portfolio/phone-shell";
import { PortfolioNavigation } from "@/components/portfolio/portfolio-navigation";
import { ChatScreen } from "@/components/screens/chat-screen";
import { DiscoverScreen } from "@/components/screens/discover-screen";
import { PersonaScreen } from "@/components/screens/persona-screen";
import { TagScreen } from "@/components/screens/tag-screen";
import { useSwipe } from "@/hooks/use-swipe";
import { clamp } from "@/lib/utils";

const stageIds = ["discover", "chat", "tags", "persona"] as const;

function getInitialStage() {
  const hash = window.location.hash.replace("#", "");
  const index = stageIds.indexOf(hash as (typeof stageIds)[number]);
  return index >= 0 ? index : 0;
}

function App() {
  const [stage, setStage] = useState(getInitialStage);

  const goTo = useCallback((next: number) => {
    setStage(clamp(next, 0, stageIds.length - 1));
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${stageIds[stage]}`);
  }, [stage]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (stage === 0) return;
      if (event.key === "ArrowRight") goTo(stage + 1);
      if (event.key === "ArrowLeft") goTo(stage - 1);
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
      <div className="relative">
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
