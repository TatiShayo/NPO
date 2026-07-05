// ============================================
// Stats Section — Animated count-up impact stats
// ============================================

import { FaUsers, FaWater, FaSchool, FaHandsHelping } from 'react-icons/fa'
import Counter from '../ui/Counter'

const stats = [
  { icon: <FaUsers />, target: 12000, suffix: '+', label: 'Lives Impacted', delay: 'stagger-1' },
  { icon: <FaWater />, target: 45, suffix: '', label: 'Wells Built', delay: 'stagger-2' },
  { icon: <FaSchool />, target: 30, suffix: '', label: 'Schools Supported', delay: 'stagger-3' },
  { icon: <FaHandsHelping />, target: 8, suffix: '', label: 'Communities Served', delay: 'stagger-4' },
]

export default function Stats() {
  return (
    <section className="section stats-section" aria-label="Impact statistics">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-card animate-on-scroll ${stat.delay}`}
            >
              <div className="stat-icon">{stat.icon}</div>
              <Counter target={stat.target} suffix={stat.suffix} />
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
