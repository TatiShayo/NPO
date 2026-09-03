import { describe, it, expect } from 'vitest'
import {
  generateReceiptNumber,
  validateReceiptNumber,
  generateDonationReceipt,
  formatReceiptAsText,
} from './receiptGenerator'

describe('Receipt & Invoice Generation Engine', () => {
  describe('generateReceiptNumber', () => {
    it('generates a sequential receipt number in standard AQH-YYYYMM-XXXXXX format', () => {
      const fixedDate = new Date('2026-08-14T12:00:00Z')
      const num = generateReceiptNumber(fixedDate, 42)
      expect(num).toBe('AQH-202608-000042')
    })

    it('pads large sequence numbers correctly', () => {
      const fixedDate = new Date('2026-12-25T12:00:00Z')
      const num = generateReceiptNumber(fixedDate, 987654)
      expect(num).toBe('AQH-202612-987654')
    })

    it('handles negative or 0 sequence numbers by defaulting to 1', () => {
      const fixedDate = new Date('2026-01-01T12:00:00Z')
      expect(generateReceiptNumber(fixedDate, 0)).toBe('AQH-202601-000001')
      expect(generateReceiptNumber(fixedDate, -5)).toBe('AQH-202601-000001')
    })
  })

  describe('validateReceiptNumber', () => {
    it('validates authentic AquaHope receipt numbers', () => {
      expect(validateReceiptNumber('AQH-202608-000042')).toBe(true)
      expect(validateReceiptNumber('AQH-202412-123456')).toBe(true)
    })

    it('rejects malformed receipt numbers', () => {
      expect(validateReceiptNumber('INV-202608-000042')).toBe(false)
      expect(validateReceiptNumber('AQH-20268-000042')).toBe(false)
      expect(validateReceiptNumber('AQH-202608-42')).toBe(false)
      expect(validateReceiptNumber('')).toBe(false)
      expect(validateReceiptNumber(null)).toBe(false)
    })
  })

  describe('generateDonationReceipt', () => {
    it('generates a complete official donation receipt document with tax details', () => {
      const receipt = generateDonationReceipt({
        id: 101,
        donorName: 'Alice Johnson',
        donorEmail: 'alice@example.com',
        amount: 250,
        currency: 'USD',
        date: '2026-08-14',
        paymentMethod: 'Credit Card (Pesapal)',
        transactionId: 'TXN-987654321',
        isGiftAidClaimed: false,
        taxDeductiblePercent: 100,
        project: 'Kajiado Borehole Project',
        sequenceNumber: 101,
      })

      expect(receipt.receiptNumber).toBe('AQH-202608-000101')
      expect(receipt.donor.name).toBe('Alice Johnson')
      expect(receipt.donor.email).toBe('alice@example.com')
      expect(receipt.payment.amount).toBe(250)
      expect(receipt.payment.formattedAmount).toBe('USD $250.00')
      expect(receipt.organization.taxId).toBe('EIN-83-9281742')
      expect(receipt.tax.isTaxDeductible).toBe(true)
      expect(receipt.tax.taxDeductibleAmount).toBe(250)
      expect(receipt.tax.isGiftAidClaimed).toBe(false)
      expect(receipt.tax.giftAidAmount).toBe(0)

      // Allocations (85% / 10% / 5%)
      expect(receipt.allocation.programmesAmount).toBe(212.50) // 250 * 0.85
      expect(receipt.allocation.operationsAmount).toBe(25.00)  // 250 * 0.10
      expect(receipt.allocation.adminAmount).toBe(12.50)       // 250 * 0.05
    })

    it('includes Gift Aid uplift calculation when claimed', () => {
      const receipt = generateDonationReceipt({
        id: 102,
        donorName: 'Brian Smith',
        amount: 100,
        isGiftAidClaimed: true,
      })

      expect(receipt.tax.isGiftAidClaimed).toBe(true)
      expect(receipt.tax.giftAidAmount).toBe(25.00)
    })

    it('handles anonymous donations and default fields', () => {
      const receipt = generateDonationReceipt({
        id: 103,
        donorName: '',
        amount: 50,
      })

      expect(receipt.donor.name).toBe('Anonymous Donor')
      expect(receipt.donor.email).toBe('unspecified@donor.org')
      expect(receipt.allocation.project).toContain('General Clean Water')
    })
  })

  describe('formatReceiptAsText', () => {
    it('formats a receipt document into clean printable plain text', () => {
      const receipt = generateDonationReceipt({
        id: 205,
        donorName: 'Dr. John Doe',
        donorEmail: 'john@doe.org',
        amount: 500,
        currency: 'USD',
        date: '2026-08-14',
        paymentMethod: 'Credit Card (Pesapal)',
        transactionId: 'TXN-ABC123XYZ',
        isGiftAidClaimed: true,
      })

      const text = formatReceiptAsText(receipt)

      expect(text).toContain('OFFICIAL DONATION RECEIPT')
      expect(text).toContain('AQUAHOPE FOUNDATION')
      expect(text).toContain('Receipt Number:  AQH-202608-000205')
      expect(text).toContain('Tax ID / EIN:    EIN-83-9281742')
      expect(text).toContain('Donor Name:      Dr. John Doe')
      expect(text).toContain('Contribution:    USD $500.00')
      expect(text).toContain('Gift Aid Status: Claimed (+$125.00)')
      expect(text).toContain('Direct Programmes (85%):  $425.00')
      expect(text).toContain('Operations (10%):        $50.00')
      expect(text).toContain('Administration (5%):     $25.00')
    })
  })
})
