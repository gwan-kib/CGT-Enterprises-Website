import type { ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
  className?: string
  id: string
  labelledBy: string
  tone?: 'brand' | 'dark' | 'default' | 'subtle'
}

export function SectionContainer({
  children,
  className,
  id,
  labelledBy,
  tone = 'default',
}: SectionContainerProps) {
  const classes = ['page-section', `page-section--${tone}`, className]
    .filter(Boolean)
    .join(' ')
  const headerContrast = tone === 'dark' ? 'on-dark' : 'on-light'

  return (
    <section
      aria-labelledby={labelledBy}
      data-header-contrast={headerContrast}
      className={classes}
      id={id}
    >
      <div className="page-section__inner">{children}</div>
    </section>
  )
}
