import { SectionHeader } from '../SectionHeader'
import { EmptySection } from './EmptySection'

export function SolutionsHeroSection() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <SectionHeader
          eyebrow="SOLUTIONS"
          title="Solutions for the Work Your Business Does Every Day."
        />
      </div>
    </section>
  )
}

export function SolutionsGridSection() {
  return <EmptySection className="solutions-grid-section" title="Solutions" />
}

export function CustomSolutionSection() {
  return <EmptySection className="custom-solution-section" title="Custom Solutions" />
}
