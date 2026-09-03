// ============================================
// Accessibility & WCAG Color Contrast Utility
// Provides luminance, contrast ratio calculation & ARIA helpers
// ============================================

/**
 * Converts a hex color string (#RGB or #RRGGBB) to sRGB [r, g, b] array in 0..1 range.
 */
export function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace(/^#/, '').trim()

  if (clean.length === 3) {
    clean = clean.split('').map((char) => char + char).join('')
  }

  if (clean.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(clean)) {
    return [0, 0, 0] // Default to black on invalid
  }

  const r = parseInt(clean.substring(0, 2), 16) / 255
  const g = parseInt(clean.substring(2, 4), 16) / 255
  const b = parseInt(clean.substring(4, 6), 16) / 255

  return [r, g, b]
}

/**
 * Calculates WCAG 2.1 relative luminance for an sRGB component.
 */
function sRgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

/**
 * Calculates WCAG 2.1 relative luminance of a color.
 * L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 */
export function getRelativeLuminance(hexColor: string): number {
  const [r, g, b] = hexToRgb(hexColor)
  const rLinear = sRgbToLinear(r)
  const gLinear = sRgbToLinear(g)
  const bLinear = sRgbToLinear(b)

  const luminance = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
  return Number(luminance.toFixed(4))
}

/**
 * Calculates contrast ratio between two hex colors according to WCAG 2.1.
 * Ratio = (L1 + 0.05) / (L2 + 0.05), where L1 is the lighter color.
 * Returns ratio rounded to 2 decimal places (e.g. 4.50, 7.12, 21.00).
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getRelativeLuminance(hex1)
  const lum2 = getRelativeLuminance(hex2)

  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)

  const ratio = (lighter + 0.05) / (darker + 0.05)
  return Number(ratio.toFixed(2))
}

/**
 * Checks if color combination meets WCAG 2.1 AA level.
 * Regular text requires >= 4.5:1, large text (>= 18pt or >= 14pt bold) requires >= 3.0:1.
 */
export function meetsWcagAA(
  foregroundHex: string,
  backgroundHex: string,
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foregroundHex, backgroundHex)
  const requiredRatio = isLargeText ? 3.0 : 4.5
  return ratio >= requiredRatio
}

/**
 * Checks if color combination meets WCAG 2.1 AAA level.
 * Regular text requires >= 7.0:1, large text requires >= 4.5:1.
 */
export function meetsWcagAAA(
  foregroundHex: string,
  backgroundHex: string,
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foregroundHex, backgroundHex)
  const requiredRatio = isLargeText ? 4.5 : 7.0
  return ratio >= requiredRatio
}

/**
 * Helper to generate accessible aria-describedby IDs.
 */
export function generateAriaDescribedBy(
  fieldId: string,
  errorId?: string,
  hintId?: string
): string | undefined {
  const ids: string[] = []
  if (errorId) ids.push(errorId)
  if (hintId) ids.push(hintId)
  return ids.length > 0 ? ids.join(' ') : undefined
}
