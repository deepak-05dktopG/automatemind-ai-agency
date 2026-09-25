import { SectionHeader } from '../SectionHeader'
import { EmptySection } from './EmptySection'

export function IndustriesHeroSection() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <SectionHeader
          eyebrow="INDUSTRIES"
          title="Automation That Fits the Way Your Industry Works."
        />
      </div>
    </section>
  )
}

export function IndustriesExplorerSection() {
  return <EmptySection className="industries-explorer-section" title="Industry Workflows" />
}
