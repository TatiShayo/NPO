// ============================================
// Campaign Goal Progress & Analytics Engine
// Handles percentage funded, remaining balance, velocity & progress capping
// ============================================

export interface GoalStatusBadge {
  status: 'funded' | 'near_goal' | 'on_track' | 'urgent' | 'expired'
  percentage: number
  label: string
  color: string
}

export interface FundingVelocityResult {
  dailyAverage: number
  weeklyPace: number
  projectedDaysToGoal: number | null
  estimatedCompletionDate: string | null
}

/**
 * Calculates campaign funding progress percentage.
 * Handles division by zero, negative amounts, precision rounding, and capping.
 */
export function calculateCampaignProgress(
  raised: number,
  goal: number,
  options: { capAt100?: boolean; decimalPlaces?: number } = {}
): number {
  const { capAt100 = false, decimalPlaces = 1 } = options

  if (isNaN(goal) || goal <= 0) {
    return 0
  }

  const cleanRaised = isNaN(raised) ? 0 : Math.max(0, raised)
  const percentage = (cleanRaised / goal) * 100

  const factor = Math.pow(10, decimalPlaces)
  const rounded = Math.round(percentage * factor) / factor

  if (capAt100) {
    return Math.min(100, Math.max(0, rounded))
  }

  return Math.max(0, rounded)
}

/**
 * Calculates remaining balance needed to reach goal.
 */
export function calculateRemainingBalance(raised: number, goal: number): number {
  if (isNaN(goal) || goal <= 0) return 0
  const cleanRaised = isNaN(raised) ? 0 : Math.max(0, raised)
  const remaining = Math.max(0, goal - cleanRaised)
  return Number(remaining.toFixed(2))
}

/**
 * Calculates average donation per donor.
 */
export function calculateDonorAverage(totalRaised: number, donorCount: number): number {
  if (isNaN(donorCount) || donorCount <= 0 || isNaN(totalRaised) || totalRaised <= 0) {
    return 0
  }
  return Number((totalRaised / donorCount).toFixed(2))
}

/**
 * Calculates funding velocity and projected completion timeline.
 */
export function calculateFundingVelocity(
  donations: Array<{ amount: number; date: string }>,
  targetGoal: number,
  totalCurrentlyRaised: number,
  daysWindow: number = 30
): FundingVelocityResult {
  if (!donations || donations.length === 0 || daysWindow <= 0) {
    return {
      dailyAverage: 0,
      weeklyPace: 0,
      projectedDaysToGoal: null,
      estimatedCompletionDate: null,
    }
  }

  const windowRaised = donations.reduce((sum, d) => sum + (d.amount || 0), 0)
  const dailyAverage = Number((windowRaised / daysWindow).toFixed(2))
  const weeklyPace = Number((dailyAverage * 7).toFixed(2))

  const remaining = calculateRemainingBalance(totalCurrentlyRaised, targetGoal)

  if (remaining <= 0) {
    return {
      dailyAverage,
      weeklyPace,
      projectedDaysToGoal: 0,
      estimatedCompletionDate: new Date().toISOString().split('T')[0],
    }
  }

  if (dailyAverage <= 0) {
    return {
      dailyAverage: 0,
      weeklyPace: 0,
      projectedDaysToGoal: null,
      estimatedCompletionDate: null,
    }
  }

  const projectedDays = Math.ceil(remaining / dailyAverage)
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + projectedDays)

  return {
    dailyAverage,
    weeklyPace,
    projectedDaysToGoal: projectedDays,
    estimatedCompletionDate: targetDate.toISOString().split('T')[0],
  }
}

/**
 * Formats a currency amount nicely with symbols and commas.
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  const clean = isNaN(amount) ? 0 : amount
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: clean % 1 === 0 ? 0 : 2,
    }).format(clean)
  } catch (e) {
    return `$${clean.toLocaleString()}`
  }
}

/**
 * Determines badge status based on campaign progress.
 */
export function getGoalStatusBadge(
  raised: number,
  goal: number,
  deadlineDate?: string
): GoalStatusBadge {
  const percentage = calculateCampaignProgress(raised, goal, { capAt100: false })

  if (deadlineDate) {
    const deadline = new Date(deadlineDate)
    if (!isNaN(deadline.getTime()) && deadline.getTime() < Date.now() && percentage < 100) {
      return {
        status: 'expired',
        percentage,
        label: 'Campaign Ended',
        color: '#E74C3C',
      }
    }
  }

  if (percentage >= 100) {
    return {
      status: 'funded',
      percentage,
      label: 'Goal Achieved! 100%+',
      color: '#2ECC71',
    }
  }

  if (percentage >= 85) {
    return {
      status: 'near_goal',
      percentage,
      label: 'Almost Funded',
      color: '#0E6BA8',
    }
  }

  if (percentage >= 40) {
    return {
      status: 'on_track',
      percentage,
      label: 'On Track',
      color: '#36A2EB',
    }
  }

  return {
    status: 'urgent',
    percentage,
    label: 'Needs Support',
    color: '#F39C12',
  }
}
