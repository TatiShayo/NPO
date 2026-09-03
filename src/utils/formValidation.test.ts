import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validatePhone,
  isHoneypotTriggered,
  validateContactForm,
  validateVolunteerForm,
} from './formValidation'

describe('Form Validation & Anti-Spam Utility', () => {
  describe('validateEmail', () => {
    it('accepts valid RFC 5322 email formats', () => {
      expect(validateEmail('donor@example.com').isValid).toBe(true)
      expect(validateEmail('sarah.miller@aquahope.org').isValid).toBe(true)
      expect(validateEmail('user+tag@subdomain.example.co.ke').isValid).toBe(true)
      expect(validateEmail('jane_doe123@charity.net').isValid).toBe(true)
    })

    it('rejects empty or whitespace-only emails', () => {
      expect(validateEmail('').isValid).toBe(false)
      expect(validateEmail('   ').isValid).toBe(false)
      expect(validateEmail(null).isValid).toBe(false)
      expect(validateEmail(undefined).isValid).toBe(false)
    })

    it('rejects emails missing @ or domain', () => {
      expect(validateEmail('invalidemail.com').isValid).toBe(false)
      expect(validateEmail('donor@').isValid).toBe(false)
      expect(validateEmail('@domain.com').isValid).toBe(false)
      expect(validateEmail('donor@localhost').isValid).toBe(false)
    })

    it('rejects emails with invalid consecutive dots or trailing dots', () => {
      expect(validateEmail('donor@domain..com').isValid).toBe(false)
      expect(validateEmail('donor@domain.com.').isValid).toBe(false)
    })

    it('rejects excessively long email addresses (> 254 chars)', () => {
      const longLocal = 'a'.repeat(65)
      expect(validateEmail(`${longLocal}@example.com`).isValid).toBe(false)

      const longDomain = 'a'.repeat(250) + '@example.com'
      expect(validateEmail(longDomain).isValid).toBe(false)
    })
  })

  describe('validatePhone', () => {
    it('accepts and formats Kenyan local phone numbers (07XX / 01XX)', () => {
      const res1 = validatePhone('0712345678')
      expect(res1.isValid).toBe(true)
      expect(res1.formatted).toBe('+254 712 345 678')

      const res2 = validatePhone('0112345678')
      expect(res2.isValid).toBe(true)
      expect(res2.formatted).toBe('+254 112 345 678')
    })

    it('accepts and formats Kenyan international format (+254 / 254)', () => {
      const res1 = validatePhone('+254712345678')
      expect(res1.isValid).toBe(true)
      expect(res1.formatted).toBe('+254 712 345 678')

      const res2 = validatePhone('254712345678')
      expect(res2.isValid).toBe(true)
      expect(res2.formatted).toBe('+254 712 345 678')
    })

    it('accepts international E.164 phone numbers', () => {
      const resUS = validatePhone('+14155552671')
      expect(resUS.isValid).toBe(true)

      const resUK = validatePhone('+442071838750')
      expect(resUK.isValid).toBe(true)
    })

    it('rejects invalid or too short phone numbers', () => {
      expect(validatePhone('').isValid).toBe(false)
      expect(validatePhone('12345').isValid).toBe(false)
      expect(validatePhone('abcdefghij').isValid).toBe(false)
      expect(validatePhone(null).isValid).toBe(false)
    })
  })

  describe('isHoneypotTriggered', () => {
    it('returns false for clean human submissions (empty/undefined honeypot)', () => {
      expect(isHoneypotTriggered('')).toBe(false)
      expect(isHoneypotTriggered(undefined)).toBe(false)
      expect(isHoneypotTriggered(null)).toBe(false)
      expect(isHoneypotTriggered('   ')).toBe(false)
    })

    it('returns true when bot filled the hidden honeypot field', () => {
      expect(isHoneypotTriggered('http://spam-link.com')).toBe(true)
      expect(isHoneypotTriggered('buy cheap pharmaceuticals')).toBe(true)
      expect(isHoneypotTriggered('1')).toBe(true)
    })
  })

  describe('validateContactForm', () => {
    it('validates a complete valid contact form', () => {
      const res = validateContactForm({
        name: 'Jane Doe',
        email: 'jane@example.com',
        subject: 'volunteering',
        message: 'I would like to volunteer as a water engineer with AquaHope.',
        phone: '0712345678',
      })
      expect(res.isValid).toBe(true)
      expect(Object.keys(res.errors).length).toBe(0)
    })

    it('rejects submission when honeypot is triggered', () => {
      const res = validateContactForm({
        name: 'Bot Spammer',
        email: 'spammer@bot.com',
        subject: 'general',
        message: 'Spam message offering illegal services',
        honeypot: 'filled_by_bot',
      })
      expect(res.isValid).toBe(false)
      expect(res.errors.honeypot).toBeDefined()
    })

    it('flags short name, invalid email, missing subject, or short message', () => {
      const res = validateContactForm({
        name: 'A', // Too short
        email: 'invalid-email',
        subject: '',
        message: 'Short', // Less than 10 chars
      })
      expect(res.isValid).toBe(false)
      expect(res.errors.name).toBeDefined()
      expect(res.errors.email).toBeDefined()
      expect(res.errors.subject).toBeDefined()
      expect(res.errors.message).toBeDefined()
    })

    it('flags invalid phone number when provided', () => {
      const res = validateContactForm({
        name: 'John Smith',
        email: 'john@example.com',
        subject: 'general',
        message: 'This is a valid message of appropriate length.',
        phone: 'abc1234',
      })
      expect(res.isValid).toBe(false)
      expect(res.errors.phone).toBeDefined()
    })
  })

  describe('validateVolunteerForm', () => {
    it('validates a complete valid volunteer application', () => {
      const res = validateVolunteerForm({
        fullName: 'Grace Wanjiku',
        email: 'grace@example.com',
        phone: '0722123456',
        location: 'Nairobi',
        interests: ['Water & Sanitation', 'Community Education'],
        availability: 'weekends',
        skills: 'Project management and community outreach',
      })
      expect(res.isValid).toBe(true)
      expect(Object.keys(res.errors).length).toBe(0)
    })

    it('flags missing required fields', () => {
      const res = validateVolunteerForm({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        interests: [],
        availability: '' as any,
        skills: '',
      })
      expect(res.isValid).toBe(false)
      expect(res.errors.fullName).toBeDefined()
      expect(res.errors.email).toBeDefined()
      expect(res.errors.phone).toBeDefined()
      expect(res.errors.location).toBeDefined()
      expect(res.errors.interests).toBeDefined()
      expect(res.errors.availability).toBeDefined()
    })

    it('rejects volunteer submission with honeypot triggered', () => {
      const res = validateVolunteerForm({
        fullName: 'Bot User',
        email: 'bot@spam.com',
        phone: '0712345678',
        location: 'Nowhere',
        interests: ['Water'],
        availability: 'flexible',
        skills: 'None',
        honeypot: 'spambot_123',
      })
      expect(res.isValid).toBe(false)
      expect(res.errors.honeypot).toBeDefined()
    })
  })
})
