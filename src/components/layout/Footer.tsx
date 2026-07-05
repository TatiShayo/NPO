// ============================================
// Footer Component — Global footer with 4 columns
// ============================================

import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaTint,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa'

export default function Footer() {
  const socialLinks = [
    { icon: <FaFacebookF />, href: '#', label: 'Facebook', handle: '@AquaHopeFDN' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram', handle: '@aquahope.fdn' },
    { icon: <FaTwitter />, href: '#', label: 'Twitter/X', handle: '@AquaHopeFDN' },
    { icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn', handle: 'AquaHope Foundation' },
    { icon: <FaYoutube />, href: '#', label: 'YouTube', handle: 'AquaHope Foundation' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="navbar-logo" style={{ marginBottom: 'var(--space-sm)' }}>
              <span className="navbar-logo-icon">
                <FaTint />
              </span>
              AquaHope
            </Link>
            <p>
              Clean Water. Strong Communities. Lasting Change. We provide safe water,
              sustainable agriculture, quality education, and community health across
              East Africa.
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="footer-social-link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/donate">Donate</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-item">
              <FaEnvelope />
              <span>hello@aquahope.org</span>
            </div>
            <div className="footer-contact-item">
              <FaPhone />
              <span>+254 700 000 000</span>
            </div>
            <div className="footer-contact-item">
              <FaMapMarkerAlt />
              <span>P.O. Box 00000, Nairobi, Kenya</span>
            </div>
          </div>

          {/* Newsletter Mini Form */}
          <div className="footer-col">
            <h4>Stay Updated</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-sm)' }}>
              Get monthly stories from the field delivered to your inbox.
            </p>
            <form className="footer-mini-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address for newsletter"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2025 AquaHope Foundation. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
