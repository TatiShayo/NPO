import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, beforeEach, afterEach, describe, it, expect } from 'vitest'
import Donate from './Donate'

describe('Donate Page - Sandbox Payment Flow', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    localStorage.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const openCheckoutModal = (donorName = 'Jane Doe', donorEmail = 'jane@example.com') => {
    render(
      <MemoryRouter>
        <Donate />
      </MemoryRouter>
    )

    // Fill in donor information
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: donorName } })
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: donorEmail } })

    // Submit main form to open the checkout modal
    const donateButtons = screen.getAllByRole('button')
    const submitBtn = donateButtons.find((btn) => btn.textContent?.includes('Donate') && btn.tagName === 'BUTTON')
    expect(submitBtn).toBeDefined()
    fireEvent.click(submitBtn!)

    expect(screen.getByText('Pesapal Sandbox Secure Checkout')).toBeInTheDocument()
  }

  it('toggles payment methods (Credit Card vs M-Pesa) inside the checkout modal', () => {
    openCheckoutModal()

    // Default method should be Credit Card
    expect(screen.getByPlaceholderText('4000 1234 5678 9010')).toBeInTheDocument()
    expect(screen.queryByPlaceholderText('0712345678')).not.toBeInTheDocument()

    // Switch to M-Pesa
    fireEvent.click(screen.getByRole('button', { name: /Mobile Money/i }))
    expect(screen.queryByPlaceholderText('4000 1234 5678 9010')).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('0712345678')).toBeInTheDocument()

    // Switch back to Credit Card
    fireEvent.click(screen.getByRole('button', { name: /Credit\/Debit Card/i }))
    expect(screen.getByPlaceholderText('4000 1234 5678 9010')).toBeInTheDocument()
    expect(screen.queryByPlaceholderText('0712345678')).not.toBeInTheDocument()
  })

  describe('Credit Card Form Validation', () => {
    it('shows error if credit card details are empty', () => {
      openCheckoutModal()

      // The cardholder name input gets auto-filled with donor name
      const cardNameInput = screen.getAllByPlaceholderText('Jane Doe')[1] // Second one is cardholder name
      expect(cardNameInput).toHaveValue('Jane Doe')

      // Clear cardholder name
      fireEvent.change(cardNameInput, { target: { value: '' } })

      // Submit form directly to bypass HTML5 required validation
      const form = screen.getByRole('dialog').querySelector('form')!
      fireEvent.submit(form)

      expect(screen.getByText('Please fill in all credit card details.')).toBeInTheDocument()
    })

    it('shows error if card number is not between 13 and 19 digits', () => {
      openCheckoutModal()

      // Fill in remaining fields but short card number
      fireEvent.change(screen.getByPlaceholderText('4000 1234 5678 9010'), { target: { value: '12345' } })
      fireEvent.change(screen.getByPlaceholderText('12/28'), { target: { value: '12/28' } })
      fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } })

      // Click pay (this works since all required fields have values)
      fireEvent.click(screen.getByRole('button', { name: /^Pay \$/i }))

      expect(screen.getByText('Please enter a valid 13 to 19 digit card number.')).toBeInTheDocument()
    })

    it('shows error if CVV is invalid', () => {
      openCheckoutModal()

      // Fill card details with 2-digit CVV
      fireEvent.change(screen.getByPlaceholderText('4000 1234 5678 9010'), { target: { value: '4111222233334444' } })
      fireEvent.change(screen.getByPlaceholderText('12/28'), { target: { value: '12/28' } })
      fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '12' } })

      // Click pay
      fireEvent.click(screen.getByRole('button', { name: /^Pay \$/i }))

      expect(screen.getByText('Please enter a valid CVV.')).toBeInTheDocument()
    })
  })

  describe('M-Pesa Form Validation', () => {
    it('shows error if M-Pesa phone number is empty', () => {
      openCheckoutModal()

      // Switch to M-Pesa
      fireEvent.click(screen.getByRole('button', { name: /Mobile Money/i }))

      // Submit form directly to bypass HTML5 required validation
      const form = screen.getByRole('dialog').querySelector('form')!
      fireEvent.submit(form)

      expect(screen.getByText('Please enter your phone number.')).toBeInTheDocument()
    })

    it('shows error if M-Pesa phone number is invalid format', () => {
      openCheckoutModal()

      // Switch to M-Pesa
      fireEvent.click(screen.getByRole('button', { name: /Mobile Money/i }))

      // Input invalid phone number
      fireEvent.change(screen.getByPlaceholderText('0712345678'), { target: { value: 'abc123' } })

      // Click pay
      fireEvent.click(screen.getByRole('button', { name: /^Pay \$/i }))

      expect(screen.getByText('Please enter a valid phone number.')).toBeInTheDocument()
    })
  })

  describe('State Progression & Simulation Conditions', () => {
    it('runs successful credit card payment flow and stores donation in localStorage', async () => {
      openCheckoutModal('John Doe', 'john@example.com')

      // Fill valid card details (not ending in 4000)
      fireEvent.change(screen.getByPlaceholderText('4000 1234 5678 9010'), { target: { value: '4111222233334444' } })
      fireEvent.change(screen.getByPlaceholderText('12/28'), { target: { value: '12/28' } })
      fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } })

      // Pay
      fireEvent.click(screen.getByRole('button', { name: /^Pay \$/i }))

      // 1. Connecting
      expect(screen.getByText('Connecting to Provider...')).toBeInTheDocument()

      // 2. Verifying
      act(() => {
        vi.advanceTimersByTime(1500)
      })
      expect(screen.getByText('Verifying details...')).toBeInTheDocument()

      // 3. Authenticating
      act(() => {
        vi.advanceTimersByTime(1500)
      })
      expect(screen.getByText('Bank Authentication...')).toBeInTheDocument()

      // 4. Success
      act(() => {
        vi.advanceTimersByTime(1500)
      })
      expect(screen.getByText('Payment Successful!')).toBeInTheDocument()
      expect(screen.getByText(/Thank you, John Doe, for your generous donation of/i)).toBeInTheDocument()

      // Verify localStorage storage
      const storedData = localStorage.getItem('npo_donations')
      expect(storedData).not.toBeNull()
      const donations = JSON.parse(storedData!)
      const latestDonation = donations[0]
      expect(latestDonation.name).toBe('John Doe')
      expect(latestDonation.amountNum).toBe(50)
      expect(latestDonation.status).toBe('active') // Default monthly type
    })

    it('simulates credit card payment failure when card number ends in 4000', async () => {
      openCheckoutModal('John Doe', 'john@example.com')

      // Fill details ending with 4000
      fireEvent.change(screen.getByPlaceholderText('4000 1234 5678 9010'), { target: { value: '4111222233334000' } })
      fireEvent.change(screen.getByPlaceholderText('12/28'), { target: { value: '12/28' } })
      fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } })

      // Pay
      fireEvent.click(screen.getByRole('button', { name: /^Pay \$/i }))

      // Advance timers to trigger the failure state (3 steps * 1500ms)
      act(() => {
        vi.advanceTimersByTime(4500)
      })

      expect(screen.getByText('Payment Failed')).toBeInTheDocument()
      expect(screen.getByText('Simulation Error: Card number ending in 4000 was declined by the issuer.')).toBeInTheDocument()
    })

    it('simulates credit card payment failure when amount is 999', async () => {
      render(
        <MemoryRouter>
          <Donate />
        </MemoryRouter>
      )

      // Enter custom amount of 999
      fireEvent.change(screen.getByLabelText('Custom donation amount'), { target: { value: '999' } })

      // Fill in donor information
      fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Jane Doe' } })
      fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'jane@example.com' } })

      // Submit main form
      const donateButtons = screen.getAllByRole('button')
      const submitBtn = donateButtons.find((btn) => btn.textContent?.includes('Donate') && btn.tagName === 'BUTTON')
      fireEvent.click(submitBtn!)

      // Fill details
      fireEvent.change(screen.getByPlaceholderText('4000 1234 5678 9010'), { target: { value: '4111222233334444' } })
      fireEvent.change(screen.getByPlaceholderText('12/28'), { target: { value: '12/28' } })
      fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } })

      // Pay
      fireEvent.click(screen.getByRole('button', { name: /^Pay \$/i }))

      // Advance timers
      act(() => {
        vi.advanceTimersByTime(4500)
      })

      expect(screen.getByText('Payment Failed')).toBeInTheDocument()
      expect(screen.getByText('Simulation Error: Donation amount of 999 is blocked.')).toBeInTheDocument()
    })

    it('simulates M-Pesa payment failure when phone number ends in 000', async () => {
      openCheckoutModal('Jane Doe', 'jane@example.com')

      // Switch to M-Pesa
      fireEvent.click(screen.getByRole('button', { name: /Mobile Money/i }))

      // Enter phone number ending with 000
      fireEvent.change(screen.getByPlaceholderText('0712345678'), { target: { value: '0712345000' } })

      // Pay
      fireEvent.click(screen.getByRole('button', { name: /^Pay \$/i }))

      // Advance timers
      act(() => {
        vi.advanceTimersByTime(4500)
      })

      expect(screen.getByText('Payment Failed')).toBeInTheDocument()
      expect(screen.getByText('Simulation Error: M-Pesa transaction failed due to subscriber status (phone ending in 000).')).toBeInTheDocument()
    })
  })
})
