import { describe, it, expect } from 'vitest'
import { sanitizeText, sanitizeUrl, anonymizeDonor } from './sanitization'

describe('Input Sanitization & Privacy Anonymization Engine', () => {
  describe('sanitizeText', () => {
    it('strips malicious <script> tags and contents', () => {
      const malicious = 'Hello <script>alert("XSS Attack!");</script> AquaHope!'
      expect(sanitizeText(malicious)).toBe('Hello  AquaHope!')
    })

    it('strips nested or uppercase script tags', () => {
      const malicious = '<SCRIPT src="http://evil.com/xss.js"></SCRIPT>Safe text'
      expect(sanitizeText(malicious)).toBe('Safe text')
    })

    it('strips dangerous iframe, embed, object tags', () => {
      const malicious = 'Text <iframe src="evil.com"></iframe><embed src="malware.swf"></embed>'
      expect(sanitizeText(malicious)).toBe('Text')
    })

    it('strips generic HTML tags but preserves text content', () => {
      const input = '<p>Clean water <strong>transforms</strong> lives.</p>'
      expect(sanitizeText(input)).toBe('Clean water transforms lives.')
    })

    it('preserves natural ampersands (&) and quotes without producing double HTML entity escaping', () => {
      const text = 'Water & Sanitation Foundation "AquaHope"'
      expect(sanitizeText(text)).toBe('Water & Sanitation Foundation "AquaHope"')
    })

    it('strips null bytes and non-printable control characters', () => {
      const dirty = 'Safe\x00\x08Text\x1F'
      expect(sanitizeText(dirty)).toBe('SafeText')
    })

    it('handles null, undefined, numbers gracefully', () => {
      expect(sanitizeText(null)).toBe('')
      expect(sanitizeText(undefined)).toBe('')
      expect(sanitizeText(12345 as any)).toBe('12345')
    })
  })

  describe('sanitizeUrl', () => {
    it('allows valid safe HTTP and HTTPS URLs', () => {
      expect(sanitizeUrl('https://aquahope.org/projects')).toBe('https://aquahope.org/projects')
      expect(sanitizeUrl('http://example.com')).toBe('http://example.com')
    })

    it('allows mailto, tel, relative, and anchor links', () => {
      expect(sanitizeUrl('mailto:hello@aquahope.org')).toBe('mailto:hello@aquahope.org')
      expect(sanitizeUrl('tel:+254700000000')).toBe('tel:+254700000000')
      expect(sanitizeUrl('/donate')).toBe('/donate')
      expect(sanitizeUrl('#hero')).toBe('#hero')
    })

    it('blocks dangerous javascript: and data: URLs', () => {
      expect(sanitizeUrl('javascript:alert(document.cookie)')).toBe('#')
      expect(sanitizeUrl('javascript :alert(1)')).toBe('#')
      expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBe('#')
      expect(sanitizeUrl('vbscript:msgbox(1)')).toBe('#')
    })

    it('handles null, undefined or empty strings', () => {
      expect(sanitizeUrl('')).toBe('#')
      expect(sanitizeUrl(null)).toBe('#')
      expect(sanitizeUrl(undefined)).toBe('#')
    })
  })

  describe('anonymizeDonor', () => {
    const donor = {
      name: 'Sarah Miller',
      location: 'Austin, TX',
      amount: '$100',
    }

    it('preserves public information when preference is public', () => {
      const res = anonymizeDonor(donor, 'public')
      expect(res.displayName).toBe('Sarah Miller')
      expect(res.displayLocation).toBe('Austin, TX')
      expect(res.displayAmount).toBe('$100')
      expect(res.initials).toBe('SM')
      expect(res.isAnonymous).toBe(false)
    })

    it('masks identity completely when preference is anonymous', () => {
      const res = anonymizeDonor(donor, 'anonymous')
      expect(res.displayName).toBe('Anonymous Donor')
      expect(res.displayLocation).toBe('')
      expect(res.displayAmount).toBe('$100')
      expect(res.initials).toBe('A')
      expect(res.isAnonymous).toBe(true)
    })

    it('formats initials only when preference is initials_only', () => {
      const res = anonymizeDonor(donor, 'initials_only')
      expect(res.displayName).toBe('S.M.')
      expect(res.displayLocation).toBe('Austin, TX')
      expect(res.initials).toBe('SM')
    })

    it('formats single name initials properly (e.g. David -> D.)', () => {
      const singleNameDonor = { name: 'David', location: 'London', amount: '$50' }
      const res = anonymizeDonor(singleNameDonor, 'initials_only')
      expect(res.displayName).toBe('D.')
      expect(res.initials).toBe('D')
    })

    it('hides location when preference is hide_location', () => {
      const res = anonymizeDonor(donor, 'hide_location')
      expect(res.displayName).toBe('Sarah Miller')
      expect(res.displayLocation).toBe('')
    })

    it('masks amount when preference is hide_amount', () => {
      const res = anonymizeDonor(donor, 'hide_amount')
      expect(res.displayAmount).toBe('Generous Supporter')
      expect(res.displayName).toBe('Sarah Miller')
    })

    it('handles empty donor names safely', () => {
      const emptyDonor = { name: '', location: '', amount: '$25' }
      const res = anonymizeDonor(emptyDonor, 'public')
      expect(res.displayName).toBe('Anonymous')
      expect(res.initials).toBe('A')
    })
  })
})
