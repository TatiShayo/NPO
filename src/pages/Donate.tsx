// ============================================
// Donate Page — High-conversion donation form
// ============================================

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaChevronRight,
  FaHome,
  FaLock,
  FaShieldAlt,
  FaAward,
  FaSearchDollar,
  FaBuilding,
  FaFileSignature,
  FaChartLine,
  FaUniversity,
  FaSpinner,
  FaCreditCard,
  FaMobileAlt,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa'
import { donationAmounts, donorFeed, otherWays } from '../data/donors'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Modal from '../components/ui/Modal'

const otherWayIcons: Record<string, React.ReactNode> = {
  building: <FaBuilding />,
  will: <FaFileSignature />,
  chart: <FaChartLine />,
  bank: <FaUniversity />,
}

export default function Donate() {
  useScrollAnimation()

  const [donationType, setDonationType] = useState('monthly')
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [donorMessage, setDonorMessage] = useState('')

  // Local storage state for live donor feed
  interface StoredDonation {
    id: number
    name: string
    location: string
    amount: string
    amountNum: number
    type: string
    time: string
    initials: string
    gradient: string
    date: string
    message?: string
    status?: string
  }

  const [feedItems, setFeedItems] = useState<StoredDonation[]>([])

  useEffect(() => {
    document.title = 'Donate — AquaHope Foundation'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Donate to AquaHope Foundation. 100% of your donation goes directly to communities. Clean water, sanitation, agriculture, education, and health across East Africa.')
    }

    const stored = localStorage.getItem('npo_donations')
    if (stored) {
      try {
        setFeedItems(JSON.parse(stored))
      } catch (e) {
        setFeedItems(donorFeed as any[])
      }
    } else {
      localStorage.setItem('npo_donations', JSON.stringify(donorFeed))
      setFeedItems(donorFeed as any[])
    }
  }, [])

  // Checkout modal states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [checkoutMethod, setCheckoutMethod] = useState<'card' | 'mpesa'>('card')
  const [checkoutState, setCheckoutState] = useState<'idle' | 'connecting' | 'verifying' | 'authenticating' | 'success' | 'failed'>('idle')
  const [checkoutError, setCheckoutError] = useState('')

  // Sandbox inputs
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [mpesaPhone, setMpesaPhone] = useState('')

  // Helper to clear sensitive payment data
  const clearSensitiveData = () => {
    setCardNumber('')
    setCardCvv('')
    setCardExpiry('')
    setMpesaPhone('')
  }

  // Helper to sanitize inputs to prevent stored XSS
  const sanitizeInput = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  }

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false)
    clearSensitiveData()
  }

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCheckoutState('idle')
    setCheckoutError('')
    // Pre-fill card name if available
    setCardName(donorName)
    setIsCheckoutOpen(true)
  }

  const handlePay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCheckoutError('')

    // Validation
    if (checkoutMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
        setCheckoutError('Please fill in all credit card details.')
        clearSensitiveData()
        return
      }
      if (!/^\d{13,19}$/.test(cardNumber.replace(/\s+/g, ''))) {
        setCheckoutError('Please enter a valid 13 to 19 digit card number.')
        clearSensitiveData()
        return
      }
      const match = cardExpiry.trim().match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)
      if (!match) {
        setCheckoutError('Please enter card expiry in MM/YY format.')
        clearSensitiveData()
        return
      }
      const expiryMonth = parseInt(match[1])
      const expiryYear = parseInt('20' + match[2])
      const now = new Date()
      const currentMonth = now.getMonth() + 1
      const currentYear = now.getFullYear()
      if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        setCheckoutError('Card expiry date is in the past.')
        clearSensitiveData()
        return
      }
      if (!/^\d{3,4}$/.test(cardCvv)) {
        setCheckoutError('Please enter a valid CVV.')
        clearSensitiveData()
        return
      }
    } else {
      if (!mpesaPhone) {
        setCheckoutError('Please enter your phone number.')
        clearSensitiveData()
        return
      }
      if (!/^\+?[\d\s-]{10,13}$/.test(mpesaPhone)) {
        setCheckoutError('Please enter a valid phone number.')
        clearSensitiveData()
        return
      }
    }

    // Start Simulation
    setCheckoutState('connecting')

    setTimeout(() => {
      setCheckoutState('verifying')
      setTimeout(() => {
        setCheckoutState('authenticating')
        setTimeout(() => {
          // Trigger failure conditions
          const formattedCardNumber = cardNumber.replace(/\s+/g, '')
          const isFailedCard = formattedCardNumber.endsWith('4000')
          const isFailedAmount = finalAmount === 999
          const isFailedPhone = mpesaPhone.endsWith('000')

          if (isFailedCard || isFailedAmount || isFailedPhone) {
            setCheckoutState('failed')
            clearSensitiveData()
            setCheckoutError(
              isFailedAmount
                ? 'Simulation Error: Donation amount of 999 is blocked.'
                : isFailedCard
                ? 'Simulation Error: Card number ending in 4000 was declined by the issuer.'
                : 'Simulation Error: M-Pesa transaction failed due to subscriber status (phone ending in 000).'
            )
          } else {
            setCheckoutState('success')
            // Save to localStorage
            const stored = localStorage.getItem('npo_donations')
            let list: StoredDonation[] = []
            if (stored) {
              try {
                list = JSON.parse(stored)
              } catch (err) {
                list = []
              }
            }
            if (list.length === 0) {
              list = [...donorFeed] as any[]
            }

            const sanitizedName = sanitizeInput(donorName || 'Anonymous')
            const sanitizedMessage = donorMessage ? sanitizeInput(donorMessage) : ''

            const initials = sanitizedName
              ? sanitizedName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
              : 'A'
            const newRecord: StoredDonation = {
              id: Date.now(),
              name: sanitizedName,
              location: checkoutMethod === 'mpesa' ? 'Nairobi, KE' : 'Austin, TX',
              amount: donationType === 'monthly' ? `$${finalAmount}/month` : `$${finalAmount}`,
              amountNum: finalAmount,
              type: donationType,
              time: 'Just now',
              initials,
              gradient: 'linear-gradient(135deg, #2ECC71, #0E6BA8)',
              date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
              message: sanitizedMessage,
              status: 'active'
            }

            localStorage.setItem('npo_donations', JSON.stringify([newRecord, ...list]))
            setFeedItems([newRecord, ...feedItems.filter(item => item.id !== newRecord.id)])
            clearSensitiveData()
          }
        }, 1500)
      }, 1500)
    }, 1500)
  }

  return (
    <div className="page-fade">
      {/* Hero */}
      <section className="donate-hero">
        <div className="container donate-hero-content">
          <div className="breadcrumb">
            <Link to="/"><FaHome /> Home</Link>
            <FaChevronRight style={{ fontSize: '0.7rem' }} />
            <span>Donate</span>
          </div>
          <h1>Your Generosity Changes Lives</h1>
          <p>
            100% of your donation goes directly to the communities we serve.
            Clean water. Strong futures.
          </p>
        </div>
      </section>

      {/* Donation Layout */}
      <div className="donate-layout">
        {/* LEFT: Donation Form */}
        <div className="donate-form-card animate-on-scroll">
          {/* Type Toggle */}
          <div className="donate-type-toggle">
            <button
              className={`donate-type-btn ${donationType === 'monthly' ? 'active' : ''}`}
              onClick={() => setDonationType('monthly')}
              aria-pressed={donationType === 'monthly'}
            >
              Monthly
            </button>
            <button
              className={`donate-type-btn ${donationType === 'one-time' ? 'active' : ''}`}
              onClick={() => setDonationType('one-time')}
              aria-pressed={donationType === 'one-time'}
            >
              One-time
            </button>
          </div>

          <div className="donate-social-proof">
            {donationType === 'monthly' ? (
              <>Join <strong>847 monthly supporters</strong> creating lasting change</>
            ) : (
              <>Make a one-time gift that creates immediate impact</>
            )}
          </div>

          {donationType === 'monthly' && (
            <div className="donate-impact-note">
              Your $25/month = $300/year = 1 family's water access for life
            </div>
          )}

          {/* Amount Selector */}
          <div className="donate-form-section">
            <label>Choose Your Amount</label>
            <div className="amount-grid">
              {donationAmounts.map((item) => (
                <button
                  key={item.amount}
                  type="button"
                  className={`amount-btn ${!customAmount && selectedAmount === item.amount ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedAmount(item.amount)
                    setCustomAmount('')
                  }}
                  aria-pressed={selectedAmount === item.amount}
                >
                  ${item.amount}
                  <span className="amount-btn-impact">{item.impact}</span>
                </button>
              ))}
            </div>

            <div className="custom-amount-wrapper">
              <span className="custom-amount-prefix">$</span>
              <input
                type="number"
                className="custom-amount-input"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                aria-label="Custom donation amount"
              />
            </div>
          </div>

          {/* Donor Info */}
          <form onSubmit={handleSubmit}>
            <div className="donate-form-section">
              <label htmlFor="donor-name">Full Name</label>
              <input
                id="donor-name"
                type="text"
                className="donate-form-input"
                placeholder="Jane Doe"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                required
              />
            </div>

            <div className="donate-form-section">
              <label htmlFor="donor-email">Email Address</label>
              <input
                id="donor-email"
                type="email"
                className="donate-form-input"
                placeholder="jane@example.com"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                required
              />
            </div>

            <div className="donate-form-section">
              <label htmlFor="donor-message">Write a message of hope (optional)</label>
              <textarea
                id="donor-message"
                className="donate-form-textarea"
                placeholder="Your message of encouragement to the communities we serve..."
                value={donorMessage}
                onChange={(e) => setDonorMessage(e.target.value)}
              />
            </div>

            <button type="submit" className="donate-submit-btn">
              Donate ${finalAmount} {donationType === 'monthly' ? '/month' : ''} with Pesapal
            </button>

            <div className="donate-security-note">
              <FaLock /> Secure payment processed by Pesapal. Your card details never touch our servers.
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
              Pesapal is a licensed payment service provider serving East Africa and international donors.
            </div>
          </form>
        </div>

        {/* RIGHT: Trust Sidebar */}
        <aside className="trust-sidebar">
          {/* Why Donate */}
          <div className="trust-card animate-on-scroll stagger-1">
            <h4>Why Donate to AquaHope?</h4>
            <div className="trust-badges">
              <div className="trust-badge">
                <div className="trust-badge-icon"><FaAward /></div>
                <div className="trust-badge-text">Charity Navigator</div>
              </div>
              <div className="trust-badge">
                <div className="trust-badge-icon"><FaSearchDollar /></div>
                <div className="trust-badge-text">GuideStar / Candid</div>
              </div>
              <div className="trust-badge">
                <div className="trust-badge-icon"><FaShieldAlt /></div>
                <div className="trust-badge-text">BBB Accredited</div>
              </div>
            </div>
          </div>

          {/* Where Money Goes */}
          <div className="trust-card animate-on-scroll stagger-2">
            <h4>Where Your Money Goes</h4>
            <div className="allocation-bar">
              <div
                className="allocation-segment"
                style={{ flex: '85', background: 'var(--color-primary)' }}
              >
                85%
              </div>
              <div
                className="allocation-segment"
                style={{ flex: '10', background: 'var(--color-secondary)' }}
              >
                10%
              </div>
              <div
                className="allocation-segment"
                style={{ flex: '5', background: 'var(--color-accent)' }}
              >
                5%
              </div>
            </div>
            <div className="allocation-legend">
              <div className="allocation-legend-item">
                <span className="allocation-legend-dot" style={{ background: 'var(--color-primary)' }}></span>
                85% — Direct Programme Costs
              </div>
              <div className="allocation-legend-item">
                <span className="allocation-legend-dot" style={{ background: 'var(--color-secondary)' }}></span>
                10% — Operations & Sustainability
              </div>
              <div className="allocation-legend-item">
                <span className="allocation-legend-dot" style={{ background: 'var(--color-accent)' }}></span>
                5% — Administration
              </div>
            </div>
          </div>

          {/* Security Badges */}
          <div className="trust-card animate-on-scroll stagger-3">
            <h4>Bank-Level Security</h4>
            <div className="security-badges">
              <div className="security-badge">
                <FaLock /> SSL Secured
              </div>
              <div className="security-badge">
                <FaShieldAlt /> PCI Compliant
              </div>
              <div className="security-badge">
                <FaLock /> 256-bit Encryption
              </div>
            </div>
          </div>

          {/* Donor Testimonial */}
          <div className="trust-card animate-on-scroll stagger-4">
            <p className="donor-testimonial">
              "I've been giving monthly for 2 years. The impact reports I receive
              make me confident my money is making a real difference."
            </p>
            <div className="donor-testimonial-author">— Sarah M., Austin TX</div>
          </div>
        </aside>
      </div>

      {/* Real-Time Donor Feed */}
      <section className="donor-feed">
        <div className="donor-feed-title animate-on-scroll">
          <span className="section-tag">Live Feed</span>
          <h2>Recent Supporters</h2>
          <p className="text-secondary">Join a growing community of donors making a difference.</p>
        </div>

        <div className="donor-feed-list">
          {feedItems.map((donor, index) => (
            <div
              key={donor.id}
              className="donor-feed-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="donor-feed-avatar"
                style={{ background: donor.gradient }}
              >
                {donor.initials}
              </div>
              <div className="donor-feed-info">
                <div className="donor-feed-name">
                  {donor.name}
                  {donor.location && (
                    <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>
                      {' '}from {donor.location}
                    </span>
                  )}
                </div>
                <div className="donor-feed-meta">{donor.time}</div>
              </div>
              <div className="donor-feed-amount">{donor.amount}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="section bg-dark-surface">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">More Ways to Give</span>
            <h2>Other Ways to Make an Impact</h2>
          </div>

          <div className="other-ways-grid">
            {otherWays.map((way, index) => (
              <div
                key={index}
                className={`other-way-card animate-on-scroll stagger-${index + 1}`}
              >
                <div className="other-way-icon">
                  {otherWayIcons[way.icon]}
                </div>
                <h5>{way.title}</h5>
                <p>{way.description}</p>
                <a href="#" className="other-way-link">Learn More →</a>
              </div>
            ))}
          </div>

          <div className="tax-note">
            For tax deductibility information, please contact us directly.
          </div>
        </div>
      </section>

      {/* Sandbox Checkout Modal */}
      <Modal isOpen={isCheckoutOpen} onClose={() => { if (checkoutState !== 'connecting' && checkoutState !== 'verifying' && checkoutState !== 'authenticating') handleCloseCheckout() }} ariaLabel="Pesapal Checkout Sandbox">
        <div className="checkout-modal">
          <div className="checkout-header">
            <h3>Pesapal Sandbox Secure Checkout</h3>
            <p className="text-secondary">Simulating secure checkout for <strong>${finalAmount} {donationType === 'monthly' ? '/ month' : 'one-time'}</strong></p>
          </div>

          {checkoutState === 'idle' && (
            <form onSubmit={handlePay} className="checkout-form">
              <div className="checkout-tabs">
                <button
                  type="button"
                  className={`checkout-tab ${checkoutMethod === 'card' ? 'active' : ''}`}
                  onClick={() => { setCheckoutMethod('card'); clearSensitiveData(); }}
                >
                  <FaCreditCard /> Credit/Debit Card
                </button>
                <button
                  type="button"
                  className={`checkout-tab ${checkoutMethod === 'mpesa' ? 'active' : ''}`}
                  onClick={() => { setCheckoutMethod('mpesa'); clearSensitiveData(); }}
                >
                  <FaMobileAlt /> Mobile Money (M-Pesa)
                </button>
              </div>

              {checkoutError && (
                <div className="checkout-error-banner">
                  {checkoutError}
                </div>
              )}

              {checkoutMethod === 'card' ? (
                <div className="checkout-fields">
                  <div className="checkout-field-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      className="checkout-input"
                      placeholder="Jane Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="checkout-field-group">
                    <label>Card Number (16 digits)</label>
                    <input
                      type="text"
                      className="checkout-input"
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                    />
                    <small className="text-muted">Tip: End card number with '4000' or set amount to 999 to simulate payment failure.</small>
                  </div>
                  <div className="checkout-row">
                    <div className="checkout-field-group">
                      <label>Expiry (MM/YY)</label>
                      <input
                        type="text"
                        className="checkout-input"
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        required
                      />
                    </div>
                    <div className="checkout-field-group">
                      <label>CVV</label>
                      <input
                        type="password"
                        className="checkout-input"
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="checkout-fields">
                  <div className="checkout-field-group">
                    <label>M-Pesa Phone Number</label>
                    <input
                      type="tel"
                      className="checkout-input"
                      placeholder="0712345678"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      required
                    />
                    <small className="text-muted">Tip: End phone number with '000' to simulate payment failure.</small>
                  </div>
                </div>
              )}

              <div className="checkout-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleCloseCheckout}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Pay ${finalAmount}
                </button>
              </div>
            </form>
          )}

          {(checkoutState === 'connecting' || checkoutState === 'verifying' || checkoutState === 'authenticating') && (
            <div className="checkout-loading">
              <FaSpinner className="spinner-icon animate-spin" />
              <h4>
                {checkoutState === 'connecting' && 'Connecting to Provider...'}
                {checkoutState === 'verifying' && 'Verifying details...'}
                {checkoutState === 'authenticating' && 'Bank Authentication...'}
              </h4>
              <p className="text-secondary">Please do not refresh or close this page.</p>
            </div>
          )}

          {checkoutState === 'success' && (
            <div className="checkout-status success">
              <FaCheckCircle className="status-icon" />
              <h4>Payment Successful!</h4>
              <p>Thank you, {donorName || 'Anonymous'}, for your generous donation of <strong>${finalAmount}</strong>. Your payment was verified and processed securely via Pesapal.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleCloseCheckout()
                  // Reset form fields
                  setDonorName('')
                  setDonorEmail('')
                  setDonorMessage('')
                  setCustomAmount('')
                  setCheckoutState('idle')
                }}
              >
                Close Window
              </button>
            </div>
          )}

          {checkoutState === 'failed' && (
            <div className="checkout-status failed">
              <FaTimesCircle className="status-icon" />
              <h4>Payment Failed</h4>
              <p className="checkout-error-msg">{checkoutError}</p>
              <div className="checkout-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => setCheckoutState('idle')}
                >
                  Try Different Card/Method
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleCloseCheckout}
                >
                  Close Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
