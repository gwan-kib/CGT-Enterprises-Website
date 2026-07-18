interface ImagePlaceholderProps {
  label?: string
  ratio?: 'landscape' | 'portrait' | 'square'
}

export function ImagePlaceholder({
  label = 'Image Placeholder',
  ratio = 'landscape',
}: ImagePlaceholderProps) {
  return (
    <div
      aria-label={label}
      className={`image-placeholder image-placeholder--${ratio}`}
      role="img"
    >
      <span className="image-placeholder__label">{label}</span>
    </div>
  )
}
