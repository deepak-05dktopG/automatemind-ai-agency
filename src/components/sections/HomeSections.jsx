import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { PrimaryButton, SecondaryButton } from '../Buttons'
import { EmptySection } from './EmptySection'
import logoImg from '../../assets/agency_logo.png'
import { AgencyName } from '../AgencyName'
import SplitText from '../SplitText'
import FoldText from '../FoldText'
import TrueFocus from '../TrueFocus'

export function HomeHeroSection() {
  return (
    <section className="skeleton-hero skeleton-hero--home hero-reference">
      <div className="container skeleton-hero__inner skeleton-hero__inner--home">
        <div>
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
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 90,
    })

    AOS.refresh()
  }, [])

  const problems = [
    'Doing the Same Work Again',
    'Work Does Not Connect',
    'Chasing People for Updates',
    'Information in Different Places',
    'Decisions Take Too Long',
    'Work Keeps Getting Harder',
  ]

  return (
    <section id="problem-section" className="section problem-section">
      <div className="container problem-section__inner">
        <div className="problem-section__intro" data-aos="fade-up">
          <div data-aos="fade-up" data-aos-delay="80">
            <span className="eyebrow">THE PROBLEM</span>
          </div>
          <h2 data-aos="fade-up" data-aos-delay="160">
            Your Business Shouldn’t Be Held Back by Its Processes.
          </h2>
        </div>

        <div className="problem-section__description" data-aos="fade-up" data-aos-delay="240">
          <p>As your business grows, so does the work behind it. Repetitive tasks, slow handoffs, scattered information, and manual follow-ups can quietly consume time and create unnecessary complexity.</p>
        </div>

        <div className="problem-section__bottom">
          <div className="problem-workflow" aria-label="Business process problems" data-aos="fade-right" data-aos-delay="280">
            <svg className="problem-workflow__connectors" viewBox="0 0 600 360" aria-hidden="true">
              <path d="M118 78 C180 78 205 150 250 176" />
              <path d="M300 62 C300 112 300 140 300 176" />
              <path d="M482 78 C420 78 395 150 350 176" />
              <path d="M118 282 C180 282 205 210 250 184" />
              <path d="M300 298 C300 248 300 220 300 184" />
              <path d="M482 282 C420 282 395 210 350 184" />
            </svg>
            {problems.map((problem, index) => (
              <div className={`problem-workflow__node problem-workflow__node--${index + 1}`} key={problem}>
                <strong>{problem}</strong>
              </div>
            ))}
            <div className="problem-workflow__core">
              <span>BUSINESS<br />LOSS</span>
            </div>
          </div>

          <div className="problem-section__closing" data-aos="fade-left" data-aos-delay="360">
            <h3>More work shouldn’t mean more complexity.</h3>
            <p>Automate the repetitive. Simplify the complex. Give your team more time to focus on what matters.</p>
            <PrimaryButton to="/solutions">Explore Our Solutions</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeWhatWeBuildSection() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 90,
    })

    AOS.refresh()
  }, [])

  return (
    <section className="capability-section">
      <div className="container capability-section__inner">
        <div className="capability-section__top" data-aos="fade-left">
          <div className="capability-section__heading">
            <span className="capability-section__eyebrow">WHAT WE BUILD</span>
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

        <div className="capability-workflow" aria-label="What we build workflow" data-aos="fade-up" data-aos-delay="120">
          <div className="capability-workflow__source" data-aos="zoom-in" data-aos-delay="220">
            <img src={logoImg} alt="" className="capability-workflow__source-logo" />
            <AgencyName className="capability-workflow__source-name" />
          </div>

          <div className="capability-workflow__pulse" aria-hidden="true" data-aos="fade-down" data-aos-delay="320" />

          <div className="capability-workflow__lanes">
            <div className="capability-workflow__lane" data-aos="fade-up" data-aos-delay="380">
              <div className="capability-workflow__lane-head" data-aos="fade-right" data-aos-delay="440">
                <span className="capability-workflow__lane-index">01</span>
                <strong>AI Systems</strong>
              </div>
              <div className="capability-workflow__lane-track" aria-hidden="true" />
              <div className="capability-workflow__stack">
              <span data-aos="fade-right" data-aos-delay="500">AI Agents</span>
              <span data-aos="fade-right" data-aos-delay="560">AI Assistants</span>
              <span data-aos="fade-right" data-aos-delay="620">Agentic AI</span>
              </div>
            </div>

            <div className="capability-workflow__lane" data-aos="fade-up" data-aos-delay="460">
              <div className="capability-workflow__lane-head" data-aos="fade-up" data-aos-delay="520">
                <span className="capability-workflow__lane-index">02</span>
                <strong>Automation</strong>
              </div>
              <div className="capability-workflow__lane-track" aria-hidden="true" />
              <div className="capability-workflow__stack">
                <span data-aos="fade-up" data-aos-delay="580">Smart Workflows</span>
                <span data-aos="fade-up" data-aos-delay="640">Process Automation</span>
                <span data-aos="fade-up" data-aos-delay="700">Intelligent Tasks</span>
              </div>
            </div>

            <div className="capability-workflow__lane" data-aos="fade-up" data-aos-delay="540">
              <div className="capability-workflow__lane-head" data-aos="fade-left" data-aos-delay="600">
                <span className="capability-workflow__lane-index">03</span>
                <strong>Custom Software</strong>
              </div>
              <div className="capability-workflow__lane-track" aria-hidden="true" />
              <div className="capability-workflow__stack">
                <span data-aos="fade-left" data-aos-delay="660">Business Systems</span>
                <span data-aos="fade-left" data-aos-delay="720">Custom Platforms</span>
                <span data-aos="fade-left" data-aos-delay="780">AI-Powered Apps</span>
              </div>
            </div>
          </div>
        </div>

        <div className="capability-section__cta" data-aos="fade-up" data-aos-delay="860">
          <PrimaryButton to="/services">Explore Services</PrimaryButton>
        </div>
      </div>
    </section>
  )
}

export function HomeSolutionsSection() {
  const solutionThemes = [
    { number: '01', label: 'YOU NOTICE', title: 'Work takes too long', text: 'People repeat the same updates, chase the same answers, and lose time on tasks that should be simple.' },
    { number: '02', label: 'WE MAKE IT', title: 'Work moves by itself', text: 'We connect the steps, tools, and people so the right action happens without constant manual follow-up.' },
    { number: '03', label: 'YOU GET', title: 'More room to grow', text: 'Your team spends more time serving customers and making decisions, and less time holding the process together.' },
  ]

  return (
    <section className="homepage-solutions homepage-solutions--client">
      <div className="container homepage-solutions__inner">
        <div className="homepage-solutions__editorial-head" data-aos="fade-up">
          <div>
            <span className="eyebrow">SOLUTIONS</span>
            <h2>Make the hard parts of work feel simple.</h2>
          </div>
          <p>You do not need to understand the technology. You only need to know where work feels harder than it should.</p>
        </div>

        <div className="homepage-solutions__editorial-flow">
          <div className="homepage-solutions__flow-label" data-aos="fade-right">A SIMPLE WAY TO SEE THE DIFFERENCE</div>
          <div className="homepage-solutions__theme-list">
            {solutionThemes.map((theme, index) => (
              <article className="homepage-solutions__theme" key={theme.number} data-aos="fade-up" data-aos-delay={120 + index * 100}>
                <span>{theme.number}</span>
                <div>
                  <small>{theme.label}</small>
                  <h3>{theme.title}</h3>
                  <p>{theme.text}</p>
                </div>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>

        <div className="homepage-solutions__promise" data-aos="fade-up" data-aos-delay="560">
          <PrimaryButton to="/solutions" shuffle={false}>Explore Solutions</PrimaryButton>
        </div>
      </div>
    </section>
  )
}

export function HomeHowWeWorkPreviewSection() {
  const stages = [
    { number: '01', title: 'Tell Us', text: 'You share what feels slow, repetitive, or harder than it should be.' },
    { number: '02', title: 'Understand', text: 'We learn how your team works today and where the friction begins.' },
    { number: '03', title: 'Find the Opportunity', text: 'Together, we choose the change that can make the biggest difference.' },
    { number: '04', title: 'Build & Connect', text: 'We shape the solution around your people, process, and existing tools.' },
    { number: '05', title: 'Launch & Improve', text: 'You put it to work, and we keep refining what makes your business stronger.' },
  ]

  return (
    <section className="homepage-how-it-works">
      <div className="container homepage-how-it-works__inner">
        <div className="homepage-how-it-works__intro" data-aos="fade-up">
          <span className="eyebrow">HOW IT WORKS</span>
          <h2>You Bring the Problem. We Build the Solution.</h2>
        </div>

        <div className="homepage-how-it-works__journey" aria-label="AutomateMind transformation journey">
          <svg className="homepage-how-it-works__path" viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true">
            <path d="M26 126 C150 34 206 34 290 102 S430 170 500 88 S642 12 710 94 S852 162 974 46" />
          </svg>

          {stages.map((stage, index) => (
            <article
              className={`homepage-how-it-works__stage homepage-how-it-works__stage--${index + 1}`}
              key={stage.number}
              data-aos="fade-up"
              data-aos-delay={120 + index * 100}
            >
              <span className="homepage-how-it-works__stage-number">{stage.number}</span>
              <span className="homepage-how-it-works__stage-dot" aria-hidden="true" />
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </article>
          ))}
        </div>

        <p className="homepage-how-it-works__closing" data-aos="fade-up" data-aos-delay="680">
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
    <section className="homepage-industries">
      <div className="container homepage-industries__inner">
        <div className="homepage-industries__intro" data-aos="fade-up">
          <span className="eyebrow">INDUSTRIES</span>
          <h2>Every industry has its own kind of busy.</h2>
          <p>We start with the work that matters in your world, then shape practical systems around the way your team already operates.</p>
        </div>

        <div className="homepage-industries__showcase" aria-label="Featured industries">
          {featuredIndustries.map((industry, index) => (
            <article className="homepage-industries__industry" key={industry.type} data-aos="fade-up" data-aos-delay={120 + index * 100}>
              <span className="homepage-industries__number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{industry.type}</h3>
              <p>{industry.note}</p>
              <span className="homepage-industries__arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>

        <div className="homepage-industries__footer" data-aos="fade-up" data-aos-delay="560">
          <span>YOUR BUSINESS IS SPECIFIC. YOUR SYSTEMS SHOULD BE TOO.</span>
          <PrimaryButton to="/industries" shuffle={false}>Explore Industries</PrimaryButton>
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
    <section className="homepage-outcomes homepage-outcomes--ledger">
      <div className="container homepage-outcomes__ledger-inner">
        <div className="homepage-outcomes__ledger-head" data-aos="fade-up">
          <div>
            <span className="eyebrow">BUSINESS OUTCOMES</span>
            <h2>What Changes When Your Business Works Smarter.</h2>
          </div>
          <p>Automation isn't the outcome.<br />A better-running business is.</p>
        </div>

        <div className="homepage-outcomes__ledger-body" aria-label="Business outcomes">
          <div className="homepage-outcomes__ledger-rule" aria-hidden="true"><span /></div>
          {outcomes.map((outcome, index) => (
            <article className="homepage-outcomes__ledger-item" key={outcome.number} data-aos="fade-up" data-aos-delay={120 + index * 70}>
              <span className="homepage-outcomes__ledger-number">{outcome.number}</span>
              <div>
                <h3>{outcome.title}</h3>
                <p>{outcome.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="homepage-outcomes__ledger-footer" data-aos="fade-up" data-aos-delay="620">
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
    <section className="homepage-final-cta">
      <div className="homepage-final-cta__lines" aria-hidden="true" />
      <div className="container homepage-final-cta__inner">
        <div className="homepage-final-cta__copy" data-aos="fade-up">
          <span className="eyebrow">THE NEXT STEP</span>
          <h2>Ready to Automate What Slows You Down?</h2>
          <p>Tell us where work feels heavier than it should. We will help you find the first practical change that makes a real difference.</p>
        </div>
        <div className="homepage-final-cta__action" data-aos="fade-up" data-aos-delay="180">
          <PrimaryButton to="/contact" shuffle={false}>Start a Conversation</PrimaryButton>
          <span>Bring the problem. Leave with a clearer way forward.</span>
        </div>
      </div>
    </section>
  )
}
