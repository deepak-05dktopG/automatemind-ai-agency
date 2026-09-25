import { SectionHeader } from '../SectionHeader'
import { EmptySection } from './EmptySection'

export function ContactHeroSection() {
  return (
    <section className="page-hero contact-hero">
      <div className="container contact-layout">
        <div className="contact-copy">
          <SectionHeader
            eyebrow="CONTACT"
            title="Let&apos;s Find What Your Business Can Automate."
            text="Tell us what takes too much time, creates bottlenecks, or requires repetitive manual work."
          />
        </div>
      </div>
    </section>
  )
}

export function ContactFormSection() {
  return <EmptySection className="contact-form-section" title="Start a Conversation" />
}
