// ============================================
// Card Component — Reusable glassmorphism card
// ============================================

import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  glow?: boolean
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export default function Card({
  children,
  glow = false,
  className = '',
  onClick,
  ...rest
}: CardProps) {
  const classes = ['card', glow ? 'card-glow' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} onClick={onClick} {...rest}>
      {children}
    </div>
  )
}
