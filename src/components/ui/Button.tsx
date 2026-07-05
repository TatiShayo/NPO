// ============================================
// Button Component — Reusable CTA button
// ============================================

import React from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  children: React.ReactNode
  to?: string
  href?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  variant?: string
  size?: string
  pulse?: boolean
  block?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  ariaLabel?: string
  [key: string]: any
}

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'normal',
  pulse = false,
  block = false,
  disabled = false,
  type = 'button',
  className = '',
  ariaLabel,
  ...rest
}: ButtonProps) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size === 'large' ? 'btn-large' : '',
    pulse ? 'btn-primary-pulse' : '',
    block ? 'btn-block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = children

  // Internal link (React Router)
  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        {...rest}
      >
        {content}
      </Link>
    )
  }

  // External link
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        {...rest}
      >
        {content}
      </a>
    )
  }

  // Button element
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {content}
    </button>
  )
}
