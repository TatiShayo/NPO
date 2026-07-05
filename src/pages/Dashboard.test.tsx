import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, beforeEach, describe, it, expect } from 'vitest'
import Dashboard from './Dashboard'

const mockDonations = [
  {
    id: 1,
    name: 'Alice',
    location: 'Dallas, TX',
    amount: '$100',
    amountNum: 100,
    type: 'one-time',
    time: '3 mins ago',
    initials: 'A',
    gradient: 'linear-gradient(135deg, #2ECC71, #0E6BA8)',
    date: '2026-06-25',
    project: 'Water Projects'
  },
  {
    id: 2,
    name: 'Bob',
    location: 'Nairobi, KE',
    amount: '$50/month',
    amountNum: 50,
    type: 'monthly',
    time: '1 hour ago',
    initials: 'B',
    gradient: 'linear-gradient(135deg, #2ECC71, #0E6BA8)',
    date: '2026-06-26',
    status: 'active',
    project: 'Schools & Sanitation'
  },
  {
    id: 3,
    name: 'Charlie',
    location: 'London, UK',
    amount: '$25/month',
    amountNum: 25,
    type: 'monthly',
    time: '1 day ago',
    initials: 'C',
    gradient: 'linear-gradient(135deg, #2ECC71, #0E6BA8)',
    date: '2026-06-27',
    status: 'paused',
    project: 'Sustainable Agriculture'
  },
  {
    id: 4,
    name: 'David',
    location: 'Tokyo, JP',
    amount: '$30/month',
    amountNum: 30,
    type: 'monthly',
    time: '2 days ago',
    initials: 'D',
    gradient: 'linear-gradient(135deg, #2ECC71, #0E6BA8)',
    date: '2026-06-28',
    status: 'cancelled',
    project: 'Community Health'
  }
]

describe('Dashboard Page - Analytics & Subscription Management', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('initializes with default donor feed if localStorage is empty', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    // Should display stats
    expect(screen.getByText('Donation Analytics Dashboard')).toBeInTheDocument()
    expect(localStorage.getItem('npo_donations')).not.toBeNull()
  })

  it('calculates summary stats correctly based on seeded localStorage data', () => {
    localStorage.setItem('npo_donations', JSON.stringify(mockDonations))

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    // Calculations based on mockDonations:
    // Total (excludes cancelled: 100 + 50 + 25 = 175)
    // Count (total array length = 4)
    // Average (rounded total / count = 175 / 4 = 44)
    // Active Monthly Supporters (type === 'monthly' && status === 'active' -> Bob = 1)
    
    expect(screen.getByText('$175')).toBeInTheDocument() // Total
    expect(screen.getByText('4')).toBeInTheDocument() // Total Contributions
    expect(screen.getByText('$44')).toBeInTheDocument() // Average
    expect(screen.getByText('1')).toBeInTheDocument() // Active Monthly Supporters
  })

  it('renders charts without displaying "No data available" when data is present', () => {
    localStorage.setItem('npo_donations', JSON.stringify(mockDonations))

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    expect(screen.getByText('Donations Over Time ($)')).toBeInTheDocument()
    expect(screen.getByText('Donations by Project Category ($)')).toBeInTheDocument()
    expect(screen.queryByText('No data available')).not.toBeInTheDocument()
  })

  it('pauses, cancels, and resumes/reactivates monthly subscriptions and updates localStorage', () => {
    localStorage.setItem('npo_donations', JSON.stringify(mockDonations))

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    // 1. Pause Bob's active subscription (id: 2)
    const bobRow = screen.getByText('Bob').closest('tr')!
    const pauseBtn = within(bobRow).getByRole('button', { name: /Pause/i })
    fireEvent.click(pauseBtn)

    // Verify Bob's status is updated to Paused in UI and localStorage
    expect(within(bobRow).getByText('Paused')).toBeInTheDocument()
    
    let donations = JSON.parse(localStorage.getItem('npo_donations')!)
    let bob = donations.find((d: any) => d.name === 'Bob')
    expect(bob.status).toBe('paused')

    // 2. Resume Bob's paused subscription
    const resumeBtn = within(bobRow).getByRole('button', { name: /Resume/i })
    fireEvent.click(resumeBtn)
    expect(within(bobRow).getByText('Active')).toBeInTheDocument()

    donations = JSON.parse(localStorage.getItem('npo_donations')!)
    bob = donations.find((d: any) => d.name === 'Bob')
    expect(bob.status).toBe('active')

    // 3. Cancel Bob's subscription
    const cancelBtn = within(bobRow).getByRole('button', { name: /Cancel/i })
    fireEvent.click(cancelBtn)
    expect(within(bobRow).getByText('Cancelled')).toBeInTheDocument()

    donations = JSON.parse(localStorage.getItem('npo_donations')!)
    bob = donations.find((d: any) => d.name === 'Bob')
    expect(bob.status).toBe('cancelled')

    // Bob is now cancelled, so total should update (175 - 50 = 125)
    // Wait, the stats calculation should recalculate upon change in donations state:
    expect(screen.getByText('$125')).toBeInTheDocument()

    // 4. Reactivate David's cancelled subscription (id: 4)
    const davidRow = screen.getByText('David').closest('tr')!
    const reactivateBtn = within(davidRow).getByRole('button', { name: /Reactivate/i })
    fireEvent.click(reactivateBtn)
    expect(within(davidRow).getByText('Active')).toBeInTheDocument()

    donations = JSON.parse(localStorage.getItem('npo_donations')!)
    const david = donations.find((d: any) => d.name === 'David')
    expect(david.status).toBe('active')

    // David is now active, so total should update (125 + 30 = 155)
    expect(screen.getByText('$155')).toBeInTheDocument()
  })
})
