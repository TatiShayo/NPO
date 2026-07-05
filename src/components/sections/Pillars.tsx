// ============================================
// Pillars Section — Four interactive pillar cards
// ============================================

import { FaTint, FaSeedling, FaGraduationCap, FaHeartbeat } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const pillars = [
  {
    icon: <FaTint />,
    title: 'Water & Sanitation',
    description: 'Clean water access through borehole drilling, solar-powered pumps, and sanitation infrastructure that transforms daily life.',
    className: 'water',
    delay: 'stagger-1',
  },
  {
    icon: <FaSeedling />,
    title: 'Agriculture & Livelihoods',
    description: 'Supporting communities through sustainable farming, irrigation systems, and income-generating agricultural programs.',
    className: 'agriculture',
    delay: 'stagger-2',
  },
  {
    icon: <FaGraduationCap />,
    title: 'Education',
    description: 'Providing food, water, and essential resources to underserved schools so every child can learn and thrive.',
    className: 'education',
    delay: 'stagger-3',
  },
  {
    icon: <FaHeartbeat />,
    title: 'Health',
    description: 'Community health programs, values promotion, and trained health workers bringing care to remote villages.',
    className: 'health',
    delay: 'stagger-4',
  },
]

export default function Pillars() {
  return (
    <section className="section" aria-label="Our four pillars">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-tag">What We Do</span>
          <h2>Four Pillars of Lasting Change</h2>
          <p>
            We address the interconnected challenges facing East African communities
            through a holistic approach to development.
          </p>
        </div>

        <div className="pillars-grid">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`pillar-card animate-on-scroll ${pillar.delay}`}
            >
              <div className={`pillar-icon ${pillar.className}`}>
                {pillar.icon}
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
              <Link to="/projects" className="pillar-link">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
