import { type PointerEventHandler, useRef } from "react";

const INTERACTIVE_TARGETS =
  "button, a, input, select, textarea, summary, [role='button'], [role='link'], [contenteditable='true']";

type SwipeOptions = {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
};

type SwipeStart = {
  pointerId: number;
  x: number;
  y: number;
};

type SwipeHandlers = {
  onPointerDown: PointerEventHandler<HTMLElement>;
  onPointerUp: PointerEventHandler<HTMLElement>;
  onPointerCancel: PointerEventHandler<HTMLElement>;
};

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(INTERACTIVE_TARGETS));
}

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 56 }: SwipeOptions): SwipeHandlers {
  const start = useRef<SwipeStart | null>(null);

  return {
    onPointerDown: (event) => {
      // A gesture starting on a control belongs to that control, not to page navigation.
      if (isInteractiveTarget(event.target)) return;
      start.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    },
    onPointerUp: (event) => {
      const swipeStart = start.current;
      if (!swipeStart || swipeStart.pointerId !== event.pointerId) return;
      start.current = null;

      const dx = event.clientX - swipeStart.x;
      const dy = event.clientY - swipeStart.y;
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.25) return;
      if (dx < 0) onSwipeLeft();
      else onSwipeRight();
    },
    onPointerCancel: () => {
      start.current = null;
    },
  };
}
