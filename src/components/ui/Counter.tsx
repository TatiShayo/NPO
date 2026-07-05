// ============================================
// Counter Component — Animated count-up number
// ============================================

import { useCountUp } from '../../hooks/useCountUp'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

interface CounterProps {
  target: number
  suffix?: string
  duration?: number
}

export default function Counter({ target, suffix = '', duration = 2000 }: CounterProps) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 })
  const count = useCountUp(target, duration, isVisible)

  return (
    <span ref={ref} className="stat-number">
      {count.toLocaleString()}{suffix}
    </span>
  )
}
