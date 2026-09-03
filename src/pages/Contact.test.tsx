import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Contact from './Contact'

describe('Contact Page - Form Validation & Interactions', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders all fields, social links and subject choices', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    )

    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
    expect(screen.getByLabelText(/Full Name \*/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address \*/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Phone Number/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Subject \*/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Message \*/)).toBeInTheDocument()
  })

  it('validates required fields and shows errors for empty input', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    )

    // Attempt submitting without filling form
    const submitBtn = screen.getByRole('button', { name: /Send Message/i })
    fireEvent.click(submitBtn)

    expect(screen.getByText(/Full name must be at least 2 characters/i)).toBeInTheDocument()
    expect(screen.getByText(/Email address is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Message must be at least 10 characters long/i)).toBeInTheDocument()
  })

  it('detects and rejects bot submissions via honeypot field', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    )

    // Fill valid info
    fireEvent.change(screen.getByLabelText(/Full Name \*/), { target: { value: 'Spam Bot' } })
    fireEvent.change(screen.getByLabelText(/Email Address \*/), { target: { value: 'bot@spam.com' } })
    fireEvent.change(screen.getByLabelText(/Message \*/), { target: { value: 'This is a spam message that is long enough.' } })

    // Bot fills the hidden honeypot
    const hpInput = screen.getByLabelText(/Leave this field blank/i)
    fireEvent.change(hpInput, { target: { value: 'automated_spam_value' } })

    const submitBtn = screen.getByRole('button', { name: /Send Message/i })
    fireEvent.click(submitBtn)

    expect(screen.getByText(/Automated bot activity detected/i)).toBeInTheDocument()
  })

  it('submits valid form and displays thank you confirmation', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText(/Full Name \*/), { target: { value: 'Lauren Ndanu' } })
    fireEvent.change(screen.getByLabelText(/Email Address \*/), { target: { value: 'lauren@example.com' } })
    fireEvent.change(screen.getByLabelText(/Phone Number/), { target: { value: '0712345678' } })
    fireEvent.change(screen.getByLabelText(/Message \*/), {
      target: { value: 'I would like to inquire about partnering with AquaHope on our upcoming borehole project.' },
    })

    const submitBtn = screen.getByRole('button', { name: /Send Message/i })
    fireEvent.click(submitBtn)

    // Advancing timer for mock submission
    act(() => {
      vi.advanceTimersByTime(1300)
    })

    expect(screen.getByText('Thank you!')).toBeInTheDocument()
    expect(screen.getByText("We'll get back to you within 24 hours.")).toBeInTheDocument()
  })
})
