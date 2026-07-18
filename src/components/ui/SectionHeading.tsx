interface SectionHeadingProps {
  align?: 'center' | 'left'
  description: string
  eyebrow: string
  id: string
  title: string
}

export function SectionHeading({
  align = 'left',
  description,
  eyebrow,
  id,
  title,
}: SectionHeadingProps) {
  return (
    <header className={`section-heading section-heading--${align}`}>
      <p className="section-heading__eyebrow">{eyebrow}</p>
      <h2 className="section-heading__title" id={id}>
        {title}
      </h2>
      <p className="section-heading__description">{description}</p>
    </header>
  )
}
