// ============================================
// Projects Page — Filterable grid with modal detail
// ============================================

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaHome, FaMapMarkerAlt, FaArrowRight, FaCheckCircle, FaClock } from 'react-icons/fa'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import { projects, projectCategories } from '../data/projects'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface ProjectImpact {
  number: string
  label: string
}

interface ProjectData {
  id: number
  title: string
  category: string
  status: string
  location: string
  gradient: string
  description: string
  challenge: string
  solution: string
  impact: ProjectImpact[]
  gallery: string[]
}

export default function Projects() {
  useScrollAnimation()

  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    document.title = 'Our Projects — AquaHope Foundation'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Explore AquaHope Foundation\'s water, agriculture, education, and health projects across East Africa. See the impact of your generosity.')
    }
  }, [])

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const openModal = (project: ProjectData) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="page-fade">
      {/* Header */}
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link to="/"><FaHome /> Home</Link>
            <FaChevronRight style={{ fontSize: '0.7rem' }} />
            <span>Projects</span>
          </div>
          <h1>Our Projects</h1>
          <p>See the impact of your generosity across East Africa.</p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section">
        <div className="container">
          {/* Filter Tabs */}
          <div className="filter-tabs animate-on-scroll">
            {projectCategories.map((category) => (
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

          {/* Project Grid */}
          <div className="projects-grid" key={activeFilter}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="project-card animate-on-scroll"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`project-card-image ${project.gradient}`}>
                  <span className="placeholder-label">Project Photo</span>
                  <div className="project-card-image-overlay">
                    <Badge variant={project.category.toLowerCase()}>
                      {project.category}
                    </Badge>
                    <Badge variant={project.status === 'Completed' ? 'completed' : 'in-progress'}>
                      {project.status === 'Completed' ? <FaCheckCircle /> : <FaClock />}
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <div className="project-card-body">
                  <h4>{project.title}</h4>
                  <div className="project-card-location">
                    <FaMapMarkerAlt /> {project.location}
                  </div>
                  <p className="project-card-desc">{project.description}</p>
                  <div className="project-card-footer">
                    <button
                      className="project-card-link"
                      onClick={() => openModal(project)}
                      aria-label={`View details for ${project.title}`}
                    >
                      View Details <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} ariaLabel="Project details">
        {selectedProject && (
          <>
            <div className={`modal-image ${selectedProject.gradient}`}>
              <span className="placeholder-label">Project Photo</span>
            </div>
            <div className="modal-body">
              <div className="modal-badges">
                <Badge variant={selectedProject.category.toLowerCase()}>
                  {selectedProject.category}
                </Badge>
                <Badge variant={selectedProject.status === 'Completed' ? 'completed' : 'in-progress'}>
                  {selectedProject.status}
                </Badge>
              </div>

              <h3>{selectedProject.title}</h3>

              <div className="modal-gps">
                <FaMapMarkerAlt /> {selectedProject.location}, Kenya
                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  Interactive map coming soon
                </span>
              </div>

              <div className="modal-section">
                <h5>The Challenge</h5>
                <p>{selectedProject.challenge}</p>
              </div>

              <div className="modal-section">
                <h5>Our Solution</h5>
                <p>{selectedProject.solution}</p>
              </div>

              <div className="modal-section">
                <h5>Impact Metrics</h5>
                <div className="modal-impact-grid">
                  {selectedProject.impact.map((metric: ProjectImpact, index: number) => (
                    <div key={index} className="modal-impact-item">
                      <div className="modal-impact-number">{metric.number}</div>
                      <div className="modal-impact-label">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h5>Project Gallery</h5>
                <div className="modal-gallery">
                  {selectedProject.gallery.map((gradient: string, index: number) => (
                    <div
                      key={index}
                      className={`modal-gallery-item ${gradient}`}
                    />
                  ))}
                </div>
              </div>

              <Button to="/donate" variant="primary" size="large" block onClick={closeModal}>
                Support This Project
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}
