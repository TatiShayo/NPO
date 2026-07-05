// ============================================
// FeaturedProjects Section — Horizontal carousel
// ============================================

import { useRef, useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'

const featuredProjects = [
  {
    id: 1,
    title: 'Kajiado Borehole Project',
    category: 'Water',
    location: 'Kajiado County',
    blurb: 'Solar-powered borehole serving 340 families with clean, reliable water.',
    gradient: 'placeholder-gradient-1',
  },
  {
    id: 2,
    title: 'Community Farm Initiative',
    category: 'Agriculture',
    location: 'Kiambu County',
    blurb: 'Drip irrigation and training helping 80 farmers triple their yields.',
    gradient: 'placeholder-gradient-6',
  },
  {
    id: 3,
    title: 'School Meals Programme',
    category: 'Education',
    location: 'Narok County',
    blurb: 'Daily nutritious meals for 500 students sourced from local farmers.',
    gradient: 'placeholder-gradient-3',
  },
  {
    id: 4,
    title: 'Village Health Workers',
    category: 'Health',
    location: 'Turkana County',
    blurb: '40 trained health workers delivering care across 15 remote villages.',
    gradient: 'placeholder-gradient-8',
  },
]

export default function FeaturedProjects() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scroll = (direction: 'next' | 'prev') => {
    if (!trackRef.current) return
    const track = trackRef.current
    const cardWidth = (track.querySelector('.project-slide') as HTMLElement)?.offsetWidth || 300
    const gap = 24
    track.scrollBy({
      left: direction === 'next' ? cardWidth + gap : -(cardWidth + gap),
      behavior: 'smooth',
    })
  }

  // Update active dot on scroll
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handleScroll = () => {
      const cardWidth = (track.querySelector('.project-slide') as HTMLElement | null)?.offsetWidth || 300
      const gap = 24
      const index = Math.round(track.scrollLeft / (cardWidth + gap))
      setActiveIndex(index)
    }

    track.addEventListener('scroll', handleScroll)
    return () => track.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="section" aria-label="Featured projects">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-tag">Our Work</span>
          <h2>Featured Projects</h2>
          <p>See how your generosity is transforming lives across East Africa.</p>
        </div>
      </div>

      <div className="container carousel-wrapper">
        <div className="carousel-track" ref={trackRef}>
          {featuredProjects.map((project) => (
            <div key={project.id} className="project-slide">
              <div className="project-slide-card">
                <div className={`project-slide-image ${project.gradient}`}>
                  <span className="placeholder-label">Project Photo</span>
                  <div className="project-slide-overlay">
                    <Badge variant={project.category.toLowerCase()}>{project.category}</Badge>
                  </div>
                </div>
                <div className="project-slide-body">
                  <h4>{project.title}</h4>
                  <div className="project-slide-location">
                    <FaMapMarkerAlt /> {project.location}
                  </div>
                  <p className="project-slide-blurb">{project.blurb}</p>
                  <Link to="/projects" className="project-card-link">
                    View Project <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="carousel-controls">
          <button
            className="carousel-btn"
            onClick={() => scroll('prev')}
            aria-label="Previous projects"
          >
            <FaChevronLeft />
          </button>
          <div className="carousel-dots">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${activeIndex === index ? 'active' : ''}`}
                onClick={() => {
                  const track = trackRef.current
                  if (!track) return
                  const cardWidth = (track.querySelector('.project-slide') as HTMLElement | null)?.offsetWidth || 300
                  const gap = 24
                  track.scrollTo({
                    left: index * (cardWidth + gap),
                    behavior: 'smooth',
                  })
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            className="carousel-btn"
            onClick={() => scroll('next')}
            aria-label="Next projects"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}
