import { business } from '../../data/business'
import { navigationItems } from '../../data/navigation'
import { Button } from '../ui/Button'

function NavigationLinks() {
  return (
    <ul className="site-nav__list">
      {navigationItems.map((item) => (
        <li key={item.href}>
          <a className="site-nav__link" href={item.href}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__shell">
        <div className="site-header__top">
          <a
            aria-label="CGT Enterprises home"
            className="site-brand"
            href="#home"
          >
            <span className="site-brand__mark">CGT</span>
            <span className="site-brand__name">{business.name}</span>
          </a>

          <nav className="site-nav" aria-label="Primary">
            <NavigationLinks />
          </nav>

          <div className="site-header__action">
            <Button href="#contact">Contact</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
