// ============================================
// Receipt & Invoice Generation Engine
// Generates verifiable sequential receipts with tax deductibility metadata
// ============================================

export interface DonationReceiptInput {
  id: string | number
  donorName: string
  donorEmail?: string
  donorAddress?: string
  amount: number
  currency?: string
  date?: string
  paymentMethod?: 'credit_card' | 'mpesa' | 'bank_transfer' | 'paypal' | string
  transactionId?: string
  isGiftAidClaimed?: boolean
  giftAidAmount?: number
  taxDeductiblePercent?: number
  project?: string
  sequenceNumber?: number
}

export interface ReceiptDocument {
  receiptNumber: string
  organization: {
    name: string
    registrationNumber: string
    taxId: string
    address: string
    email: string
    website: string
  }
  issueDate: string
  donor: {
    name: string
    email: string
    address: string
  }
  payment: {
    amount: number
    currency: string
    formattedAmount: string
    method: string
    transactionId: string
    date: string
  }
  tax: {
    isTaxDeductible: boolean
    taxDeductibleAmount: number
    taxDeductiblePercent: number
    isGiftAidClaimed: boolean
    giftAidAmount: number
    legalDisclaimer: string
  }
  allocation: {
    project: string
    programmesAmount: number // 85%
    operationsAmount: number // 10%
    adminAmount: number      // 5%
  }
}

/**
 * Generates sequential formatted receipt numbers (e.g. `AQH-202608-00042`).
 */
export function generateReceiptNumber(date: Date = new Date(), sequence: number = 1): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const seq = String(Math.max(1, sequence)).padStart(6, '0')
  return `AQH-${year}${month}-${seq}`
}

/**
 * Validates format of an AquaHope receipt number.
 */
export function validateReceiptNumber(receiptNumber: string | null | undefined): boolean {
  if (!receiptNumber || typeof receiptNumber !== 'string') return false
  return /^AQH-\d{6}-\d{6}$/.test(receiptNumber.trim())
}

/**
 * Generates an official donation receipt document.
 */
export function generateDonationReceipt(input: DonationReceiptInput): ReceiptDocument {
  const issueDateObj = input.date ? new Date(input.date) : new Date()
  const validDate = isNaN(issueDateObj.getTime()) ? new Date() : issueDateObj

  const currency = input.currency || 'USD'
  const amount = Math.max(0, isNaN(input.amount) ? 0 : Number(input.amount.toFixed(2)))
  const formattedAmount = `${currency} $${amount.toFixed(2)}`

  const seq = input.sequenceNumber || (typeof input.id === 'number' ? input.id % 1000000 : 1)
  const receiptNumber = generateReceiptNumber(validDate, seq)

  const taxPercent = input.taxDeductiblePercent !== undefined ? input.taxDeductiblePercent : 100
  const taxDeductibleAmount = Number(((amount * taxPercent) / 100).toFixed(2))

  const isGiftAid = Boolean(input.isGiftAidClaimed)
  const giftAidAmount = isGiftAid
    ? Number((input.giftAidAmount !== undefined ? input.giftAidAmount : amount * 0.25).toFixed(2))
    : 0

  const programmesAmount = Number((amount * 0.85).toFixed(2))
  const operationsAmount = Number((amount * 0.10).toFixed(2))
  const adminAmount = Number((amount - programmesAmount - operationsAmount).toFixed(2))

  return {
    receiptNumber,
    organization: {
      name: 'AquaHope Foundation',
      registrationNumber: 'NGO-REG-2018-09418',
      taxId: 'EIN-83-9281742',
      address: 'P.O. Box 00000, Nairobi, Kenya / 500 Global Way, Austin, TX 78701',
      email: 'giving@aquahope.org',
      website: 'https://aquahope.org',
    },
    issueDate: validDate.toISOString().split('T')[0],
    donor: {
      name: input.donorName || 'Anonymous Donor',
      email: input.donorEmail || 'unspecified@donor.org',
      address: input.donorAddress || 'Online Donation',
    },
    payment: {
      amount,
      currency,
      formattedAmount,
      method: input.paymentMethod || 'Credit Card (Pesapal)',
      transactionId: input.transactionId || `TXN-${Date.now()}`,
      date: validDate.toISOString().split('T')[0],
    },
    tax: {
      isTaxDeductible: taxDeductibleAmount > 0,
      taxDeductibleAmount,
      taxDeductiblePercent: taxPercent,
      isGiftAidClaimed: isGiftAid,
      giftAidAmount,
      legalDisclaimer:
        'No goods or services were provided in exchange for this charitable contribution other than intangible religious or charitable benefits. AquaHope Foundation is a registered NGO with 501(c)(3) fiscal sponsorship.',
    },
    allocation: {
      project: input.project || 'General Clean Water & Empowerment Fund',
      programmesAmount,
      operationsAmount,
      adminAmount,
    },
  }
}

/**
 * Formats receipt document as clean plain-text suitable for email or text receipt display.
 */
export function formatReceiptAsText(receipt: ReceiptDocument): string {
  return `
============================================================
              OFFICIAL DONATION RECEIPT
               AQUAHOPE FOUNDATION
============================================================
Receipt Number:  ${receipt.receiptNumber}
Issue Date:      ${receipt.issueDate}
Tax ID / EIN:    ${receipt.organization.taxId}
Registration:    ${receipt.organization.registrationNumber}

DONOR DETAILS
------------------------------------------------------------
Donor Name:      ${receipt.donor.name}
Donor Email:     ${receipt.donor.email}

DONATION & PAYMENT SUMMARY
------------------------------------------------------------
Contribution:    ${receipt.payment.formattedAmount}
Payment Method:  ${receipt.payment.method}
Transaction ID:  ${receipt.payment.transactionId}
Designated Fund: ${receipt.allocation.project}

TAX DEDUCTIBILITY & GIFT AID
------------------------------------------------------------
Tax Deductible:  $${receipt.tax.taxDeductibleAmount.toFixed(2)} (${receipt.tax.taxDeductiblePercent}%)
Gift Aid Status: ${receipt.tax.isGiftAidClaimed ? `Claimed (+$${receipt.tax.giftAidAmount.toFixed(2)})` : 'Not Claimed'}

FUNDS ALLOCATION BREAKDOWN (85/10/5 MODEL)
------------------------------------------------------------
Direct Programmes (85%):  $${receipt.allocation.programmesAmount.toFixed(2)}
Operations (10%):        $${receipt.allocation.operationsAmount.toFixed(2)}
Administration (5%):     $${receipt.allocation.adminAmount.toFixed(2)}

${receipt.tax.legalDisclaimer}
============================================================
`.trim()
}
