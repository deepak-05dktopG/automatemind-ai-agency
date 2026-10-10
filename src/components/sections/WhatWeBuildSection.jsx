import { PrimaryButton } from '../Buttons'
import { HomeAvatarGuide } from '../HomeAvatarGuide'
import { ServicesMotion } from '../motion-graphics/ServicesMotion'

export function HomeWhatWeBuildSection() {
  return (
    <section id="what-we-build-section" className="capability-section">
      <div className="container capability-section__inner">
        <div className="capability-section__top">
          <div className="capability-section__heading">
            <HomeAvatarGuide side="left" animation="thinking">
              <span className="capability-section__eyebrow">WHAT WE BUILD</span>
            </HomeAvatarGuide>
            <h2>
              Systems that keep work moving
              <br />
              without manual drag.
            </h2>
            <p>
              We design and deliver intelligent AI-powered operating systems that connect your
              people, processes, and information, helping your team move faster with less friction
              and stronger business consistency.
            </p>
          </div>
        </div>

        <ServicesMotion />

        <div className="capability-section__cta">
          <PrimaryButton to="/services">Explore Services</PrimaryButton>
        </div>
      </div>
    </section>
  )
}
