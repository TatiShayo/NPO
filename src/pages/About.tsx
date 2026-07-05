// ============================================
// About Page — Story, mission, timeline, team
// ============================================

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaHome, FaBullseye, FaEye, FaLinkedinIn } from 'react-icons/fa'
import {
  FaShieldAlt,
  FaLeaf,
  FaUsers,
  FaHandshake,
  FaLightbulb,
  FaHandsHelping,
} from 'react-icons/fa'
import Button from '../components/ui/Button'
import { team } from '../data/team'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const milestones = [
  { year: '2018', title: 'Founded', description: 'Founded with a mission to serve underserved communities in Kenya, starting with a vision of clean water for all.' },
  { year: '2019', title: 'First Borehole', description: 'First borehole completed in Kajiado County, serving 340 families with clean, reliable water access.' },
  { year: '2020', title: 'Sanitation Programs', description: 'Expanded to sanitation and hygiene education in 5 schools across Nakuru County.' },
  { year: '2021', title: 'Agriculture Launch', description: 'Launched agricultural livelihoods programme in Machakos, helping farmers triple their yields.' },
  { year: '2022', title: '5,000 Beneficiaries', description: 'Reached 5,000 beneficiaries across 3 counties with integrated water, health, and education programs.' },
  { year: '2023', title: 'Sustainable Partnership', description: 'Partnership with regional water authority for sustainable maintenance of all water infrastructure.' },
  { year: '2024', title: '10,000+ Lives', description: '10,000+ lives impacted, expanded to 8 communities with a growing team and donor base.' },
]

const values = [
  { icon: <FaShieldAlt />, title: 'Transparency', description: 'Every dollar is accounted for. Every project is tracked.' },
  { icon: <FaLeaf />, title: 'Sustainability', description: 'We build solutions that last, not quick fixes.' },
  { icon: <FaUsers />, title: 'Community', description: 'Local ownership drives lasting change.' },
  { icon: <FaHandshake />, title: 'Integrity', description: 'We do what we say, and we say what we do.' },
  { icon: <FaLightbulb />, title: 'Innovation', description: 'Smart solutions for complex challenges.' },
  { icon: <FaHandsHelping />, title: 'Empowerment', description: 'We don\'t just help — we enable.' },
]

export default function About() {
  useScrollAnimation()

  useEffect(() => {
    document.title = 'About Us — AquaHope Foundation'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Learn about AquaHope Foundation\'s mission, vision, journey, and the team dedicated to bringing clean water and empowerment to East Africa.')
    }
  }, [])

  return (
    <div className="page-fade">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link to="/"><FaHome /> Home</Link>
            <FaChevronRight style={{ fontSize: '0.7rem' }} />
            <span>About</span>
          </div>
          <h1>Our Story</h1>
          <p>Building hope, one community at a time.</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Our Purpose</span>
            <h2>Mission & Vision</h2>
          </div>

          <div className="mission-vision-grid">
            <div className="mv-card animate-on-scroll stagger-1">
              <div className="mv-card-icon"><FaBullseye /></div>
              <h3>Our Mission</h3>
              <p>
                To provide sustainable access to clean water, sanitation, and community
                resources across East Africa, empowering families to thrive.
              </p>
            </div>
            <div className="mv-card animate-on-scroll stagger-2">
              <div className="mv-card-icon"><FaEye /></div>
              <h3>Our Vision</h3>
              <p>
                A world where every community has access to clean water, quality education,
                and sustainable livelihoods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-dark-surface">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Our Journey</span>
            <h2>Milestones Through the Years</h2>
          </div>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="timeline-item animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h4>{milestone.title}</h4>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">What Drives Us</span>
            <h2>Our Core Values</h2>
            <p>These principles guide every decision we make and every project we undertake.</p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div
                key={index}
                className={`value-card animate-on-scroll stagger-${(index % 6) + 1}`}
              >
                <div className="value-icon">{value.icon}</div>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-dark-surface">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">The People Behind AquaHope</span>
            <h2>Meet the Team</h2>
            <p>Dedicated professionals using their skills to create lasting change.</p>
          </div>

          <div className="team-grid">
            {team.map((member) => (
              <div key={member.id} className="team-card animate-on-scroll">
                <div className="team-card-inner">
                  {/* Front */}
                  <div className="team-card-front">
                    <div
                      className="team-avatar"
                      style={{ background: member.gradient }}
                    >
                      {member.initials}
                    </div>
                    <h4>{member.name}</h4>
                    <div className="team-card-role">{member.role}</div>
                    <div className="team-card-bio">Hover to read bio</div>
                  </div>
                  {/* Back */}
                  <div className="team-card-back">
                    <p>{member.bio}</p>
                    <a
                      href={member.linkedin}
                      className="team-linkedin"
                      aria-label={`${member.name} LinkedIn profile`}
                    >
                      <FaLinkedinIn />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section">
        <div className="cta-banner animate-on-scroll">
          <h2>Join us in making a difference</h2>
          <p>Your support brings clean water and hope to communities across East Africa.</p>
          <div className="cta-banner-buttons">
            <Button to="/donate" variant="primary" size="large">Donate Now</Button>
            <Button to="/contact" variant="secondary" size="large">Contact Us</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
