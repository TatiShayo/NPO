// ============================================
// ErrorBoundary Component — UX Resilience & Recovery
// Catches render errors gracefully with recovery actions
// ============================================

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { FaExclamationTriangle, FaRedo, FaHome } from 'react-icons/fa'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onReset?: () => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  showDetails: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo })
    // In production, log to error reporting service
    if (process.env.NODE_ENV !== 'test') {
      console.error('[ErrorBoundary caught error]:', error, errorInfo)
    }
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    })
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  private toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }))
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="error-boundary-container" role="alert" style={{
          padding: '3rem 1.5rem',
          maxWidth: '640px',
          margin: '2rem auto',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(231, 76, 60, 0.3)',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          color: '#fff',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(231, 76, 60, 0.15)',
            color: '#E74C3C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: '1.8rem',
          }}>
            <FaExclamationTriangle />
          </div>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            An unexpected error occurred while loading this section. Our team has been notified.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={this.handleReset}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FaRedo /> Try Again
            </button>
            <a
              href="/"
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FaHome /> Return Home
            </a>
          </div>

          {this.state.error && (
            <div style={{ marginTop: '1.5rem' }}>
              <button
                onClick={this.toggleDetails}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                {this.state.showDetails ? 'Hide technical details' : 'Show technical details'}
              </button>

              {this.state.showDetails && (
                <pre style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  overflowX: 'auto',
                  color: '#ff8a80',
                  maxHeight: '200px',
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              )}
            </div>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
