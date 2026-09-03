// ============================================
// Hero Section — Full-viewport animated hero
// ============================================

import { useEffect, useState, useMemo } from 'react'
import Button from '../ui/Button'

export default function Hero() {
  const [parallaxY, setParallaxY] = useState(0)

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      setParallaxY(scrolled * 0.4)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Generate floating particles once
  const particles = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 4 + 4,
    delay: Math.random() * 3,
  })), [])

  return (
    <section className="hero" id="hero" aria-label="Hero section">
      {/* Floating Particles */}
      <div className="hero-particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="hero-content"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <span className="section-tag">East Africa Water & Empowerment</span>
        <h1>
          Transforming Communities Through{' '}
          <span className="accent-word">Clean Water</span> & Empowerment
        </h1>
        <p className="hero-subtitle">
          Providing safe water, sustainable agriculture, quality education, and
          community health across East Africa. Your generosity changes everything.
        </p>
        <div className="hero-cta-group">
          <Button to="/donate" variant="primary" size="large" pulse>
            Donate Now
          </Button>
          <Button to="/projects" variant="secondary" size="large">
            See Our Impact
          </Button>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            d="M0,50 C320,100 640,0 960,40 C1200,70 1320,50 1440,30 L1440,100 L0,100 Z"
            fill="#0A1628"
          />
          <path
            d="M0,70 C320,110 640,20 960,60 C1200,90 1320,70 1440,50 L1440,100 L0,100 Z"
            fill="#0A1628"
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  )
}
