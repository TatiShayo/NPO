// ============================================
// Donation Math & Calculation Engine
// Provides Gift Aid, fee coverage, recurring math & sanitization
// ============================================

export interface GiftAidCalculation {
  giftAidAmount: number
  totalWithGiftAid: number
  taxUpliftRate: number
  isEligible: boolean
}

export interface FeeCalculation {
  principalAmount: number
  processingFee: number
  netReceivedByCharity: number
  coveredTotalAmount: number
  feePercentage: number
  fixedFee: number
}

export interface RecurringScheduleResult {
  frequency: 'one-time' | 'monthly' | 'quarterly' | 'annual'
  baseAmount: number
  monthlyEquivalent: number
  annualEquivalent: number
  nextBillingDate: string
  fiveYearProjectedImpact: number
}

export interface ImpactBreakdown {
  programmesAmount: number // 85%
  operationsAmount: number // 10%
  adminAmount: number      // 5%
  total: number
}

/**
 * Calculates UK Gift Aid (or 25% tax uplift) on eligible donations.
 * UK Gift Aid allows charities to claim an extra 25p for every £1 donated.
 */
export function calculateGiftAid(
  amount: number,
  isEligible: boolean = true,
  rate: number = 0.25
): GiftAidCalculation {
  if (isNaN(amount) || amount <= 0 || !isEligible) {
    return {
      giftAidAmount: 0,
      totalWithGiftAid: Math.max(0, isNaN(amount) ? 0 : Number(amount.toFixed(2))),
      taxUpliftRate: rate,
      isEligible: Boolean(isEligible),
    }
  }

  const roundedAmount = Number(amount.toFixed(2))
  const rawGiftAid = roundedAmount * rate
  const giftAidAmount = Number(rawGiftAid.toFixed(2))
  const totalWithGiftAid = Number((roundedAmount + giftAidAmount).toFixed(2))

  return {
    giftAidAmount,
    totalWithGiftAid,
    taxUpliftRate: rate,
    isEligible: true,
  }
}

/**
 * Calculates payment gateway transaction fees (e.g. Pesapal / Stripe standard 2.9% + $0.30).
 * Also calculates the exact total amount the donor should pay if they choose to cover fees.
 */
export function calculateProcessingFee(
  amount: number,
  feePercentage: number = 0.029,
  fixedFee: number = 0.30
): FeeCalculation {
  const principal = Math.max(0, isNaN(amount) ? 0 : Number(amount.toFixed(2)))

  if (principal === 0) {
    return {
      principalAmount: 0,
      processingFee: 0,
      netReceivedByCharity: 0,
      coveredTotalAmount: 0,
      feePercentage,
      fixedFee,
    }
  }

  // Standard deduction fee
  const standardFee = Number((principal * feePercentage + fixedFee).toFixed(2))
  const netReceived = Number(Math.max(0, principal - standardFee).toFixed(2))

  // Exact gross amount to charge so charity receives 100% of principal:
  // Gross = (Principal + FixedFee) / (1 - FeePercentage)
  const coveredGross = (principal + fixedFee) / (1 - feePercentage)
  const coveredTotalAmount = Number(coveredGross.toFixed(2))

  return {
    principalAmount: principal,
    processingFee: standardFee,
    netReceivedByCharity: netReceived,
    coveredTotalAmount,
    feePercentage,
    fixedFee,
  }
}

/**
 * Calculates recurring donation equivalents and projected timelines.
 */
export function calculateRecurringSchedule(
  amount: number,
  frequency: 'one-time' | 'monthly' | 'quarterly' | 'annual' = 'monthly',
  startDate: Date = new Date()
): RecurringScheduleResult {
  const cleanAmount = Math.max(0, isNaN(amount) ? 0 : Number(amount.toFixed(2)))

  let monthlyEquivalent = 0
  let annualEquivalent = 0

  switch (frequency) {
    case 'monthly':
      monthlyEquivalent = cleanAmount
      annualEquivalent = Number((cleanAmount * 12).toFixed(2))
      break
    case 'quarterly':
      monthlyEquivalent = Number((cleanAmount / 3).toFixed(2))
      annualEquivalent = Number((cleanAmount * 4).toFixed(2))
      break
    case 'annual':
      monthlyEquivalent = Number((cleanAmount / 12).toFixed(2))
      annualEquivalent = cleanAmount
      break
    case 'one-time':
    default:
      monthlyEquivalent = Number((cleanAmount / 12).toFixed(2))
      annualEquivalent = cleanAmount
      break
  }

  const nextDate = new Date(startDate.getTime())
  if (frequency === 'monthly') {
    nextDate.setMonth(nextDate.getMonth() + 1)
  } else if (frequency === 'quarterly') {
    nextDate.setMonth(nextDate.getMonth() + 3)
  } else if (frequency === 'annual') {
    nextDate.setFullYear(nextDate.getFullYear() + 1)
  }

  const nextBillingDate = frequency === 'one-time'
    ? 'N/A'
    : nextDate.toISOString().split('T')[0]

  const fiveYearMultiplier = frequency === 'one-time' ? 1 : 5
  const fiveYearProjectedImpact = Number((annualEquivalent * fiveYearMultiplier).toFixed(2))

  return {
    frequency,
    baseAmount: cleanAmount,
    monthlyEquivalent,
    annualEquivalent,
    nextBillingDate,
    fiveYearProjectedImpact,
  }
}

/**
 * Sanitizes and validates donation amount input.
 */
export function sanitizeDonationAmount(
  rawAmount: any,
  min: number = 1,
  max: number = 100000
): { valid: boolean; amount: number; error?: string } {
  if (rawAmount === null || rawAmount === undefined || rawAmount === '') {
    return { valid: false, amount: 0, error: 'Donation amount is required.' }
  }

  const parsed = typeof rawAmount === 'number'
    ? rawAmount
    : parseFloat(String(rawAmount).replace(/[^0-9.]/g, ''))

  if (isNaN(parsed) || !isFinite(parsed)) {
    return { valid: false, amount: 0, error: 'Please enter a valid numeric amount.' }
  }

  if (parsed < min) {
    return { valid: false, amount: parsed, error: `Minimum donation amount is $${min}.` }
  }

  if (parsed > max) {
    return { valid: false, amount: parsed, error: `Maximum single online donation amount is $${max.toLocaleString()}.` }
  }

  // Round to 2 decimal places
  const cleanAmount = Number(parsed.toFixed(2))

  return { valid: true, amount: cleanAmount }
}

/**
 * Computes transparent breakdown according to AquaHope 85% / 10% / 5% model.
 */
export function calculateDonorImpactBreakdown(
  amount: number,
  allocations: { programmes: number; operations: number; admin: number } = { programmes: 0.85, operations: 0.10, admin: 0.05 }
): ImpactBreakdown {
  const cleanAmount = Math.max(0, isNaN(amount) ? 0 : Number(amount.toFixed(2)))

  const programmesAmount = Number((cleanAmount * allocations.programmes).toFixed(2))
  const operationsAmount = Number((cleanAmount * allocations.operations).toFixed(2))
  const adminAmount = Number((cleanAmount - programmesAmount - operationsAmount).toFixed(2))

  return {
    programmesAmount,
    operationsAmount,
    adminAmount,
    total: cleanAmount,
  }
}
