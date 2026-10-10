import { useEffect, useRef } from 'react'
import './SolutionStepsMotionGraphic.css'

const solutionSteps = [
  {
    number: '01',
    label: 'YOU NOTICE',
    title: 'Work takes too long',
    text: 'People repeat the same updates, chase the same answers, and lose time on tasks that should be simple.',
    scene: 'friction',
  },
  {
    number: '02',
    label: 'WE MAKE IT',
    title: 'Work moves by itself',
    text: 'We connect the steps, tools, and people so the right action happens without constant manual follow-up.',
    scene: 'flow',
  },
  {
    number: '03',
    label: 'YOU GET',
    title: 'More room to grow',
    text: 'Your team spends more time serving customers and making decisions, and less time holding the process together.',
    scene: 'growth',
  },
]

function Robot({ variant }) {
  return (
    <svg className={`solution-steps__robot solution-steps__robot--${variant}`} viewBox="0 0 100 120" aria-hidden="true">
      <defs>
        <radialGradient id={`solution-robot-${variant}`} cx=".35" cy=".3" r=".85">
          {variant === 'friction' ? (
            <>
              <stop offset="0" stopColor="#ffa58e" />
              <stop offset="1" stopColor="#e0553f" />
            </>
          ) : variant === 'flow' ? (
            <>
              <stop offset="0" stopColor="#f4e27a" />
              <stop offset="1" stopColor="#9fb52a" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#8fd0ff" />
              <stop offset="1" stopColor="#2b6fe0" />
            </>
          )}
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="116" rx="27" ry="4" fill="#000" opacity=".35" />
      <line x1="50" y1="22" x2="50" y2="9" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="7" r="4.5" fill="#f1c978" />
      <rect className="solution-steps__arm solution-steps__arm--left" x="12" y="72" width="11" height="25" rx="5.5" fill={`url(#solution-robot-${variant})`} />
      <rect className="solution-steps__arm solution-steps__arm--right" x="77" y="72" width="11" height="25" rx="5.5" fill={`url(#solution-robot-${variant})`} />
      <ellipse cx="40" cy="111" rx="9" ry="5" fill="currentColor" />
      <ellipse cx="60" cy="111" rx="9" ry="5" fill="currentColor" />
      <ellipse cx="50" cy="92" rx="25" ry="21" fill={`url(#solution-robot-${variant})`} />
      <circle cx="50" cy="92" r="6" fill="#0f1722" />
      <circle cx="50" cy="92" r="2.5" fill="#f1c978" />
      <circle cx="14" cy="47" r="6" fill="currentColor" />
      <circle cx="86" cy="47" r="6" fill="currentColor" />
      <rect x="16" y="20" width="68" height="54" rx="26" fill={`url(#solution-robot-${variant})`} />
      <ellipse cx="36" cy="28" rx="11" ry="4" fill="#fff" opacity=".28" transform="rotate(-20 36 28)" />
      <rect x="24" y="33" width="52" height="28" rx="14" fill="#0c121b" />
      <ellipse className="solution-steps__eye" cx="40" cy="48" rx="4.6" ry="6" fill="#bff3ff" />
      <ellipse className="solution-steps__eye" cx="60" cy="48" rx="4.6" ry="6" fill="#bff3ff" />
      <path d="M43 56 Q50 61 57 56" stroke="#bff3ff" fill="none" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function FrictionScene() {
  return (
    <div className="solution-steps__stage solution-steps__stage--friction" aria-hidden="true">
      <div className="solution-steps__clock solution-steps__clock--one"><i /><i /></div>
      <div className="solution-steps__clock solution-steps__clock--two"><i /><i /></div>
      <div className="solution-steps__paper-stack solution-steps__paper-stack--left"><i /><i /><i /></div>
      <div className="solution-steps__paper-stack solution-steps__paper-stack--right"><i /><i /><i /></div>
      <Robot variant="friction" />
      <span className="solution-steps__alert solution-steps__alert--one">!</span>
      <span className="solution-steps__alert solution-steps__alert--two">3</span>
      <span className="solution-steps__alert solution-steps__alert--three">!</span>
    </div>
  )
}

function FlowScene() {
  return (
    <div className="solution-steps__stage solution-steps__stage--flow" aria-hidden="true">
      <svg className="solution-steps__route" viewBox="0 0 100 75">
        <path className="solution-steps__route-base" d="M18 24C30 14 38 34 50 24S70 14 82 24" />
        <path className="solution-steps__route-active" d="M18 24C30 14 38 34 50 24S70 14 82 24" />
        <circle className="solution-steps__node solution-steps__node--one" cx="18" cy="24" r="4.2" />
        <circle className="solution-steps__node solution-steps__node--two" cx="50" cy="24" r="4.2" />
        <circle className="solution-steps__node solution-steps__node--three" cx="82" cy="24" r="4.2" />
        <g className="solution-steps__traveler">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M18 24C30 14 38 34 50 24S70 14 82 24"
            keyPoints="0;0;.5;.5;1;1"
            keyTimes="0;.08;.38;.55;.88;1"
            calcMode="spline"
            keySplines=".4 0 .2 1;0 0 1 1;.4 0 .2 1;0 0 1 1;.4 0 .2 1"
          />
          <rect x="-5.5" y="-3.4" width="11" height="6.8" rx="1.4" />
          <rect x="-3.6" y="-1.6" width="7.2" height=".9" rx=".4" />
          <rect x="-3.6" y=".6" width="4.4" height=".9" rx=".4" />
        </g>
      </svg>
      <Robot variant="flow" />
    </div>
  )
}

function GrowthScene() {
  return (
    <div className="solution-steps__stage solution-steps__stage--growth" aria-hidden="true">
      <div className="solution-steps__growth-rings" />
      <svg className="solution-steps__chart" viewBox="0 0 100 75">
        <g className="solution-steps__bars">
          <rect x="14" y="52" width=".7" height="18" />
          <rect x="30" y="46" width=".7" height="24" />
          <rect x="46" y="58" width=".7" height="12" />
          <rect x="62" y="38" width=".7" height="32" />
          <rect x="78" y="30" width=".7" height="40" />
        </g>
        <path className="solution-steps__chart-line" d="M6 68C24 64 30 58 42 50S68 28 94 10" />
        <circle className="solution-steps__chart-end" cx="94" cy="10" r="1.8" />
      </svg>
      <div className="solution-steps__app solution-steps__app--one"><i /><span /></div>
      <div className="solution-steps__app solution-steps__app--two"><i /><span /></div>
      <div className="solution-steps__app solution-steps__app--three"><i /><span /></div>
      <Robot variant="growth" />
      <div className="solution-steps__checklist solution-steps__checklist--one"><i>✓</i><span /></div>
      <div className="solution-steps__checklist solution-steps__checklist--two"><i>✓</i><span /></div>
      <div className="solution-steps__checklist solution-steps__checklist--three"><i>✓</i><span /></div>
    </div>
  )
}

const scenes = {
  friction: FrictionScene,
  flow: FlowScene,
  growth: GrowthScene,
}

export function SolutionStepsMotionGraphic() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting)
      })
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 })

    const cards = [...root.querySelectorAll('.solution-steps__card')]
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="solution-steps" ref={rootRef} aria-label="Three stages of business transformation">
      {solutionSteps.map((step) => {
        const Scene = scenes[step.scene]
        return (
          <article className="solution-steps__card" key={step.number}>
            <Scene />
            <span className="solution-steps__number">{step.number}</span>
            <div className="solution-steps__copy">
              <small>{step.label}</small>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
