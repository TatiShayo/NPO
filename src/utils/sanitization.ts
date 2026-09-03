// ============================================
// Input Sanitization & Privacy Anonymization Engine
// Strips script tags, unsafe protocols, and enforces privacy options
// ============================================

export type PrivacyPreference =
  | 'public'
  | 'anonymous'
  | 'initials_only'
  | 'hide_location'
  | 'hide_amount'

export interface AnonymizedDonorDisplay {
  displayName: string
  displayLocation: string
  displayAmount: string
  initials: string
  isAnonymous: boolean
}

/**
 * Sanitizes plain text input by stripping executable HTML/script tags and control characters,
 * while preserving natural characters like `&` and quotes without producing double HTML entity escapes.
 */
export function sanitizeText(input: string | null | undefined): string {
  if (input === null || input === undefined) {
    return ''
  }

  let text = String(input)

  // Remove null bytes and control chars (except newline and tab)
  text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')

  // Strip script tags and their contents
  text = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Strip iframe, embed, object tags
  text = text.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
  text = text.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
  text = text.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')

  // Strip all HTML tags
  text = text.replace(/<[^>]+>/g, '')

  // Remove javascript: and data: inline expressions
  text = text.replace(/javascript\s*:/gi, '')
  text = text.replace(/vbscript\s*:/gi, '')
  text = text.replace(/data\s*:\s*text\/html/gi, '')

  return text.trim()
}

/**
 * Sanitizes URLs to ensure they only use safe protocols (http, https, mailto, tel).
 */
export function sanitizeUrl(url: string | null | undefined): string {
  if (!url || typeof url !== 'string') return '#'
  const trimmed = url.trim()

  const safeProtocolRegex = /^(https?:\/\/|mailto:|tel:|\/|#)/i
  if (safeProtocolRegex.test(trimmed)) {
    return trimmed
  }

  return '#'
}

/**
 * Applies privacy preference to donor data for public feeds and leaderboards.
 */
export function anonymizeDonor(
  donor: {
    name?: string
    location?: string
    amount?: string | number
  },
  preference: PrivacyPreference = 'public'
): AnonymizedDonorDisplay {
  const rawName = sanitizeText(donor.name) || 'Anonymous'
  const rawLocation = sanitizeText(donor.location)
  const rawAmount = donor.amount !== undefined ? String(donor.amount) : '$0'

  let displayName = rawName
  let displayLocation = rawLocation
  let displayAmount = rawAmount
  let isAnonymous = false

  switch (preference) {
    case 'anonymous':
      displayName = 'Anonymous Donor'
      displayLocation = ''
      isAnonymous = true
      break

    case 'initials_only':
      if (rawName && rawName.toLowerCase() !== 'anonymous') {
        const parts = rawName.split(/\s+/).filter(Boolean)
        if (parts.length === 1) {
          displayName = `${parts[0][0].toUpperCase()}.`
        } else {
          displayName = `${parts[0][0].toUpperCase()}.${parts[parts.length - 1][0].toUpperCase()}.`
        }
      } else {
        displayName = 'Anonymous'
      }
      break

    case 'hide_location':
      displayLocation = ''
      break

    case 'hide_amount':
      displayAmount = 'Generous Supporter'
      break

    case 'public':
    default:
      break
  }

  // Derive display initials
  let initials = 'A'
  if (!isAnonymous && rawName && rawName.toLowerCase() !== 'anonymous' && rawName.toLowerCase() !== 'anonymous donor') {
    const parts = rawName.split(/\s+/).filter(Boolean)
    if (parts.length >= 2) {
      initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    } else if (parts.length === 1 && parts[0].length > 0) {
      initials = parts[0][0].toUpperCase()
    }
  }

  return {
    displayName,
    displayLocation,
    displayAmount,
    initials,
    isAnonymous,
  }
}
