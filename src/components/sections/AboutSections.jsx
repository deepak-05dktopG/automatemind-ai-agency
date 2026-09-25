import { SectionHeader } from '../SectionHeader'
import { EmptySection } from './EmptySection'

export function AboutHeroSection() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <SectionHeader
          eyebrow="ABOUT"
          title="Building Practical Intelligence for Real Businesses."
        />
      </div>
    </section>
  )
}

export function AboutWhySection() {
  return <EmptySection className="about-why-section" title="Why AutomateMind Exists" />
}

export function AboutPrinciplesSection() {
  return <EmptySection className="about-principles-section" title="Our Principles" />
}
