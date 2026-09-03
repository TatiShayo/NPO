import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import Projects from './Projects'
import Gallery from './Gallery'
import About from './About'
import Home from './Home'

describe('Pages & Navigation Suite', () => {
  describe('Projects Page', () => {
    it('renders projects hero and filter tabs', () => {
      render(
        <MemoryRouter>
          <Projects />
        </MemoryRouter>
      )

      expect(screen.getByText('Our Projects')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Water' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Agriculture' })).toBeInTheDocument()
    })

    it('filters project cards when a category tab is clicked', () => {
      render(
        <MemoryRouter>
          <Projects />
        </MemoryRouter>
      )

      // Initially all projects are present
      expect(screen.getByText('Kajiado Borehole Project')).toBeInTheDocument()
      expect(screen.getByText('Community Farm Initiative')).toBeInTheDocument()

      // Click Agriculture filter
      fireEvent.click(screen.getByRole('button', { name: 'Agriculture' }))

      // Agriculture project still visible
      expect(screen.getByText('Community Farm Initiative')).toBeInTheDocument()
      // Water project filtered out
      expect(screen.queryByText('Kajiado Borehole Project')).not.toBeInTheDocument()
    })

    it('opens and closes project detail modal', () => {
      render(
        <MemoryRouter>
          <Projects />
        </MemoryRouter>
      )

      const detailsBtn = screen.getByLabelText('View details for Kajiado Borehole Project')
      fireEvent.click(detailsBtn)

      // Modal open
      expect(screen.getByRole('dialog', { name: 'Project details' })).toBeInTheDocument()
      expect(screen.getByText('The Challenge')).toBeInTheDocument()
      expect(screen.getByText('Our Solution')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Support This Project' })).toBeInTheDocument()

      // Close modal
      const closeBtn = screen.getByLabelText('Close modal')
      fireEvent.click(closeBtn)
      expect(screen.queryByRole('dialog', { name: 'Project details' })).not.toBeInTheDocument()
    })
  })

  describe('Gallery Page', () => {
    it('renders gallery items and opens lightbox on item click', () => {
      render(
        <MemoryRouter>
          <Gallery />
        </MemoryRouter>
      )

      expect(screen.getByText('Stories From the Field')).toBeInTheDocument()

      // Open lightbox by clicking the first image item
      const itemBtn = screen.getAllByRole('button', { name: /View photo:/i })[0]
      fireEvent.click(itemBtn)

      expect(screen.getByRole('dialog', { name: 'Image lightbox' })).toBeInTheDocument()

      // Navigate next
      const nextBtn = screen.getByLabelText('Next image')
      fireEvent.click(nextBtn)

      // Navigate prev
      const prevBtn = screen.getByLabelText('Previous image')
      fireEvent.click(prevBtn)

      // Close lightbox
      const closeBtn = screen.getByLabelText('Close lightbox')
      fireEvent.click(closeBtn)
      expect(screen.queryByRole('dialog', { name: 'Image lightbox' })).not.toBeInTheDocument()
    })
  })

  describe('About Page', () => {
    it('renders story, mission, milestones, core values and team members', () => {
      render(
        <MemoryRouter>
          <About />
        </MemoryRouter>
      )

      expect(screen.getByText('Our Story')).toBeInTheDocument()
      expect(screen.getByText('Our Mission')).toBeInTheDocument()
      expect(screen.getByText('Our Vision')).toBeInTheDocument()
      expect(screen.getByText('Milestones Through the Years')).toBeInTheDocument()
      expect(screen.getByText('Transparency')).toBeInTheDocument()
      expect(screen.getByText('Lauren Ndanu')).toBeInTheDocument()
      expect(screen.getByText('Brian Mukwe')).toBeInTheDocument()
    })
  })

  describe('Home Page', () => {
    it('assembles all landing page sections', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      )

      expect(screen.getByText(/Transforming Communities Through/i)).toBeInTheDocument()
      expect(screen.getByText('Four Pillars of Lasting Change')).toBeInTheDocument()
      expect(screen.getByText('Featured Projects')).toBeInTheDocument()
      expect(screen.getByText('Where Your Money Goes')).toBeInTheDocument()
      expect(screen.getByText('Stories of Transformation')).toBeInTheDocument()
    })
  })
})
