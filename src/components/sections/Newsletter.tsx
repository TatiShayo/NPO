// ============================================
// Newsletter Section — Glassmorphism subscribe card
// ============================================

import { useState } from 'react'
import { FaPaperPlane, FaLock } from 'react-icons/fa'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <section className="section" aria-label="Newsletter subscription">
      <div className="container">
        <div className="newsletter-card animate-on-scroll">
          <span className="section-tag">Stay Connected</span>
          <h2>Stay Connected With Our Impact</h2>
          <p className="text-secondary">
            Monthly stories from the field, project updates, and ways you can help.
          </p>

          {subscribed ? (
            <div style={{ marginTop: 'var(--space-md)', color: 'var(--color-secondary)', fontSize: '1.1rem' }}>
              ✓ Thank you for subscribing! Check your inbox for confirmation.
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address for newsletter subscription"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe <FaPaperPlane />
              </button>
            </form>
          )}

          <div className="newsletter-trust">
            <FaLock style={{ display: 'inline', marginRight: '0.3rem' }} />
            We respect your privacy. Unsubscribe anytime.
          </div>
        </div>
      </div>
    </section>
  )
}
