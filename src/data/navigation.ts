export interface NavigationItem {
  href: `#${string}`
  label: string
}

export const navigationItems: NavigationItem[] = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#leave-review', label: 'Leave a review' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]
