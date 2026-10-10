import { PrimaryButton, SecondaryButton } from '../Buttons'
import { EmptySection } from './EmptySection'
import SplitText from '../SplitText'
import FoldText from '../FoldText'
import TrueFocus from '../TrueFocus'
import { HomeAvatarGuide } from '../HomeAvatarGuide'
import { ProblemMotionGraphic } from '../motion-graphics/ProblemMotionGraphic'
import { HowItWorksMotionGraphic } from '../motion-graphics/HowItWorksMotionGraphic'
import { SolutionStepsMotionGraphic } from '../motion-graphics/SolutionStepsMotionGraphic'
import { IndustrySectionMotionGraphic } from '../motion-graphics/IndustrySectionMotionGraphic'
import { BusinessOutcomesMotionGraphic } from '../motion-graphics/BusinessOutcomesMotionGraphic'
import { CtaMotionGraphic } from '../motion-graphics/CtaMotionGraphic'
export { HomeWhatWeBuildSection } from './WhatWeBuildSection'

export function HomeHeroSection() {
  return (
    <section id="home-hero" className="skeleton-hero skeleton-hero--home hero-reference">
      <div className="container skeleton-hero__inner skeleton-hero__inner--home">
        <div>
          <HomeAvatarGuide as="div" side="right" animation="curious">
            <div className="eyebrow hero-reference__eyebrow-animation">
              <TrueFocus
                sentence="AI AUTOMATION BUSINESS-GROWTH"
                blurAmount={0.8}
                borderColor="#d8b15e"
                glowColor="rgba(216, 177, 94, 0.65)"
                animationDuration={0.35}
                pauseBetweenAnimations={1.1}
                highlightIndices={[0, 1, 2, 3, 4, 5]}
              />
            </div>
          </HomeAvatarGuide>
          <h1>
            <span>
              < FoldText
                text="Make Your Business Work Smarter."
                splitBy="word"
                hinge="top"
                duration={1.5}
                stagger={0.06}
                fontSize="inherit"
                fontWeight="inherit"
                color="inherit"
                className="hero-reference__headline-animation"
              />
            </span>
            <SplitText
              text="Automate the Work. Accelerate the Growth."
              className="hero-reference__headline-animation"
              tag="em"
              splitType="chars"
              delay={24}
              duration={1.5}
              from={{ opacity: 0, y: 12 }}
            />
          </h1>
          <p>
            <SplitText
              text={'We turn repetitive processes into intelligent systems that save time,\nreduce complexity, and help your business grow.'}
              tag="em"
              splitType="chars"
              delay={50}
              duration={1.5}
              from={{ opacity: 0, y: 12 }}
              className="hero-reference__support-animation"
            />
          </p>
          <div className="hero-actions">
            <PrimaryButton to="/contact">Start a Conversation</PrimaryButton>
            <SecondaryButton to="/how-we-work">See How We Work →</SecondaryButton>
          </div>
        </div>
      </div>
      <a className="hero-scroll-indicator" href="#problem-section" aria-label="Scroll to the next section">
        <span className="hero-scroll-indicator__icon" aria-hidden="true">
          <span />
        </span>
      </a>
    </section>
  )
}

export function HomeProblemsSection() {
  return (
    <section id="problem-section" className="section problem-section">
      <div className="container problem-section__inner">
        <div>
          <HomeAvatarGuide side="right" animation="angry">
            <span className="eyebrow">THE PROBLEM</span>
          </HomeAvatarGuide>
        </div>
        <div className="problem-section__intro">
          <h2>
            Your Business Shouldn’t Be Held Back by Its Processes.
          </h2>
        </div>

        <div className="problem-section__description">
          <p>As your business grows, so does the work behind it. Repetitive tasks, slow handoffs, scattered information, and manual follow-ups can quietly consume time and create unnecessary complexity.</p>
        </div>

        <div className="problem-section__bottom">
          <ProblemMotionGraphic />

          <div className="problem-section__closing">
            <h3>More work shouldn’t mean more complexity.</h3>
            <p>Automate the repetitive. Simplify the complex. Give your team more time to focus on what matters.</p>
            <PrimaryButton to="/solutions">Explore Our Solutions</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeSolutionsSection() {
  return (
    <section id="solutions-section" className="homepage-solutions homepage-solutions--client">
      <div className="container homepage-solutions__inner">
        <div className="homepage-solutions__editorial-head">
          <div>
            <HomeAvatarGuide side="left" animation="searching">
              <span className="eyebrow">SOLUTIONS</span>
            </HomeAvatarGuide>
            <h2>Make the hard parts of work feel simple.</h2>
          </div>
          <p>You do not need to understand the technology. You only need to know where work feels harder than it should.</p>
        </div>

        <div className="homepage-solutions__editorial-flow">
          <div className="homepage-solutions__flow-label">A SIMPLE WAY TO SEE THE DIFFERENCE</div>
          <SolutionStepsMotionGraphic />
        </div>

        <div className="homepage-solutions__promise">
          <PrimaryButton to="/solutions">Explore Solutions</PrimaryButton>
        </div>
      </div>
    </section>
  )
}

export function HomeHowWeWorkPreviewSection() {
  return (
    <section id="how-we-work-section" className="homepage-how-it-works">
      <div className="container homepage-how-it-works__inner">
        <div className="homepage-how-it-works__intro">
          <HomeAvatarGuide side="right" animation="thinking">
            <span className="eyebrow">HOW IT WORKS</span>
          </HomeAvatarGuide>
          <h2>You Bring the Problem. We Build the Solution.</h2>
        </div>

        <HowItWorksMotionGraphic />

        <p className="homepage-how-it-works__closing">
          You focus on your business. We make it work smarter.
        </p>
      </div>
    </section>
  )
}

export function HomeIndustriesPreviewSection() {
  const featuredIndustries = [
    { type: 'People-first operations', note: 'When service, scheduling, and follow-up all need to move together.' },
    { type: 'Relationship-led businesses', note: 'When every opportunity depends on timely communication and trust.' },
    { type: 'Expert-led services', note: 'When client work is valuable, but admin keeps getting in the way.' },
    { type: 'Growing teams', note: 'When the business is growing faster than the way work is organized.' },
  ]

  return (
    <section id="industries-section" className="homepage-industries">
      <div className="container homepage-industries__inner">
        <div className="homepage-industries__intro">
          <HomeAvatarGuide side="right" animation="curious">
            <span className="eyebrow">INDUSTRIES</span>
          </HomeAvatarGuide>
          <h2>Every industry has its own kind of busy.</h2>
          <p>We start with the work that matters in your world, then shape practical systems around the way your team already operates.</p>
        </div>

        <div className="homepage-industries__showcase" aria-label="Featured industries">
          {featuredIndustries.map((industry, index) => (
            <article className="homepage-industries__industry" key={industry.type}>
              <IndustrySectionMotionGraphic index={index} />
              <span className="homepage-industries__number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{industry.type}</h3>
              <p>{industry.note}</p>
              <span className="homepage-industries__arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>

        <div className="homepage-industries__footer">
          <span>YOUR BUSINESS IS SPECIFIC. YOUR SYSTEMS SHOULD BE TOO.</span>
          <PrimaryButton to="/industries">Explore Industries</PrimaryButton>
        </div>
      </div>
    </section>
  )
}

export function HomeOutcomesSection() {
  const outcomes = [
    { number: '01', title: 'More Time', text: 'Your team spends less of the day repeating work and more of it moving the business forward.' },
    { number: '02', title: 'Faster Operations', text: 'Everyday processes move with fewer pauses, bottlenecks, and manual handoffs.' },
    { number: '03', title: 'Better Customer Experience', text: 'Important customer moments happen with more speed, context, and consistency.' },
    { number: '04', title: 'Fewer Manual Tasks', text: 'Repeat work follows a dependable rhythm instead of relying on memory.' },
    { number: '05', title: 'Smarter Decisions', text: 'Useful information reaches the people who need it while it still matters.' },
    { number: '06', title: 'Ready to Scale', text: 'Your way of working becomes stronger as your team and business grow.' },
  ]

  return (
    <section id="outcomes-section" className="homepage-outcomes homepage-outcomes--ledger">
      <div className="container homepage-outcomes__ledger-inner">
        <div className="homepage-outcomes__ledger-head">
          <div>
            <HomeAvatarGuide side="left" animation="proud">
              <span className="eyebrow">BUSINESS OUTCOMES</span>
            </HomeAvatarGuide>
            <h2>What Changes When Your Business Works Smarter.</h2>
          </div>
          <p>Automation isn't the outcome.<br />A better-running business is.</p>
        </div>

        <BusinessOutcomesMotionGraphic outcomes={outcomes} />

        <div className="homepage-outcomes__ledger-footer">
          <span>THE RESULT</span>
          <strong>A business that works better.</strong>
        </div>
      </div>
    </section>
  )
}

export function HomeWhyAutomateMindSection() {
  return <EmptySection className="why-section" title="Why AutomateMind" />
}

export function HomeFinalCtaSection() {
  return (
    <section id="final-cta-section" className="homepage-final-cta">
      <CtaMotionGraphic />
      <div className="container homepage-final-cta__inner">
        <div className="homepage-final-cta__copy">
          <HomeAvatarGuide side="right" animation="excited">
            <span className="eyebrow">THE NEXT STEP</span>
          </HomeAvatarGuide>
          <h2>Ready to Automate What Slows You Down?</h2>
          <p>Tell us where work feels heavier than it should. We will help you find the first practical change that makes a real difference.</p>
        </div>
        <div className="homepage-final-cta__action">
          <PrimaryButton to="/contact">Start a Conversation</PrimaryButton>
          <span>Bring the problem. Leave with a clearer way forward.</span>
        </div>
      </div>
    </section>
  )
}
