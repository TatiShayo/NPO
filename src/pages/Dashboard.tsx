// ============================================
// Dashboard Page — Donation Analytics & Management
// ============================================

import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  FaHome,
  FaChevronRight,
  FaHeart,
  FaUsers,
  FaDollarSign,
  FaCalendarAlt,
  FaPlay,
  FaPause,
  FaTimes,
  FaUndo,
} from 'react-icons/fa'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { donorFeed } from '../data/donors'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

interface Donation {
  id: number
  name: string
  location: string
  amount: string
  amountNum: number
  type: string
  time: string
  initials: string
  gradient: string
  date: string
  message?: string
  status?: 'active' | 'paused' | 'cancelled'
  project?: string
}

const COLORS = ['#0E6BA8', '#2ECC71', '#F39C12', '#E74C3C', '#9B59B6']

export default function Dashboard() {
  const [donations, setDonations] = useState<Donation[]>([])

  useEffect(() => {
    document.title = 'Donation Dashboard — AquaHope Foundation'
    
    // Seed and load donations from localStorage
    const stored = localStorage.getItem('npo_donations')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Donation[]
        // Ensure all stored donations have the necessary fields for stats
        const validated = parsed.map((d, index) => {
          // Parse amount number if missing
          const amountNum = d.amountNum || parseInt(d.amount.replace(/[^0-9]/g, '')) || 25
          
          // Generate a past date if missing to create a nice time series chart
          let date = d.date
          if (!date) {
            const dateObj = new Date()
            dateObj.setDate(dateObj.getDate() - (index * 2))
            date = dateObj.toISOString().split('T')[0]
          }

          // Assign status default
          const status = d.status || (d.type === 'monthly' ? 'active' : undefined)

          // Assign project default
          const projectList = ['Water Projects', 'Schools & Sanitation', 'Sustainable Agriculture', 'Community Health']
          const project = d.project || projectList[index % projectList.length]

          return { ...d, amountNum, date, status, project }
        })
        setDonations(validated)
        localStorage.setItem('npo_donations', JSON.stringify(validated))
      } catch (e) {
        initializeDefaults()
      }
    } else {
      initializeDefaults()
    }
  }, [])

  const initializeDefaults = () => {
    const defaultDonations = donorFeed.map((d, index) => {
      const amountNum = parseInt(d.amount.replace(/[^0-9]/g, '')) || 25
      const dateObj = new Date()
      dateObj.setDate(dateObj.getDate() - (index * 2))
      const date = dateObj.toISOString().split('T')[0]
      const status = d.type === 'monthly' ? 'active' : undefined
      const projectList = ['Water Projects', 'Schools & Sanitation', 'Sustainable Agriculture', 'Community Health']
      const project = projectList[index % projectList.length]

      return {
        ...d,
        amountNum,
        date,
        status,
        project,
      } as Donation
    })
    setDonations(defaultDonations)
    localStorage.setItem('npo_donations', JSON.stringify(defaultDonations))
  }

  // Summary Statistics
  const stats = useMemo(() => {
    let total = 0
    let count = donations.length
    let monthlySupporters = 0

    donations.forEach((d) => {
      if (d.status !== 'cancelled') {
        total += d.amountNum
      }
      if (d.type === 'monthly' && d.status === 'active') {
        monthlySupporters += 1
      }
    })

    const avg = count > 0 ? Math.round(total / count) : 0

    return {
      total,
      count,
      avg,
      monthlySupporters,
    }
  }, [donations])

  // Chart 1 Data: Donations over time (Chronological list sorted by date)
  const chartDataOverTime = useMemo(() => {
    const dailyMap: Record<string, number> = {}

    donations.forEach((d) => {
      if (d.status !== 'cancelled') {
        dailyMap[d.date] = (dailyMap[d.date] || 0) + d.amountNum
      }
    })

    // Sort dates
    return Object.keys(dailyMap)
      .sort()
      .map((date) => ({
        date: date.substring(5), // Show MM-DD format
        Amount: dailyMap[date],
      }))
  }, [donations])

  // Chart 2 Data: Donations by Project
  const chartDataByProject = useMemo(() => {
    const projectMap: Record<string, number> = {}

    donations.forEach((d) => {
      if (d.status !== 'cancelled') {
        const proj = d.project || 'General Operations'
        projectMap[proj] = (projectMap[proj] || 0) + d.amountNum
      }
    })

    return Object.keys(projectMap).map((name) => ({
      name,
      value: projectMap[name],
    }))
  }, [donations])

  // Manage recurrings
  const handleToggleStatus = (id: number, nextStatus: 'active' | 'paused' | 'cancelled') => {
    const updated = donations.map((d) => {
      if (d.id === id) {
        return { ...d, status: nextStatus }
      }
      return d
    })
    setDonations(updated)
    localStorage.setItem('npo_donations', JSON.stringify(updated))
  }

  return (
    <div className="page-fade dashboard-page">
      {/* Breadcrumbs / Header */}
      <section className="donate-hero" style={{ padding: '2rem 0' }}>
        <div className="container donate-hero-content">
          <div className="breadcrumb">
            <Link to="/"><FaHome /> Home</Link>
            <FaChevronRight style={{ fontSize: '0.7rem' }} />
            <span>Dashboard</span>
          </div>
          <h1>Donation Analytics Dashboard</h1>
          <p>Real-time analytics and recurring subscription management for AquaHope Foundation.</p>
        </div>
      </section>

      {/* Summary Stats Cards */}
      <section className="section" style={{ paddingBottom: '1.5rem' }}>
        <div className="container">
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <Card glow className="stat-card">
              <div className="stat-card-icon" style={{ color: 'var(--color-secondary)' }}>
                <FaDollarSign size={24} />
              </div>
              <div className="stat-card-info">
                <h3>${stats.total.toLocaleString()}</h3>
                <p className="text-secondary">Total Donations Raised</p>
              </div>
            </Card>

            <Card glow className="stat-card">
              <div className="stat-card-icon" style={{ color: 'var(--color-primary)' }}>
                <FaUsers size={24} />
              </div>
              <div className="stat-card-info">
                <h3>{stats.count}</h3>
                <p className="text-secondary">Total Contributions</p>
              </div>
            </Card>

            <Card glow className="stat-card">
              <div className="stat-card-icon" style={{ color: '#F39C12' }}>
                <FaHeart size={24} />
              </div>
              <div className="stat-card-info">
                <h3>${stats.avg}</h3>
                <p className="text-secondary">Average Gift Amount</p>
              </div>
            </Card>

            <Card glow className="stat-card">
              <div className="stat-card-icon" style={{ color: '#E74C3C' }}>
                <FaCalendarAlt size={24} />
              </div>
              <div className="stat-card-info">
                <h3>{stats.monthlySupporters}</h3>
                <p className="text-secondary">Active Monthly Supporters</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="section" style={{ padding: '0 0 2rem 0' }}>
        <div className="container">
          <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            {/* Donations over time */}
            <Card className="chart-card">
              <h4>Donations Over Time ($)</h4>
              <div style={{ width: '100%', height: 300 }}>
                {chartDataOverTime.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartDataOverTime} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="date" stroke="var(--color-text-secondary)" fontSize={12} />
                      <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
                      <Tooltip contentStyle={{ background: '#1c2833', border: '1px solid #2c3e50', borderRadius: '8px' }} labelStyle={{ color: 'white' }} />
                      <Area type="monotone" dataKey="Amount" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorAmount)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="no-data">No data available</div>
                )}
              </div>
            </Card>

            {/* Donations by project */}
            <Card className="chart-card">
              <h4>Donations by Project Category ($)</h4>
              <div style={{ width: '100%', height: 300 }}>
                {chartDataByProject.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartDataByProject}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name.substring(0, 10)}... ${(percent * 100).toFixed(0)}%`}
                      >
                        {chartDataByProject.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#1c2833', border: '1px solid #2c3e50', borderRadius: '8px' }} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="no-data">No data available</div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Recurrent Subscriptions & Details Table */}
      <section className="section" style={{ padding: '0 0 4rem 0' }}>
        <div className="container">
          <Card className="table-card">
            <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h4 style={{ margin: 0 }}>Recent Contributions & Subscription Management</h4>
              <span className="section-tag" style={{ marginLeft: 'auto' }}>Persistent LocalStorage Database</span>
            </div>

            <div className="table-wrapper" style={{ overflowX: 'auto' }}>
              <table className="dashboard-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.5rem' }}>
                    <th style={{ padding: '0.8rem 1rem' }}>Donor</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Project</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Amount</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Type</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Date</th>
                    <th style={{ padding: '0.8rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.8rem 1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.length > 0 ? (
                    donations.map((donor) => (
                      <tr key={donor.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', height: '3.5rem' }}>
                        <td style={{ padding: '0.8rem 1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: donor.gradient || 'linear-gradient(135deg, #0E6BA8, #36A2EB)',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                color: 'white',
                              }}
                            >
                              {donor.initials}
                            </div>
                            <div>
                              <div style={{ fontWeight: '600' }}>{donor.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                {donor.location || 'Online Donor'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '0.8rem 1rem', fontSize: '0.9rem' }}>
                          {donor.project || 'Water Projects'}
                        </td>
                        <td style={{ padding: '0.8rem 1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                          ${donor.amountNum}
                        </td>
                        <td style={{ padding: '0.8rem 1rem' }}>
                          <Badge variant={donor.type === 'monthly' ? 'water' : 'school'}>
                            {donor.type === 'monthly' ? 'Monthly' : 'One-Time'}
                          </Badge>
                        </td>
                        <td style={{ padding: '0.8rem 1rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                          {donor.date}
                        </td>
                        <td style={{ padding: '0.8rem 1rem' }}>
                          {donor.type === 'monthly' ? (
                            <Badge
                              variant={
                                donor.status === 'active'
                                  ? 'completed'
                                  : donor.status === 'paused'
                                  ? 'in-progress'
                                  : 'failed'
                              }
                            >
                              {donor.status === 'active' && 'Active'}
                              {donor.status === 'paused' && 'Paused'}
                              {donor.status === 'cancelled' && 'Cancelled'}
                            </Badge>
                          ) : (
                            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: '0.8rem 1rem', textAlign: 'right' }}>
                          {donor.type === 'monthly' && donor.status === 'active' && (
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                              <button
                                className="action-btn pause"
                                onClick={() => handleToggleStatus(donor.id, 'paused')}
                                title="Pause Subscription"
                                style={{
                                  background: 'rgba(243, 156, 18, 0.15)',
                                  color: '#F39C12',
                                  border: 'none',
                                  borderRadius: '4px',
                                  padding: '4px 8px',
                                  fontSize: '0.8rem',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                }}
                              >
                                <FaPause size={10} /> Pause
                              </button>
                              <button
                                className="action-btn cancel"
                                onClick={() => handleToggleStatus(donor.id, 'cancelled')}
                                title="Cancel Subscription"
                                style={{
                                  background: 'rgba(231, 76, 60, 0.15)',
                                  color: '#E74C3C',
                                  border: 'none',
                                  borderRadius: '4px',
                                  padding: '4px 8px',
                                  fontSize: '0.8rem',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                }}
                              >
                                <FaTimes size={10} /> Cancel
                              </button>
                            </div>
                          )}

                          {donor.type === 'monthly' && donor.status === 'paused' && (
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                              <button
                                className="action-btn resume"
                                onClick={() => handleToggleStatus(donor.id, 'active')}
                                title="Resume Subscription"
                                style={{
                                  background: 'rgba(46, 204, 113, 0.15)',
                                  color: '#2ECC71',
                                  border: 'none',
                                  borderRadius: '4px',
                                  padding: '4px 8px',
                                  fontSize: '0.8rem',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                }}
                              >
                                <FaPlay size={10} /> Resume
                              </button>
                              <button
                                className="action-btn cancel"
                                onClick={() => handleToggleStatus(donor.id, 'cancelled')}
                                title="Cancel Subscription"
                                style={{
                                  background: 'rgba(231, 76, 60, 0.15)',
                                  color: '#E74C3C',
                                  border: 'none',
                                  borderRadius: '4px',
                                  padding: '4px 8px',
                                  fontSize: '0.8rem',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                }}
                              >
                                <FaTimes size={10} /> Cancel
                              </button>
                            </div>
                          )}

                          {donor.type === 'monthly' && donor.status === 'cancelled' && (
                            <button
                              className="action-btn resume"
                              onClick={() => handleToggleStatus(donor.id, 'active')}
                              title="Reactivate Subscription"
                              style={{
                                background: 'rgba(142, 68, 173, 0.15)',
                                color: '#9B59B6',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                            >
                              <FaUndo size={10} /> Reactivate
                            </button>
                          )}

                          {donor.type !== 'monthly' && (
                            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>Non-recurring</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>
                        No donations found in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
