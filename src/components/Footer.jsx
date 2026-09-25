import { Link } from 'react-router-dom'
import logoImg from '../assets/agency_logo.png'
import { AgencyName } from './AgencyName'

const footerLinks = [
  { label: 'Services', path: '/services' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Industries', path: '/industries' },
  { label: 'How We Work', path: '/how-we-work' },
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
]

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="brand-mark" aria-label="AutomateMind home">
            <span className="brand-logo" aria-hidden="true">
              <img src={logoImg} alt="AutomateMind Logo" className="brand-img" />
            </span>
            <AgencyName />
          </Link>
          <p>Intelligent automation for real business growth.</p>
        </div>

        <div className="footer-links">
          {footerLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer-meta">
          <a href="mailto:hello@automatemind.com">hello@automatemind.com</a>
          <a href="tel:+1-800-555-0199">+1 (800) 555-0199</a>
          <span>© 2026 AutomateMind</span>
        </div>
      </div>
    </footer>
  )
}
