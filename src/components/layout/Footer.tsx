import { business } from '../../data/business'
import { navigationItems } from '../../data/navigation'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <a className="site-footer__brand" href="#home">
            {business.name}
          </a>
          <p className="site-footer__note">Initial website wireframe</p>
        </div>

        <nav aria-label="Footer">
          <ul className="site-footer__links">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="site-footer__status">
          Placeholder content only. No forms are connected.
        </p>
      </div>
    </footer>
  )
}
