import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import Badge from './Badge'
import Button from './Button'
import Card from './Card'
import Input from './Input'
import Modal from './Modal'
import Accordion from './Accordion'
import ErrorBoundary from './ErrorBoundary'
import ChatWidget from '../layout/ChatWidget'
import ScrollToTop from '../layout/ScrollToTop'

describe('UI Components & Layout Suite', () => {
  describe('Badge Component', () => {
    it('renders badge children with variant class', () => {
      render(<Badge variant="water">Clean Water</Badge>)
      const badge = screen.getByText('Clean Water')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveClass('badge', 'badge-water')
    })

    it('supports custom className and default variant', () => {
      render(<Badge className="custom-badge">Agriculture</Badge>)
      const badge = screen.getByText('Agriculture')
      expect(badge).toHaveClass('badge', 'badge-water', 'custom-badge')
    })
  })

  describe('Button Component', () => {
    it('renders standard button element with type and onClick', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} variant="primary">Click Me</Button>)

      const btn = screen.getByRole('button', { name: 'Click Me' })
      expect(btn).toBeInTheDocument()
      expect(btn).toHaveClass('btn', 'btn-primary')

      fireEvent.click(btn)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('renders React Router Link when "to" prop is passed', () => {
      render(
        <MemoryRouter>
          <Button to="/donate" variant="accent">Donate Now</Button>
        </MemoryRouter>
      )

      const link = screen.getByRole('link', { name: 'Donate Now' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/donate')
    })

    it('renders external <a> anchor when "href" prop is passed', () => {
      render(<Button href="https://example.com" ariaLabel="External site">Visit Us</Button>)

      const anchor = screen.getByLabelText('External site')
      expect(anchor).toBeInTheDocument()
      expect(anchor).toHaveAttribute('href', 'https://example.com')
      expect(anchor).toHaveAttribute('target', '_blank')
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('respects disabled, block, and size props', () => {
      render(<Button disabled block size="large">Disabled Large</Button>)
      const btn = screen.getByRole('button', { name: 'Disabled Large' })
      expect(btn).toBeDisabled()
      expect(btn).toHaveClass('btn-block', 'btn-large')
    })
  })

  describe('Card Component', () => {
    it('renders card with glow effect when enabled', () => {
      render(<Card glow className="custom-card">Card Content</Card>)
      const card = screen.getByText('Card Content')
      expect(card).toHaveClass('card', 'card-glow', 'custom-card')
    })

    it('handles click events on Card', () => {
      const handleClick = vi.fn()
      render(<Card onClick={handleClick}>Interactive Card</Card>)
      fireEvent.click(screen.getByText('Interactive Card'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Input Component', () => {
    it('renders text input with floating label', () => {
      const handleChange = vi.fn()
      render(
        <Input
          label="Full Name"
          name="fullName"
          value="Jane"
          onChange={handleChange}
          required
        />
      )

      const input = screen.getByLabelText(/Full Name \*/)
      expect(input).toBeInTheDocument()
      expect(input).toHaveValue('Jane')

      fireEvent.change(input, { target: { value: 'Jane Doe' } })
      expect(handleChange).toHaveBeenCalled()
    })

    it('renders textarea when as="textarea"', () => {
      render(
        <Input
          label="Message"
          as="textarea"
          name="message"
          value="Hello World"
          onChange={() => {}}
        />
      )

      const textarea = screen.getByLabelText('Message')
      expect(textarea.tagName).toBe('TEXTAREA')
    })

    it('renders select with options when as="select"', () => {
      const options = [
        { value: 'water', label: 'Water' },
        { value: 'health', label: 'Health' },
      ]
      render(
        <Input
          label="Category"
          as="select"
          name="category"
          value="water"
          onChange={() => {}}
          options={options}
        />
      )

      const select = screen.getByLabelText('Category')
      expect(select.tagName).toBe('SELECT')
      expect(screen.getByRole('option', { name: 'Water' })).toBeInTheDocument()
    })
  })

  describe('Modal Component', () => {
    it('does not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={() => {}}>
          Modal Content
        </Modal>
      )
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
    })

    it('renders modal in portal and handles close click and escape key', () => {
      const handleClose = vi.fn()
      render(
        <Modal isOpen={true} onClose={handleClose} ariaLabel="Test Dialog">
          <div>Modal Body</div>
        </Modal>
      )

      expect(screen.getByRole('dialog', { name: 'Test Dialog' })).toBeInTheDocument()
      expect(screen.getByText('Modal Body')).toBeInTheDocument()

      // Close button
      const closeBtn = screen.getByLabelText('Close modal')
      fireEvent.click(closeBtn)
      expect(handleClose).toHaveBeenCalledTimes(1)

      // Escape key
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(handleClose).toHaveBeenCalledTimes(2)
    })
  })

  describe('Accordion Component', () => {
    const faqItems = [
      { id: 1, question: 'Question 1', answer: 'Answer 1' },
      { id: 2, question: 'Question 2', answer: 'Answer 2' },
    ]

    it('expands and collapses accordion items on click', () => {
      render(<Accordion items={faqItems} />)

      const q1Btn = screen.getByRole('button', { name: /Question 1/i })
      const q2Btn = screen.getByRole('button', { name: /Question 2/i })

      // First item is open by default
      expect(q1Btn).toHaveAttribute('aria-expanded', 'true')
      expect(q2Btn).toHaveAttribute('aria-expanded', 'false')

      // Click second item
      fireEvent.click(q2Btn)
      expect(q2Btn).toHaveAttribute('aria-expanded', 'true')
      expect(q1Btn).toHaveAttribute('aria-expanded', 'false') // Single open mode
    })
  })

  describe('ErrorBoundary Component', () => {
    const ProblematicChild = ({ shouldThrow }: { shouldThrow: boolean }) => {
      if (shouldThrow) {
        throw new Error('Test Explosion!')
      }
      return <div>Safe Child Content</div>
    }

    it('renders children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <ProblematicChild shouldThrow={false} />
        </ErrorBoundary>
      )
      expect(screen.getByText('Safe Child Content')).toBeInTheDocument()
    })

    it('catches render errors, displays fallback UI and toggle details', () => {
      // Prevent console.error noise during testing
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      render(
        <ErrorBoundary>
          <ProblematicChild shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()

      // Toggle details
      const detailsBtn = screen.getByText('Show technical details')
      fireEvent.click(detailsBtn)
      expect(screen.getByText(/Test Explosion!/)).toBeInTheDocument()

      consoleSpy.mockRestore()
    })
  })

  describe('ChatWidget Component', () => {
    it('opens and closes floating chat widget', () => {
      render(<ChatWidget />)

      const toggleBtn = screen.getByLabelText(/chat support/i)
      expect(toggleBtn).toBeInTheDocument()

      // Open
      fireEvent.click(toggleBtn)
      expect(screen.getByText('AquaHope Support')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument()

      // Close
      const closeBtn = screen.getByLabelText('Close chat')
      fireEvent.click(closeBtn)
      expect(toggleBtn).toBeInTheDocument()
    })

    it('sends user message and renders simulated response', () => {
      vi.useFakeTimers()
      render(<ChatWidget />)

      // Open chat
      fireEvent.click(screen.getByLabelText(/chat support/i))

      // Type and submit message
      const input = screen.getByPlaceholderText('Type your message...')
      fireEvent.change(input, { target: { value: 'How can I volunteer?' } })
      fireEvent.submit(input.closest('form')!)

      expect(screen.getByText('How can I volunteer?')).toBeInTheDocument()

      // Advance timers for bot auto-reply
      act(() => {
        vi.advanceTimersByTime(1600)
      })

      expect(screen.getByText(/Thanks for reaching out!/i)).toBeInTheDocument()
      vi.useRealTimers()
    })
  })

  describe('ScrollToTop Component', () => {
    it('renders scroll button and calls window.scrollTo when clicked', () => {
      render(
        <MemoryRouter>
          <ScrollToTop />
        </MemoryRouter>
      )

      const btn = screen.getByLabelText('Scroll to top')
      expect(btn).toBeInTheDocument()

      fireEvent.click(btn)
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    })
  })
})
