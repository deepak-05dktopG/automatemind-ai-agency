import { PrimaryButton, SecondaryButton, ActionButton } from '../components/Buttons'

export function MobilePreviewPage() {
  return (
    <section className="mobile-preview-page">
      <div className="container">
        <div className="mobile-preview-shell">
          <span className="eyebrow eyebrow--light">MOBILE PREVIEW</span>
          <h1>Button motion test</h1>
          <p>
            Review the premium button treatment on a narrow screen and ensure the text animation stays crisp, readable, and consistent.
          </p>

          <div className="mobile-preview-actions">
            <PrimaryButton to="/contact">Start a Conversation</PrimaryButton>
            <SecondaryButton to="/how-we-work">See How We Work</SecondaryButton>
            <ActionButton type="button" onClick={() => window.alert('Mobile preview test button clicked')}>
              Book a Call
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  )
}
