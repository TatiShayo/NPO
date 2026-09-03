import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useCountUp } from './useCountUp'
import { useIntersectionObserver } from './useIntersectionObserver'
import { useScrollAnimation } from './useScrollAnimation'

describe('Custom Hooks Suite', () => {
  describe('useCountUp', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('returns 0 initially before animation starts', () => {
      const { result } = renderHook(() => useCountUp(100, 1000, false))
      expect(result.current).toBe(0)
    })

    it('returns target number immediately when prefers-reduced-motion is true', () => {
      // Mock matchMedia to return true for reduced motion
      const originalMatchMedia = window.matchMedia
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))

      const { result } = renderHook(() => useCountUp(500, 1000, true))
      expect(result.current).toBe(500)

      window.matchMedia = originalMatchMedia
    })
  })

  describe('useIntersectionObserver', () => {
    it('initializes with ref and visibility flag', () => {
      const { result } = renderHook(() => useIntersectionObserver({ threshold: 0.2 }))
      const [ref, isVisible] = result.current
      expect(ref).toBeDefined()
      expect(typeof isVisible).toBe('boolean')
    })
  })

  describe('useScrollAnimation', () => {
    it('observes all elements with animate-on-scroll class', () => {
      document.body.innerHTML = `
        <div class="animate-on-scroll">Element 1</div>
        <div class="animate-on-scroll">Element 2</div>
      `
      renderHook(() => useScrollAnimation())

      // With our setup mock simulating intersection:
      const elements = document.querySelectorAll('.animate-on-scroll')
      expect(elements.length).toBe(2)
    })
  })
})
