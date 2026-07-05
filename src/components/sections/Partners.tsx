// ============================================
// Partners Section — Infinite scrolling marquee
// ============================================

const partners = [
  { name: 'USAID', initials: 'UA', gradient: 'linear-gradient(135deg, #0E6BA8, #36A2EB)' },
  { name: 'Global Fund', initials: 'GF', gradient: 'linear-gradient(135deg, #2ECC71, #1A8A4E)' },
  { name: 'UNICEF', initials: 'UN', gradient: 'linear-gradient(135deg, #F39C12, #F1C40F)' },
  { name: 'Water.org', initials: 'WO', gradient: 'linear-gradient(135deg, #E74C3C, #F39C12)' },
  { name: 'Charity Navigator', initials: 'CN', gradient: 'linear-gradient(135deg, #083D61, #0E6BA8)' },
  { name: 'GuideStar', initials: 'GS', gradient: 'linear-gradient(135deg, #1A8A4E, #0E6BA8)' },
  { name: 'Global Waters', initials: 'GW', gradient: 'linear-gradient(135deg, #F1C40F, #2ECC71)' },
  { name: 'WaterAid', initials: 'WA', gradient: 'linear-gradient(135deg, #E74C3C, #083D61)' },
]

export default function Partners() {
  // Duplicate for seamless infinite scroll
  const marqueePartners = [...partners, ...partners]

  return (
    <section className="partners-marquee" aria-label="Our partners">
      <div className="container" style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
        <span className="section-tag">Trusted Partnerships</span>
        <h3 style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem' }}>
          Working together with global organizations
        </h3>
      </div>

      <div className="partners-track">
        {marqueePartners.map((partner, index) => (
          <div key={index} className="partner-logo">
            <div
              className="partner-logo-circle"
              style={{ background: partner.gradient }}
            >
              {partner.initials}
            </div>
            <span className="partner-logo-text">{partner.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
