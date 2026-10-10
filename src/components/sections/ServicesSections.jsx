import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { serviceData } from '../../data/siteData'
import { ServicesMotionGraphic } from '../motion-graphics/ServicesMotionGraphic'
import './ServicesSections.css'

const displayNames = {
  'Custom Intelligent Systems': 'Custom AI Solutions',
  'Custom Software Solutions': 'Intelligent Business Systems',
}

const getDisplayName = (service) => displayNames[service.title] || service.title
const serviceOrder = ['AI Agents', 'Agentic AI', 'Business Automation', 'Workflow Automation', 'Intelligent Process Automation', 'AI Integration', 'Custom Intelligent Systems', 'Custom Software Solutions']
const orderedServices = serviceOrder.map((title, index) => ({ ...serviceData.find((service) => service.title === title), displayNumber: String(index + 1).padStart(2, '0') }))

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }), { threshold: 0.1, rootMargin: '0px 0px -8% 0px' })

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

function ServiceDetail({ service }) {
  return (
    <article className="service-detail" id={`service-${service.displayNumber}`} data-reveal>
      <div className="service-detail__top"><span>{service.displayNumber}</span><span>{getDisplayName(service)}</span></div>
      <h2>{getDisplayName(service)}</h2>
      <p className="service-detail__summary">{service.summary}</p>
      <div className="service-detail__content">
        <div><span>WHAT IT SOLVES</span><p>{service.problem}</p></div>
        <div><span>HOW WE HELP</span><p>{service.approach}</p></div>
      </div>
      <div className="service-detail__workflow"><span className="service-detail__scene-label">SERVICE DETAIL / {getDisplayName(service)}</span><Link to="/contact">Discuss this service <b aria-hidden="true">↗</b></Link></div>
    </article>
  )
}

export function ServicesPageContent() {
  useReveal()

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container services-hero__inner" data-reveal>
          <div className="services-hero__content">
            <span className="services-kicker">AUTOMATEMIND / SERVICES</span>
            <h1>Services built<br /><em>around the work.</em></h1>
            <p>Practical AI, automation, and software services for businesses ready to work better.</p>
            <a className="services-mobile-action" href="#services-catalogue">See all services <span>↓</span></a>
          </div>
          <div className="services-hero__visual">
            <ServicesMotionGraphic />
          </div>
        </div>
        <div className="services-marquee"><div>{[...orderedServices, ...orderedServices].map((service, index) => <a href={`#service-${service.displayNumber}`} key={`${service.title}-${index}`}><span>{service.displayNumber}</span>{getDisplayName(service)} <b aria-hidden="true">↗</b></a>)}</div></div>
      </section>

      <main className="services-catalogue" id="services-catalogue">
        <div className="container">
          <header className="services-catalogue__heading" data-reveal>
            <div><span className="services-kicker">OUR SERVICES</span><h2>What we<br /><em>do best.</em></h2></div>
            <p>Explore each service to understand where AutomateMind can help your business.</p>
          </header>
          <nav className="services-selector" aria-label="Services list" data-reveal>{orderedServices.map((service) => <a href={`#service-${service.displayNumber}`} key={service.title}><span>{service.displayNumber}</span>{getDisplayName(service)}<b aria-hidden="true">↘</b></a>)}</nav>
          <div className="services-details">{orderedServices.map((service) => <ServiceDetail service={service} key={service.title} />)}</div>
        </div>
      </main>

      <section className="services-bottom"><div className="container" data-reveal><span className="services-kicker">READY WHEN YOU ARE</span><h2>Find the right<br /><em>service for the work.</em></h2><Link to="/contact">Start a conversation <span>↗</span></Link></div></section>
    </div>
  )
}
