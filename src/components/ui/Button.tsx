import type { ReactNode } from 'react'

type ButtonVariant = 'header' | 'outline' | 'primary'

const buttonVariantClasses: Record<ButtonVariant, string> = {
  header: 'button--header',
  outline: 'button--outline',
  primary: 'button--primary',
}

interface ButtonProps {
  children: ReactNode
  disabled?: boolean
  href?: `#${string}`
  variant?: ButtonVariant
}

export function Button({
  children,
  disabled = false,
  href,
  variant = 'primary',
}: ButtonProps) {
  const className = `button ${buttonVariantClasses[variant]}`

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
