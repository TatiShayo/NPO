// ============================================
// Form Validation & Anti-Spam Utility
// RFC email checking, East African/Intl phone validation, honeypot detection
// ============================================

export interface ValidationResult {
  isValid: boolean
  error?: string
  formatted?: string
}

export interface FormValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

/**
 * Validates email according to RFC 5322 standards.
 * Disallows trailing dots, spaces, invalid domain formats, and excessive lengths.
 */
export function validateEmail(email: string | null | undefined): ValidationResult {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email address is required.' }
  }

  const trimmed = email.trim()

  if (trimmed.length === 0) {
    return { isValid: false, error: 'Email address cannot be empty.' }
  }

  if (trimmed.length > 254) {
    return { isValid: false, error: 'Email address is too long (maximum 254 characters).' }
  }

  // RFC 5322 Compliant Email Regex
  const rfcEmailRegex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

  if (!rfcEmailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address.' }
  }

  // Domain structure checks
  const parts = trimmed.split('@')
  if (parts.length !== 2) {
    return { isValid: false, error: 'Invalid email structure.' }
  }

  const [localPart, domain] = parts
  if (localPart.length > 64) {
    return { isValid: false, error: 'Email username is too long (maximum 64 characters).' }
  }

  if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
    return { isValid: false, error: 'Invalid email domain.' }
  }

  return { isValid: true }
}

/**
 * Validates phone numbers supporting East African (Kenya +254 / 07xx / 01xx) and international E.164.
 */
export function validatePhone(phone: string | null | undefined): ValidationResult {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, error: 'Phone number is required.' }
  }

  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')

  if (cleaned.length === 0) {
    return { isValid: false, error: 'Phone number cannot be empty.' }
  }

  // Kenyan standard: 07XXXXXXXX, 01XXXXXXXX, 2547XXXXXXXX, +2547XXXXXXXX
  const kenyanRegex = /^(?:\+?254|0)?([17]\d{8})$/
  const kenyanMatch = cleaned.match(kenyanRegex)

  if (kenyanMatch) {
    const formatted = `+254 ${kenyanMatch[1].slice(0, 3)} ${kenyanMatch[1].slice(3, 6)} ${kenyanMatch[1].slice(6)}`
    return { isValid: true, formatted }
  }

  // International E.164: + followed by 7 to 15 digits
  const intlRegex = /^\+?[1-9]\d{6,14}$/
  if (intlRegex.test(cleaned)) {
    const formatted = cleaned.startsWith('+') ? cleaned : `+${cleaned}`
    return { isValid: true, formatted }
  }

  return {
    isValid: false,
    error: 'Please enter a valid phone number (e.g. 0712345678 or +254712345678).',
  }
}

/**
 * Checks honeypot field. If non-empty, marks submission as automated bot spam.
 */
export function isHoneypotTriggered(honeypotValue: string | null | undefined): boolean {
  if (honeypotValue === null || honeypotValue === undefined) {
    return false
  }
  return honeypotValue.trim().length > 0
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  phone?: string
  honeypot?: string
}

/**
 * Validates contact form submission.
 */
export function validateContactForm(data: ContactFormData): FormValidationResult {
  const errors: Record<string, string> = {}

  if (isHoneypotTriggered(data.honeypot)) {
    errors.honeypot = 'Automated bot activity detected.'
    return { isValid: false, errors }
  }

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Full name must be at least 2 characters.'
  } else if (data.name.trim().length > 100) {
    errors.name = 'Full name cannot exceed 100 characters.'
  }

  const emailRes = validateEmail(data.email)
  if (!emailRes.isValid) {
    errors.email = emailRes.error || 'Invalid email.'
  }

  if (!data.subject || data.subject.trim().length === 0) {
    errors.subject = 'Please select a subject.'
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long.'
  } else if (data.message.trim().length > 3000) {
    errors.message = 'Message cannot exceed 3000 characters.'
  }

  if (data.phone && data.phone.trim().length > 0) {
    const phoneRes = validatePhone(data.phone)
    if (!phoneRes.isValid) {
      errors.phone = phoneRes.error || 'Invalid phone.'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export interface VolunteerFormData {
  fullName: string
  email: string
  phone: string
  location: string
  interests: string[]
  availability: 'weekdays' | 'weekends' | 'flexible' | 'remote'
  skills: string
  honeypot?: string
}

/**
 * Validates volunteer application form.
 */
export function validateVolunteerForm(data: VolunteerFormData): FormValidationResult {
  const errors: Record<string, string> = {}

  if (isHoneypotTriggered(data.honeypot)) {
    errors.honeypot = 'Automated bot activity detected.'
    return { isValid: false, errors }
  }

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required.'
  }

  const emailRes = validateEmail(data.email)
  if (!emailRes.isValid) {
    errors.email = emailRes.error || 'Invalid email.'
  }

  const phoneRes = validatePhone(data.phone)
  if (!phoneRes.isValid) {
    errors.phone = phoneRes.error || 'Invalid phone.'
  }

  if (!data.location || data.location.trim().length < 2) {
    errors.location = 'Please specify your location or city.'
  }

  if (!data.interests || data.interests.length === 0) {
    errors.interests = 'Please select at least one area of interest.'
  }

  if (!data.availability) {
    errors.availability = 'Please select your availability.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
