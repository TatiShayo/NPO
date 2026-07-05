// ============================================
// Testimonials Section — Auto-advancing carousel
// ============================================

import { useState, useEffect, useCallback } from 'react'
import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const goTo = (index: number) => {
    setActiveIndex(index)
  }

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <section className="section testimonials-section" aria-label="Beneficiary testimonials">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-tag">Voices From the Field</span>
          <h2>Stories of Transformation</h2>
        </div>

        <div className="testimonial-carousel">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
            >
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-text">{testimonial.quote}</p>
              <div className="testimonial-author">
                <div
                  className="testimonial-avatar"
                  style={{ background: testimonial.gradient }}
                >
                  {testimonial.initials}
                </div>
                <div className="testimonial-author-info">
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-location">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
