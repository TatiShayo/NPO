import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverMock as any

// Mock IntersectionObserver
class IntersectionObserverMock {
  callback: any
  constructor(callback: any) {
    this.callback = callback
  }
  observe(target: any) {
    // Simulate immediate intersection so animations / logic run
    this.callback([{ isIntersecting: true, target }], this)
  }
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = IntersectionObserverMock as any

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock Recharts components to simplify rendering in jsdom
vi.mock('recharts', async (importOriginal) => {
  const original = await importOriginal<typeof import('recharts')>()
  return {
    ...original,
    ResponsiveContainer: ({ children }: any) => children,
  }
})
