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

const serviceSpecs = [
  {
    number: '01',
    title: 'AI Agents',
    headline: 'AI Agents That Move Work Forward.',
    description: 'Build intelligent agents that understand requests, retrieve relevant information, and carry out useful tasks with less manual intervention.',
    capabilities: ['Customer support agents', 'Lead qualification and follow-ups', 'Knowledge retrieval', 'Task execution and routing'],
    visual: 'command-center',
  },
  {
    number: '02',
    title: 'Agentic AI',
    headline: 'Systems That Can Reason Through the Work.',
    description: 'Design goal-oriented AI systems that plan multi-step tasks, use connected tools, and adapt their actions within defined boundaries.',
    capabilities: ['Multi-step task planning', 'Tool and API orchestration', 'Goal-oriented workflows', 'Human approval and control'],
    visual: 'system-map',
  },
  {
    number: '03',
    title: 'AI Assistants',
    headline: 'Give Your Team a Smarter Way to Work.',
    description: 'Create AI assistants that help employees and customers find information, answer questions, and complete everyday work using relevant business context.',
    capabilities: ['Internal knowledge assistants', 'Customer-facing assistants', 'Document question answering', 'Context-aware guidance'],
    visual: 'conversation',
  },
  {
    number: '04',
    title: 'Smart Workflows',
    headline: 'Connect the Work. Not Just the Tools.',
    description: 'Connect the apps, teams, and processes your business already relies on so information moves smoothly from one step to the next.',
    capabilities: ['Cross-platform integrations', 'Event-based workflows', 'Data synchronization', 'Notifications and routing'],
    visual: 'operations-rail',
  },
  {
    number: '05',
    title: 'Process Automation',
    headline: 'Remove the Repetition. Keep the Control.',
    description: 'Automate recurring business processes with clear rules, dependable handoffs, error handling, and visibility into what happens at every stage.',
    capabilities: ['Repetitive process automation', 'Approvals and handoffs', 'Data entry and updates', 'Exception handling'],
    visual: 'before-after',
  },
  {
    number: '06',
    title: 'Intelligent Tasks',
    headline: 'Small Tasks. Meaningful Time Back.',
    description: 'Use AI to handle defined, repetitive tasks such as extracting information, categorizing requests, summarizing documents, and preparing structured outputs.',
    capabilities: ['Document extraction', 'Data classification', 'Content summarization', 'Repetitive task assistance'],
    visual: 'task-studio',
  },
  {
    number: '07',
    title: 'Business Systems',
    headline: 'A Better Foundation for Everyday Operations.',
    description: 'Build connected business systems that bring important information, internal processes, and team activities into a more organized working environment.',
    capabilities: ['Internal management systems', 'Operational dashboards', 'Data and process organization', 'Role-based workflows'],
    visual: 'architecture',
  },
  {
    number: '08',
    title: 'Custom Platforms',
    headline: 'Software Designed Around Your Business.',
    description: 'Create purpose-built platforms that match your business model, customer experience, and operational requirements instead of forcing your processes into a generic tool.',
    capabilities: ['Customer and membership portals', 'Admin and management platforms', 'Booking and service platforms', 'Business-specific applications'],
    visual: 'blueprint',
  },
  {
    number: '09',
    title: 'AI-Powered Apps',
    headline: 'Turn Useful AI Into Something People Can Use.',
    description: 'Build practical applications that combine intuitive interfaces, business data, AI capabilities, and integrations to solve specific real-world problems.',
    capabilities: ['AI-powered web applications', 'AI features in existing products', 'Intelligent search and recommendations', 'Connected application experiences'],
    visual: 'product-motion',
  },
]

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

function ServiceVisual({ service }) {
  const labels = service.visual === 'operations-rail'
    ? ['CRM', 'Communication', 'Business Data', 'Team Action']
    : service.visual === 'system-map'
      ? ['Plan', 'Tools', 'Execute', 'Verify']
      : service.visual === 'task-studio'
        ? ['Raw input', 'AI processing', 'Structured output', 'Human review']
        : ['Understand', 'Decide', 'Act']

  return (
    <div className={`service-visual service-visual--${service.visual}`} aria-label={`${service.title} visual`}>
      <div className="service-visual__grid" aria-hidden="true" />
      <div className="service-visual__core">{service.visual === 'conversation' ? 'AI' : service.number}</div>
      <div className="service-visual__path" aria-hidden="true" />
      <div className="service-visual__nodes">
        {labels.map((label, index) => <span key={label} style={{ '--node-index': index }}>{label}</span>)}
      </div>
      {service.visual === 'conversation' && (
        <div className="service-visual__conversation">
          <span>How did last quarter perform?</span>
          <i>Q4 performance brief.pdf</i>
          <b>Revenue grew 18% with the strongest lift from repeat customers.</b>
        </div>
      )}
      {service.visual === 'before-after' && (
        <div className="service-visual__compare"><span>FRAGMENTED</span><b>→</b><span>CONNECTED</span></div>
      )}
      {service.visual === 'architecture' && (
        <div className="service-visual__layers"><span>INFORMATION</span><span>PROCESSES</span><span>PEOPLE</span></div>
      )}
      {service.visual === 'blueprint' && (
        <div className="service-visual__modules"><span>EXPERIENCE</span><span>DATA</span><span>INTEGRATIONS</span></div>
      )}
    </div>
  )
}

function ServiceDetail({ service }) {
  return (
    <article className={`service-detail service-detail--${service.visual}`} id={`service-${service.number}`} data-reveal>
      <div className="service-detail__top"><span>{service.number}</span><span>{service.title}</span></div>
      <div className="service-detail__layout">
        <div className="service-detail__copy">
          <h2>{service.headline}</h2>
          <p className="service-detail__summary">{service.description}</p>
          <ul>{service.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>
          <Link to="/contact">Discuss {service.title} <b aria-hidden="true">↗</b></Link>
        </div>
        <ServiceVisual service={service} />
      </div>
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
          <div className="services-details">{serviceSpecs.map((service) => <ServiceDetail service={service} key={service.title} />)}</div>
        </div>
      </main>

      <section className="services-bottom"><div className="container" data-reveal><span className="services-kicker">READY WHEN YOU ARE</span><h2>Find the right<br /><em>service for the work.</em></h2><Link to="/contact">Start a conversation <span>↗</span></Link></div></section>
    </div>
  )
}
