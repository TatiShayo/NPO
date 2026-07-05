// ============================================
// Badge Component — Reusable badge/pill
// ============================================

import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: string
  className?: string
}

export default function Badge({ children, variant = 'water', className = '' }: BadgeProps) {
  const classes = ['badge', `badge-${variant.toLowerCase()}`, className]
    .filter(Boolean)
    .join(' ')

  return <span className={classes}>{children}</span>
}
