import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  disabled?: boolean
  href?: `#${string}`
  variant?: 'outline' | 'primary'
}

export function Button({
  children,
  disabled = false,
  href,
  variant = 'primary',
}: ButtonProps) {
  const className = `button button--${variant}`

  if (href && !disabled) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button
      aria-disabled={disabled}
      className={className}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  )
}
