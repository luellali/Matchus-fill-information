import { useRef } from "react"

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 56 }: { onSwipeLeft: () => void; onSwipeRight: () => void; threshold?: number }) {
  const start = useRef<{ x: number; y: number } | null>(null)

  return {
    onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => {
      start.current = { x: event.clientX, y: event.clientY }
    },
    onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => {
      if (!start.current) return
      const dx = event.clientX - start.current.x
      const dy = event.clientY - start.current.y
      start.current = null
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.25) return
      if (dx < 0) onSwipeLeft()
      else onSwipeRight()
    },
  }
}

