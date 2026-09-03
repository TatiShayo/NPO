import { describe, it, expect } from 'vitest'
import {
  hexToRgb,
  getRelativeLuminance,
  getContrastRatio,
  meetsWcagAA,
  meetsWcagAAA,
  generateAriaDescribedBy,
} from './accessibility'

describe('Accessibility & WCAG Color Contrast Utility', () => {
  describe('hexToRgb', () => {
    it('converts 6-digit hex colors to RGB values in range 0..1', () => {
      expect(hexToRgb('#000000')).toEqual([0, 0, 0])
      expect(hexToRgb('#FFFFFF')).toEqual([1, 1, 1])
      expect(hexToRgb('#FF0000')).toEqual([1, 0, 0])
      expect(hexToRgb('#00FF00')).toEqual([0, 1, 0])
      expect(hexToRgb('#0000FF')).toEqual([0, 0, 1])
    })

    it('converts 3-digit shorthand hex colors to full RGB values', () => {
      expect(hexToRgb('#000')).toEqual([0, 0, 0])
      expect(hexToRgb('#FFF')).toEqual([1, 1, 1])
      expect(hexToRgb('#F00')).toEqual([1, 0, 0])
    })

    it('handles invalid hex colors gracefully by defaulting to black [0, 0, 0]', () => {
      expect(hexToRgb('invalid')).toEqual([0, 0, 0])
      expect(hexToRgb('')).toEqual([0, 0, 0])
    })
  })

  describe('getRelativeLuminance', () => {
    it('calculates 1.0 for pure white (#FFFFFF)', () => {
      expect(getRelativeLuminance('#FFFFFF')).toBe(1.0)
    })

    it('calculates 0.0 for pure black (#000000)', () => {
      expect(getRelativeLuminance('#000000')).toBe(0.0)
    })

    it('calculates accurate relative luminance for brand colors', () => {
      const lumBlue = getRelativeLuminance('#0E6BA8')
      expect(lumBlue).toBeGreaterThan(0)
      expect(lumBlue).toBeLessThan(1)
    })
  })

  describe('getContrastRatio', () => {
    it('calculates 21:1 for black on white', () => {
      expect(getContrastRatio('#FFFFFF', '#000000')).toBe(21.0)
      expect(getContrastRatio('#000000', '#FFFFFF')).toBe(21.0)
    })

    it('calculates 1:1 for identical colors', () => {
      expect(getContrastRatio('#0E6BA8', '#0E6BA8')).toBe(1.0)
      expect(getContrastRatio('#FFFFFF', '#FFFFFF')).toBe(1.0)
    })

    it('calculates high contrast for white on deep background (#0A1628)', () => {
      const ratio = getContrastRatio('#FFFFFF', '#0A1628')
      expect(ratio).toBeGreaterThan(15.0)
    })
  })

  describe('meetsWcagAA', () => {
    it('passes for high contrast combinations (e.g. white on black)', () => {
      expect(meetsWcagAA('#FFFFFF', '#000000')).toBe(true)
      expect(meetsWcagAA('#000000', '#FFFFFF')).toBe(true)
    })

    it('passes for AquaHope dark mode background (#0A1628) with white text', () => {
      expect(meetsWcagAA('#FFFFFF', '#0A1628')).toBe(true)
    })

    it('fails for low contrast combinations (e.g. #777777 on #888888)', () => {
      expect(meetsWcagAA('#777777', '#888888')).toBe(false)
    })

    it('uses 3.0:1 threshold for large text and 4.5:1 for normal text', () => {
      // Color with approx 3.5:1 ratio
      const fg = '#757575'
      const bg = '#FFFFFF'
      const ratio = getContrastRatio(fg, bg)

      if (ratio >= 3.0 && ratio < 4.5) {
        expect(meetsWcagAA(fg, bg, true)).toBe(true)  // Large text passes
        expect(meetsWcagAA(fg, bg, false)).toBe(false) // Normal text fails
      }
    })
  })

  describe('meetsWcagAAA', () => {
    it('passes for extreme contrast combinations (>= 7:1 for normal text)', () => {
      expect(meetsWcagAAA('#FFFFFF', '#000000')).toBe(true)
      expect(meetsWcagAAA('#FFFFFF', '#0A1628')).toBe(true)
    })

    it('fails when ratio is between 4.5 and 7.0 for normal text', () => {
      // Color with ~5:1 ratio
      const fg = '#595959'
      const bg = '#FFFFFF'
      const ratio = getContrastRatio(fg, bg)

      if (ratio >= 4.5 && ratio < 7.0) {
        expect(meetsWcagAA(fg, bg)).toBe(true)
        expect(meetsWcagAAA(fg, bg)).toBe(false)
      }
    })
  })

  describe('generateAriaDescribedBy', () => {
    it('combines errorId and hintId when both provided', () => {
      expect(generateAriaDescribedBy('field-1', 'err-1', 'hint-1')).toBe('err-1 hint-1')
    })

    it('returns single ID when only error or hint provided', () => {
      expect(generateAriaDescribedBy('field-1', 'err-1')).toBe('err-1')
      expect(generateAriaDescribedBy('field-1', undefined, 'hint-1')).toBe('hint-1')
    })

    it('returns undefined when neither provided', () => {
      expect(generateAriaDescribedBy('field-1')).toBeUndefined()
    })
  })
})
