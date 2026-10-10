import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { industryList, navItems, serviceData, solutionData } from '../data/siteData'
import logoImg from '../assets/agency_logo.png'
import { AgencyName } from './AgencyName'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState(null)
  const isScrolledRef = useRef(false)
  const headerRef = useRef(null)

  const mobileGroups = {
    Services: serviceData.slice(0, 5).map((item) => item.title),
    Solutions: solutionData.slice(0, 5),
    Industries: industryList.slice(0, 5).map((item) => item.name),
  }

  const createSubmenuPath = (label, item) => {
    const slug = item.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return `/${label.toLowerCase()}#${slug}`
  }

  const toggleMobileGroup = (label) => {
    setExpandedMenu((current) => (current === label ? null : label))
  }

  const closeMobileMenu = () => {
    setMenuOpen(false)
    setExpandedMenu(null)
  }

  useEffect(() => {
    const handleScroll = () => {
      const nextIsScrolled = window.scrollY > 12
      if (nextIsScrolled === isScrolledRef.current) return

      isScrolledRef.current = nextIsScrolled
      headerRef.current?.classList.toggle('is-scrolled', nextIsScrolled)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useLayoutEffect(() => {
    headerRef.current?.classList.toggle('is-scrolled', isScrolledRef.current)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const mobileMenu = (
    <>
      <button className={`mobile-menu-backdrop${menuOpen ? ' open' : ''}`} type="button" aria-label="Close navigation menu" onClick={closeMobileMenu} />
      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-head">
          <Link to="/" className="mobile-menu-brand" aria-label="AutomateMind home" onClick={closeMobileMenu}>
            <span className="mobile-menu-logo" aria-hidden="true">
              <img src={logoImg} alt="" className="brand-img" />
            </span>
            <AgencyName />
          </Link>
          <button type="button" className="mobile-menu-close" aria-label="Close navigation menu" onClick={closeMobileMenu}>
            ×
          </button>
        </div>
        {navItems.map((item) => {
          const items = mobileGroups[item.label]

          if (!items) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `mobile-link${isActive ? ' active' : ''}`}
                end={item.path === '/'}
                onClick={closeMobileMenu}
              >
                {item.label}
              </NavLink>
            )
          }

          const isExpanded = expandedMenu === item.label

          return (
            <div className={`mobile-group${isExpanded ? ' open' : ''}`} key={item.path}>
              <button
                type="button"
                className="mobile-group-toggle"
                aria-expanded={isExpanded}
                onClick={() => toggleMobileGroup(item.label)}
              >
                <span>{item.label}</span>
                <span className="mobile-group-icon" aria-hidden="true">{isExpanded ? '−' : '+'}</span>
              </button>
              <div className="mobile-group-links">
                {items.map((subItem) => (
                  <NavLink
                    key={subItem}
                    to={createSubmenuPath(item.label, subItem)}
                    className="mobile-sub-link"
                    onClick={closeMobileMenu}
                  >
                    <span>{subItem}</span>
                    <span aria-hidden="true">↗</span>
                  </NavLink>
                ))}
                <NavLink to={item.path} className="mobile-sub-link mobile-sub-link--more" onClick={closeMobileMenu}>
                  <span>See More</span>
                  <span aria-hidden="true">↗</span>
                </NavLink>
              </div>
            </div>
          )
        })}
        <Link to="/contact" className="button primary-button mobile-cta" onClick={closeMobileMenu}>
          <span>Start a Conversation</span>
          <span className="button-arrow">→</span>
        </Link>
      </div>
    </>
  )

  return (
    <>
    <header ref={headerRef} className={`site-header${menuOpen ? ' menu-open' : ''}`}>
      <div className="container nav-wrap">
        <Link to="/" className="brand-mark" aria-label="AutomateMind home">
          <span className="brand-logo" aria-hidden="true">
            <img src={logoImg} alt="" className="brand-img" />
          </span>
          <AgencyName />
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={item.path === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/contact" className="button primary-button nav-cta">
            <span>Let&apos;s Talk</span>
            <span className="button-arrow">→</span>
          </Link>
          <button
            type="button"
            className={`menu-toggle${menuOpen ? ' open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

    </header>
    {createPortal(mobileMenu, document.body)}
    </>
  )
}
