// ============================================
// WhereMoneyGoes Section — Impact per dollar
// ============================================

import { FaTint, FaWrench, FaChalkboard, FaHome } from 'react-icons/fa'
import Button from '../ui/Button'

const tiers = [
  {
    amount: '$25',
    description: 'Clean water for one family for 3 months',
    icon: <FaTint />,
    delay: 'stagger-1',
  },
  {
    amount: '$50',
    description: 'Water pump maintenance for one well',
    icon: <FaWrench />,
    delay: 'stagger-2',
  },
  {
    amount: '$100',
    description: 'Safe sanitation for a classroom of 40 students',
    icon: <FaChalkboard />,
    delay: 'stagger-3',
  },
  {
    amount: '$250',
    description: 'Water access for an entire village for 30 days',
    icon: <FaHome />,
    delay: 'stagger-4',
  },
]

export default function WhereMoneyGoes() {
  return (
    <section className="section" aria-label="Where your money goes">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-tag">Your Impact</span>
          <h2>Where Your Money Goes</h2>
          <p>Every dollar creates measurable, lasting change in the communities we serve.</p>
        </div>

        <div className="impact-tiers">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`impact-tier-card animate-on-scroll ${tier.delay}`}
            >
              <div className="impact-tier-icon">{tier.icon}</div>
              <div className="impact-tier-amount">{tier.amount}</div>
              <div className="impact-tier-desc">{tier.description}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }} className="animate-on-scroll">
          <Button to="/donate" variant="accent" size="large">
            Give Now
          </Button>
        </div>
      </div>
    </section>
  )
}
