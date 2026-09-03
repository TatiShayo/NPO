import { describe, it, expect } from 'vitest'
import {
  calculateGiftAid,
  calculateProcessingFee,
  calculateRecurringSchedule,
  sanitizeDonationAmount,
  calculateDonorImpactBreakdown,
} from './donationMath'

describe('Donation Math & Calculation Engine', () => {
  describe('calculateGiftAid', () => {
    it('calculates standard 25% Gift Aid on integer amounts when eligible', () => {
      const res = calculateGiftAid(100, true)
      expect(res.giftAidAmount).toBe(25)
      expect(res.totalWithGiftAid).toBe(125)
      expect(res.isEligible).toBe(true)
      expect(res.taxUpliftRate).toBe(0.25)
    })

    it('calculates 25% Gift Aid on decimal amounts with accurate rounding', () => {
      const res = calculateGiftAid(33.33, true)
      // 33.33 * 0.25 = 8.3325 -> 8.33
      expect(res.giftAidAmount).toBe(8.33)
      expect(res.totalWithGiftAid).toBe(41.66)
    })

    it('calculates Gift Aid on small amounts ($1.00, $0.50)', () => {
      const res1 = calculateGiftAid(1.0, true)
      expect(res1.giftAidAmount).toBe(0.25)
      expect(res1.totalWithGiftAid).toBe(1.25)

      const res2 = calculateGiftAid(0.5, true)
      expect(res2.giftAidAmount).toBe(0.13)
      expect(res2.totalWithGiftAid).toBe(0.63)
    })

    it('returns 0 Gift Aid when donor is not eligible', () => {
      const res = calculateGiftAid(100, false)
      expect(res.giftAidAmount).toBe(0)
      expect(res.totalWithGiftAid).toBe(100)
      expect(res.isEligible).toBe(false)
    })

    it('handles zero or negative amounts gracefully', () => {
      const resZero = calculateGiftAid(0, true)
      expect(resZero.giftAidAmount).toBe(0)
      expect(resZero.totalWithGiftAid).toBe(0)

      const resNegative = calculateGiftAid(-50, true)
      expect(resNegative.giftAidAmount).toBe(0)
      expect(resNegative.totalWithGiftAid).toBe(0)
    })

    it('handles NaN and undefined inputs gracefully', () => {
      const resNaN = calculateGiftAid(NaN, true)
      expect(resNaN.giftAidAmount).toBe(0)
      expect(resNaN.totalWithGiftAid).toBe(0)
    })

    it('supports custom tax uplift rates', () => {
      const res = calculateGiftAid(100, true, 0.3) // 30% rate
      expect(res.giftAidAmount).toBe(30)
      expect(res.totalWithGiftAid).toBe(130)
      expect(res.taxUpliftRate).toBe(0.3)
    })
  })

  describe('calculateProcessingFee', () => {
    it('calculates standard 2.9% + $0.30 processing fee', () => {
      const res = calculateProcessingFee(100)
      // 100 * 0.029 + 0.30 = 2.90 + 0.30 = 3.20
      expect(res.principalAmount).toBe(100)
      expect(res.processingFee).toBe(3.20)
      expect(res.netReceivedByCharity).toBe(96.80)
    })

    it('calculates the exact gross amount when donor opts to cover fees', () => {
      const res = calculateProcessingFee(100)
      // (100 + 0.30) / (1 - 0.029) = 100.30 / 0.971 = 103.29557... -> 103.30
      expect(res.coveredTotalAmount).toBe(103.30)

      // Verify that after taking 2.9% + 0.30 from 103.30, charity receives approx 100
      const feeOnCovered = 103.30 * 0.029 + 0.30 // 2.9957 + 0.30 = 3.2957
      const netOnCovered = 103.30 - feeOnCovered
      expect(Math.round(netOnCovered)).toBe(100)
    })

    it('handles small donation fee calculations ($10, $25)', () => {
      const res = calculateProcessingFee(25)
      // 25 * 0.029 + 0.30 = 0.725 + 0.30 = 1.025 -> 1.03
      expect(res.processingFee).toBe(1.03)
      expect(res.netReceivedByCharity).toBe(23.97)
    })

    it('handles zero or negative amounts', () => {
      const resZero = calculateProcessingFee(0)
      expect(resZero.principalAmount).toBe(0)
      expect(resZero.processingFee).toBe(0)
      expect(resZero.netReceivedByCharity).toBe(0)
      expect(resZero.coveredTotalAmount).toBe(0)

      const resNeg = calculateProcessingFee(-50)
      expect(resNeg.principalAmount).toBe(0)
      expect(resNeg.processingFee).toBe(0)
    })

    it('supports custom fee percentage and fixed fee', () => {
      const res = calculateProcessingFee(100, 0.015, 0.20) // 1.5% + $0.20
      expect(res.processingFee).toBe(1.70)
      expect(res.netReceivedByCharity).toBe(98.30)
    })
  })

  describe('calculateRecurringSchedule', () => {
    it('calculates monthly donation schedule correctly', () => {
      const startDate = new Date('2026-01-15T00:00:00Z')
      const res = calculateRecurringSchedule(50, 'monthly', startDate)

      expect(res.baseAmount).toBe(50)
      expect(res.monthlyEquivalent).toBe(50)
      expect(res.annualEquivalent).toBe(600)
      expect(res.fiveYearProjectedImpact).toBe(3000)
      expect(res.nextBillingDate).toBe('2026-02-15')
    })

    it('calculates quarterly donation schedule correctly', () => {
      const startDate = new Date('2026-01-01T00:00:00Z')
      const res = calculateRecurringSchedule(150, 'quarterly', startDate)

      expect(res.baseAmount).toBe(150)
      expect(res.monthlyEquivalent).toBe(50)
      expect(res.annualEquivalent).toBe(600)
      expect(res.fiveYearProjectedImpact).toBe(3000)
      expect(res.nextBillingDate).toBe('2026-04-01')
    })

    it('calculates annual donation schedule correctly', () => {
      const startDate = new Date('2026-06-01T00:00:00Z')
      const res = calculateRecurringSchedule(1200, 'annual', startDate)

      expect(res.baseAmount).toBe(1200)
      expect(res.monthlyEquivalent).toBe(100)
      expect(res.annualEquivalent).toBe(1200)
      expect(res.fiveYearProjectedImpact).toBe(6000)
      expect(res.nextBillingDate).toBe('2027-06-01')
    })

    it('calculates one-time donation equivalents', () => {
      const res = calculateRecurringSchedule(120, 'one-time')
      expect(res.baseAmount).toBe(120)
      expect(res.monthlyEquivalent).toBe(10)
      expect(res.annualEquivalent).toBe(120)
      expect(res.fiveYearProjectedImpact).toBe(120)
      expect(res.nextBillingDate).toBe('N/A')
    })
  })

  describe('sanitizeDonationAmount', () => {
    it('accepts valid integer and decimal numbers', () => {
      expect(sanitizeDonationAmount(50)).toEqual({ valid: true, amount: 50 })
      expect(sanitizeDonationAmount(99.99)).toEqual({ valid: true, amount: 99.99 })
      expect(sanitizeDonationAmount('250')).toEqual({ valid: true, amount: 250 })
      expect(sanitizeDonationAmount('$1,500.50')).toEqual({ valid: true, amount: 1500.50 })
    })

    it('rounds amounts with more than 2 decimal places', () => {
      expect(sanitizeDonationAmount(49.999)).toEqual({ valid: true, amount: 50.00 })
      expect(sanitizeDonationAmount(12.3456)).toEqual({ valid: true, amount: 12.35 })
    })

    it('rejects amounts below minimum', () => {
      const res = sanitizeDonationAmount(0.5, 1)
      expect(res.valid).toBe(false)
      expect(res.error).toBe('Minimum donation amount is $1.')
    })

    it('rejects amounts above maximum', () => {
      const res = sanitizeDonationAmount(200000, 1, 100000)
      expect(res.valid).toBe(false)
      expect(res.error).toBe('Maximum single online donation amount is $100,000.')
    })

    it('rejects empty, null, undefined or non-numeric strings', () => {
      expect(sanitizeDonationAmount('')).toEqual({ valid: false, amount: 0, error: 'Donation amount is required.' })
      expect(sanitizeDonationAmount(null)).toEqual({ valid: false, amount: 0, error: 'Donation amount is required.' })
      expect(sanitizeDonationAmount('abc')).toEqual({ valid: false, amount: 0, error: 'Please enter a valid numeric amount.' })
    })
  })

  describe('calculateDonorImpactBreakdown', () => {
    it('accurately divides donation into 85% programmes, 10% operations, 5% admin', () => {
      const breakdown = calculateDonorImpactBreakdown(100)
      expect(breakdown.programmesAmount).toBe(85)
      expect(breakdown.operationsAmount).toBe(10)
      expect(breakdown.adminAmount).toBe(5)
      expect(breakdown.total).toBe(100)
    })

    it('maintains exact sum equality without penny rounding loss on non-round numbers', () => {
      const breakdown = calculateDonorImpactBreakdown(33.33)
      const sum = breakdown.programmesAmount + breakdown.operationsAmount + breakdown.adminAmount
      expect(Number(sum.toFixed(2))).toBe(33.33)
    })
  })
})
