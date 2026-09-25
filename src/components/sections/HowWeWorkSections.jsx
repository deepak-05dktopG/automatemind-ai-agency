import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { SectionHeader } from '../SectionHeader'
import { EmptySection } from './EmptySection'

export function HowWeWorkHeroSection() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <SectionHeader
          eyebrow="HOW WE WORK"
          title="From Business Problem to Intelligent System."
        />
      </div>
    </section>
  )
}

export function HowWeWorkTimelineSection() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    })

    AOS.refresh()
  }, [])

  const today = [
    'Repetitive work',
    'Missed follow-ups',
    'Manual tasks',
    'Slow processes',
    'Scattered information',
  ]

  const after = [
    'Less manual work',
    'Faster processes',
    'Automatic follow-ups',
    'Connected workflows',
    'More time for the team',
  ]

  const steps = [
    { number: '01', title: 'Tell Us' },
    { number: '02', title: 'Understand' },
    { number: '03', title: 'Find the Opportunity' },
    { number: '04', title: 'Build & Connect' },
    { number: '05', title: 'Launch & Improve' },
  ]

  return (
    <section className="how-it-works-section">
      <div className="container">
        <div className="how-it-works-section__intro" data-aos="fade-up">
          <span className="eyebrow">HOW IT WORKS</span>
          <h2>You Bring the Problem. We Build the Solution.</h2>
          <p>You focus on your business. We make it work smarter.</p>
        </div>

        <div className="how-it-works-journey" aria-label="Business transformation journey">
          <div className="how-it-works-side how-it-works-side--today" data-aos="fade-right" data-aos-delay="120">
            <span className="how-it-works-side__label">Your Business Today</span>
            <ul>
              {today.map((item, index) => (
                <li key={item} data-aos="fade-right" data-aos-delay={180 + index * 70}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="how-it-works-transform" data-aos="zoom-in" data-aos-delay="260">
            <span className="how-it-works-transform__orbit" aria-hidden="true" />
            <strong>AutomateMind</strong>
            <span>turns friction into flow</span>
          </div>

          <div className="how-it-works-side how-it-works-side--after" data-aos="fade-left" data-aos-delay="120">
            <span className="how-it-works-side__label">Your Business After</span>
            <ul>
              {after.map((item, index) => (
                <li key={item} data-aos="fade-left" data-aos-delay={180 + index * 70}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="how-it-works-steps" aria-label="How AutomateMind works">
          {steps.map((step, index) => (
            <div className="how-it-works-step" key={step.number} data-aos="fade-up" data-aos-delay={300 + index * 100}>
              <span className="how-it-works-step__number">{step.number}</span>
              <strong>{step.title}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowWeWorkCriteriaSection() {
  return <EmptySection className="how-we-work-criteria-section" title="What We Automate" />
}
