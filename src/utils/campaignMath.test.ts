import { describe, it, expect } from 'vitest'
import {
  calculateCampaignProgress,
  calculateRemainingBalance,
  calculateDonorAverage,
  calculateFundingVelocity,
  formatCurrency,
  getGoalStatusBadge,
} from './campaignMath'

describe('Campaign Goal Progress & Analytics Engine', () => {
  describe('calculateCampaignProgress', () => {
    it('calculates exact progress percentage for standard campaigns', () => {
      expect(calculateCampaignProgress(5000, 10000)).toBe(50.0)
      expect(calculateCampaignProgress(7500, 10000)).toBe(75.0)
      expect(calculateCampaignProgress(10000, 10000)).toBe(100.0)
    })

    it('calculates decimal percentages accurately with custom decimal places', () => {
      expect(calculateCampaignProgress(1, 3, { decimalPlaces: 1 })).toBe(33.3)
      expect(calculateCampaignProgress(1, 3, { decimalPlaces: 2 })).toBe(33.33)
      expect(calculateCampaignProgress(1, 3, { decimalPlaces: 0 })).toBe(33)
    })

    it('handles overfunded campaigns without capping by default', () => {
      expect(calculateCampaignProgress(15000, 10000)).toBe(150.0)
      expect(calculateCampaignProgress(25000, 10000)).toBe(250.0)
    })

    it('caps progress at 100% when capAt100 option is enabled', () => {
      expect(calculateCampaignProgress(15000, 10000, { capAt100: true })).toBe(100.0)
      expect(calculateCampaignProgress(5000, 10000, { capAt100: true })).toBe(50.0)
    })

    it('prevents division by zero when goal is 0 or negative', () => {
      expect(calculateCampaignProgress(500, 0)).toBe(0)
      expect(calculateCampaignProgress(500, -1000)).toBe(0)
      expect(calculateCampaignProgress(500, NaN)).toBe(0)
    })

    it('handles negative or NaN raised amounts safely', () => {
      expect(calculateCampaignProgress(-500, 10000)).toBe(0)
      expect(calculateCampaignProgress(NaN, 10000)).toBe(0)
    })
  })

  describe('calculateRemainingBalance', () => {
    it('calculates remaining balance accurately', () => {
      expect(calculateRemainingBalance(4000, 10000)).toBe(6000)
      expect(calculateRemainingBalance(9999.50, 10000)).toBe(0.50)
    })

    it('returns 0 when goal is fully funded or exceeded', () => {
      expect(calculateRemainingBalance(10000, 10000)).toBe(0)
      expect(calculateRemainingBalance(15000, 10000)).toBe(0)
    })

    it('handles invalid goals or negative raised amounts', () => {
      expect(calculateRemainingBalance(500, 0)).toBe(0)
      expect(calculateRemainingBalance(-500, 1000)).toBe(1000)
    })
  })

  describe('calculateDonorAverage', () => {
    it('calculates average donation accurately', () => {
      expect(calculateDonorAverage(1000, 10)).toBe(100)
      expect(calculateDonorAverage(500, 3)).toBe(166.67)
    })

    it('prevents division by zero when donorCount is 0 or negative', () => {
      expect(calculateDonorAverage(1000, 0)).toBe(0)
      expect(calculateDonorAverage(1000, -5)).toBe(0)
    })

    it('returns 0 when total raised is 0 or negative', () => {
      expect(calculateDonorAverage(0, 50)).toBe(0)
      expect(calculateDonorAverage(-100, 50)).toBe(0)
    })
  })

  describe('calculateFundingVelocity', () => {
    const mockDonations = [
      { amount: 100, date: '2026-06-01' },
      { amount: 200, date: '2026-06-05' },
      { amount: 300, date: '2026-06-10' },
    ] // Total 600 in 30 days window -> 20/day

    it('calculates daily average and projected days to goal', () => {
      const res = calculateFundingVelocity(mockDonations, 1000, 600, 30)
      expect(res.dailyAverage).toBe(20)
      expect(res.weeklyPace).toBe(140)
      // Remaining = 400. 400 / 20 = 20 days
      expect(res.projectedDaysToGoal).toBe(20)
      expect(res.estimatedCompletionDate).not.toBeNull()
    })

    it('returns 0 days when goal is already fully raised', () => {
      const res = calculateFundingVelocity(mockDonations, 500, 600, 30)
      expect(res.projectedDaysToGoal).toBe(0)
    })

    it('handles empty donations list gracefully', () => {
      const res = calculateFundingVelocity([], 1000, 0, 30)
      expect(res.dailyAverage).toBe(0)
      expect(res.projectedDaysToGoal).toBeNull()
      expect(res.estimatedCompletionDate).toBeNull()
    })
  })

  describe('formatCurrency', () => {
    it('formats USD currency correctly', () => {
      expect(formatCurrency(50)).toBe('$50')
      expect(formatCurrency(1250.50)).toBe('$1,250.50')
      expect(formatCurrency(0)).toBe('$0')
    })

    it('formats alternative currencies like EUR and KES', () => {
      expect(formatCurrency(100, 'EUR', 'en-US')).toBe('€100')
      expect(formatCurrency(5000, 'KES', 'en-KE')).toContain('5,000')
    })
  })

  describe('getGoalStatusBadge', () => {
    it('returns funded badge when progress is 100% or greater', () => {
      const badge = getGoalStatusBadge(12000, 10000)
      expect(badge.status).toBe('funded')
      expect(badge.label).toContain('Goal Achieved')
    })

    it('returns near_goal badge when progress is 85% to 99%', () => {
      const badge = getGoalStatusBadge(9000, 10000)
      expect(badge.status).toBe('near_goal')
      expect(badge.label).toBe('Almost Funded')
    })

    it('returns on_track badge when progress is 40% to 84%', () => {
      const badge = getGoalStatusBadge(5000, 10000)
      expect(badge.status).toBe('on_track')
      expect(badge.label).toBe('On Track')
    })

    it('returns urgent badge when progress is below 40%', () => {
      const badge = getGoalStatusBadge(2000, 10000)
      expect(badge.status).toBe('urgent')
      expect(badge.label).toBe('Needs Support')
    })

    it('returns expired badge when deadline has passed and goal is not met', () => {
      const pastDate = '2020-01-01'
      const badge = getGoalStatusBadge(3000, 10000, pastDate)
      expect(badge.status).toBe('expired')
      expect(badge.label).toBe('Campaign Ended')
    })
  })
})
