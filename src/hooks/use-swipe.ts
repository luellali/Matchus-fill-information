import { type PointerEventHandler, useRef } from "react";

import { isInteractiveElement } from "@/lib/dom";

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

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 56 }: SwipeOptions): SwipeHandlers {
  const start = useRef<SwipeStart | null>(null);

  return {
    onPointerDown: (event) => {
      start.current = null;
      // A gesture starting on a control belongs to that control, not to page navigation.
      if (!event.isPrimary || event.button !== 0 || isInteractiveElement(event.target)) return;
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
