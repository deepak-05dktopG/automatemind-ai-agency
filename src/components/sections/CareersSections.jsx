import { SectionHeader } from '../SectionHeader'
import { EmptySection } from './EmptySection'

export function CareersHeroSection() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <SectionHeader
          eyebrow="CAREERS"
          title="Build Systems That Make Work Better."
          text="We look for people who like solving real operational problems with careful thinking, clear systems, and practical execution."
        />
      </div>
    </section>
  )
}

export function CareersRolesSection() {
  return <EmptySection className="careers-roles-section" title="Open Roles" />
}
