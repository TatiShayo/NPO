// ============================================
// Home Page — Landing page assembling all sections
// ============================================

import { useEffect } from 'react'
import Hero from '../components/sections/Hero'
import Stats from '../components/sections/Stats'
import Pillars from '../components/sections/Pillars'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import WhereMoneyGoes from '../components/sections/WhereMoneyGoes'
import Testimonials from '../components/sections/Testimonials'
import Newsletter from '../components/sections/Newsletter'
import Partners from '../components/sections/Partners'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Home() {
  useScrollAnimation()

  // Set page metadata
  useEffect(() => {
    document.title = 'AquaHope Foundation — Clean Water. Strong Communities. Lasting Change.'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'AquaHope Foundation provides safe water, sustainable agriculture, quality education, and community health across East Africa. Your generosity changes everything.')
    }
  }, [])

  return (
    <div className="page-fade">
      <Hero />
      <Stats />
      <Pillars />
      <FeaturedProjects />
      <WhereMoneyGoes />
      <Testimonials />
      <Newsletter />
      <Partners />
    </div>
  )
}
