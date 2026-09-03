// ============================================
// Contact Page — Form, info, social, FAQ
// ============================================

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaChevronRight,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaPaperPlane,
  FaCheckCircle,
} from 'react-icons/fa'
import Input from '../components/ui/Input'
import Accordion from '../components/ui/Accordion'
import { faqs } from '../data/faqs'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

import { validateContactForm, validateEmail } from '../utils/formValidation'
import { sanitizeText } from '../utils/sanitization'

const socialLinks = [
  { icon: <FaFacebookF />, label: 'Facebook', handle: '@AquaHopeFDN' },
  { icon: <FaInstagram />, label: 'Instagram', handle: '@aquahope.fdn' },
  { icon: <FaTwitter />, label: 'Twitter/X', handle: '@AquaHopeFDN' },
  { icon: <FaLinkedinIn />, label: 'LinkedIn', handle: 'AquaHope Foundation' },
  { icon: <FaYoutube />, label: 'YouTube', handle: 'AquaHope Foundation' },
]

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'donation', label: 'Donation Question' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'volunteering', label: 'Volunteering' },
  { value: 'media', label: 'Media / Press' },
  { value: 'other', label: 'Other' },
]

export default function Contact() {
  useScrollAnimation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    honeypot: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Contact Us — AquaHope Foundation'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Get in touch with AquaHope Foundation. Questions, partnerships, volunteering, or media inquiries — we\'d love to hear from you.')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validation = validateContactForm({
      name: sanitizeText(formData.name),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject,
      message: sanitizeText(formData.message),
      honeypot: formData.honeypot,
    })

    if (!validation.isValid) {
      setFormErrors(validation.errors)
      return
    }

    setFormErrors({})
    setIsSubmitting(true)

    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1200)
  }

  return (
    <div className="page-fade">
      {/* Hero */}
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link to="/"><FaHome /> Home</Link>
            <FaChevronRight style={{ fontSize: '0.7rem' }} />
            <span>Contact</span>
          </div>
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Questions, partnerships, or just want to say hello.</p>
        </div>
      </section>

      {/* Contact Layout */}
      <section className="section">
        <div className="contact-layout">
          {/* LEFT: Form */}
          <div className="contact-form-card animate-on-scroll">
            {isSubmitted ? (
              <div className="contact-success" role="status" aria-live="polite">
                <div className="contact-success-icon">
                  <FaCheckCircle />
                </div>
                <h3>Thank you!</h3>
                <p className="text-secondary">
                  We'll get back to you within 24 hours.
                </p>
                <button
                  className="btn btn-outline"
                  style={{ marginTop: '1rem' }}
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ name: '', email: '', phone: '', subject: 'general', message: '', honeypot: '' })
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot field for bot protection (visually hidden) */}
                <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0 }} aria-hidden="true">
                  <label htmlFor="website-hp">Leave this field blank</label>
                  <input
                    type="text"
                    id="website-hp"
                    name="honeypot"
                    tabIndex={-1}
                    value={formData.honeypot}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>

                {formErrors.honeypot && (
                  <div className="checkout-error-banner" role="alert" style={{ marginBottom: '1rem' }}>
                    {formErrors.honeypot}
                  </div>
                )}

                <div className="form-field-wrapper">
                  <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.name && (
                    <span className="field-error" style={{ color: '#E74C3C', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {formErrors.name}
                    </span>
                  )}
                </div>

                <div className="form-field-wrapper" style={{ marginTop: '1rem' }}>
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.email && (
                    <span className="field-error" style={{ color: '#E74C3C', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div className="form-field-wrapper" style={{ marginTop: '1rem' }}>
                  <Input
                    label="Phone Number (optional)"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {formErrors.phone && (
                    <span className="field-error" style={{ color: '#E74C3C', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {formErrors.phone}
                    </span>
                  )}
                </div>

                <div className="form-field-wrapper" style={{ marginTop: '1rem' }}>
                  <Input
                    label="Subject"
                    as="select"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    options={subjectOptions}
                  />
                  {formErrors.subject && (
                    <span className="field-error" style={{ color: '#E74C3C', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {formErrors.subject}
                    </span>
                  )}
                </div>

                <div className="form-field-wrapper" style={{ marginTop: '1rem' }}>
                  <Input
                    label="Message"
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.message && (
                    <span className="field-error" style={{ color: '#E74C3C', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {formErrors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <FaPaperPlane />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Info */}
          <div>
            <div className="contact-info-card animate-on-scroll stagger-1">
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Contact Information</h3>

              <div className="contact-info-item">
                <div className="contact-info-icon"><FaEnvelope /></div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">hello@aquahope.org</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon"><FaPhone /></div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value">+254 700 000 000</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon"><FaMapMarkerAlt /></div>
                <div>
                  <div className="contact-info-label">Address</div>
                  <div className="contact-info-value">P.O. Box 00000, Nairobi, Kenya</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon"><FaClock /></div>
                <div>
                  <div className="contact-info-label">Office Hours</div>
                  <div className="contact-info-value">Mon–Fri, 8:00 AM – 5:00 PM EAT</div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="map-placeholder">
                <div className="map-placeholder-content">
                  <div className="map-placeholder-icon"><FaMapMarkerAlt /></div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '600' }}>
                    Nairobi, Kenya
                  </div>
                  <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--color-text-secondary)' }}>
                    Interactive map coming soon
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-info-card animate-on-scroll stagger-2" style={{ marginTop: 'var(--space-md)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-sm)' }}>Connect With Us</h3>
              <div className="contact-social">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="contact-social-link"
                    aria-label={social.label}
                  >
                    {social.icon}
                    <span className="contact-social-tooltip">{social.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-dark-surface">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Common Questions</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about AquaHope Foundation.</p>
          </div>

          <Accordion items={faqs} />
        </div>
      </section>
    </div>
  )
}
