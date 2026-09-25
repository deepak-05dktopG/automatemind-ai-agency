import { SectionHeader } from '../SectionHeader'
import { EmptySection } from './EmptySection'

export function ServicesHeroSection() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <SectionHeader
          eyebrow="SERVICES"
          title="AI and Automation Built Around Your Business."
          text="AutomateMind designs and builds practical intelligent systems that remove repetitive work and improve how your business runs."
        />
      </div>
    </section>
  )
}

export function ServicesGridSection() {
  return <EmptySection className="services-grid-section" title="Our Services" />
}
