// ============================================
// Gallery Page — Masonry grid with lightbox
// ============================================

import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  FaChevronRight,
  FaHome,
  FaTimes,
  FaChevronLeft,
  FaEye,
} from 'react-icons/fa'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { galleryItems, galleryCategories } from '../data/gallery'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

interface GalleryItemData {
  id: number
  category: string
  caption: string
  gradient: string
  height: number
}

export default function Gallery() {
  useScrollAnimation()

  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    document.title = 'Gallery — AquaHope Foundation'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'View photos from AquaHope Foundation\'s water, education, agriculture, and community health projects across East Africa.')
    }
  }, [])

  const filteredItems = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const navigateLightbox = useCallback(
    (direction: 'next' | 'prev') => {
      setLightboxIndex((prev) => {
        if (prev === null) return null
        const max = filteredItems.length - 1
        if (direction === 'next') return prev >= max ? 0 : prev + 1
        return prev <= 0 ? max : prev - 1
      })
    },
    [filteredItems.length]
  )

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigateLightbox('prev')
      if (e.key === 'ArrowRight') navigateLightbox('next')
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, closeLightbox, navigateLightbox])

  return (
    <div className="page-fade">
      {/* Header */}
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link to="/"><FaHome /> Home</Link>
            <FaChevronRight style={{ fontSize: '0.7rem' }} />
            <span>Gallery</span>
          </div>
          <h1>Stories From the Field</h1>
          <p>Every image represents a life changed. A community transformed.</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section">
        <div className="container">
          {/* Filter Tabs */}
          <div className="filter-tabs animate-on-scroll">
            {galleryCategories.map((category) => (
              <button
                key={category}
                className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
                aria-pressed={activeFilter === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="masonry-grid" key={activeFilter}>
            {filteredItems.map((item, index) => (
              <MasonryItem
                key={item.id}
                item={item}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-dark-surface">
        <div className="container text-center animate-on-scroll">
          <h2>Have photos from our projects?</h2>
          <p className="text-secondary" style={{ marginBottom: 'var(--space-md)' }}>
            Share them with us and help tell the story of transformation.
          </p>
          <Button to="/contact" variant="secondary" size="large">
            Contact Us
          </Button>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <FaTimes />
          </button>

          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation()
              navigateLightbox('prev')
            }}
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>

          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`lightbox-image ${filteredItems[lightboxIndex].gradient}`}>
              <span className="placeholder-label">Photo</span>
            </div>
            <div className="lightbox-caption">
              <Badge variant="water">{filteredItems[lightboxIndex].category}</Badge>
              <p style={{ marginTop: '0.5rem' }}>{filteredItems[lightboxIndex].caption}</p>
            </div>
          </div>

          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation()
              navigateLightbox('next')
            }}
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}

interface MasonryItemProps {
  item: GalleryItemData
  index: number
  onClick: () => void
}

// Individual masonry item with scroll animation
function MasonryItem({ item, index, onClick }: MasonryItemProps) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className="masonry-item"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`,
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View photo: ${item.caption}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onClick()
      }}
    >
      <div
        className={`masonry-item-content ${item.gradient}`}
        style={{ height: `${item.height}px` }}
      >
        <div className="masonry-item-label">
          <Badge variant="water">{item.category}</Badge>
        </div>
        <div className="masonry-item-caption">
          <span className="masonry-item-caption-text">
            <FaEye /> {item.caption}
          </span>
        </div>
      </div>
    </div>
  )
}
