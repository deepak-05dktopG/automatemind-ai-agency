import { useEffect, useId, useRef } from 'react'
import './BusinessOutcomesMotionGraphic.css'

function Mascot({ className = '' }) {
  const gradientId = `business-outcomes-mascot-${useId().replace(/:/g, '')}`

  return (
    <svg className={`business-outcomes-motion__mascot ${className}`} viewBox="0 0 100 120" aria-hidden="true">
      <defs>
        <radialGradient id={gradientId} cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor="#ffa58e" />
          <stop offset="1" stopColor="#e0553f" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="116" rx="27" ry="4" fill="#000" opacity=".35" />
      <line x1="50" y1="22" x2="50" y2="9" stroke="#e0553f" strokeWidth="2.5" />
      <circle cx="50" cy="7" r="4.5" fill="#f1c978" />
      <rect className="business-outcomes-motion__arm" x="12" y="72" width="11" height="25" rx="5.5" fill={`url(#${gradientId})`} />
      <rect className="business-outcomes-motion__arm" x="77" y="72" width="11" height="25" rx="5.5" fill={`url(#${gradientId})`} />
      <ellipse cx="40" cy="111" rx="9" ry="5" fill="#e0553f" />
      <ellipse cx="60" cy="111" rx="9" ry="5" fill="#e0553f" />
      <ellipse cx="50" cy="92" rx="25" ry="21" fill={`url(#${gradientId})`} />
      <circle cx="50" cy="92" r="6" fill="#0f1722" />
      <circle cx="50" cy="92" r="2.5" fill="#f1c978" />
      <circle cx="14" cy="47" r="6" fill="#e0553f" />
      <circle cx="86" cy="47" r="6" fill="#e0553f" />
      <rect x="16" y="20" width="68" height="54" rx="26" fill={`url(#${gradientId})`} />
      <ellipse cx="36" cy="28" rx="11" ry="4" fill="#fff" opacity=".28" transform="rotate(-20 36 28)" />
      <rect x="24" y="33" width="52" height="28" rx="14" fill="#0c121b" />
      <ellipse className="business-outcomes-motion__eye" cx="40" cy="48" rx="4.6" ry="6" fill="#bff3ff" />
      <ellipse className="business-outcomes-motion__eye" cx="60" cy="48" rx="4.6" ry="6" fill="#bff3ff" />
      <path d="M43 55 Q50 62 57 55" stroke="#bff3ff" fill="none" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function OutcomeVisual({ index }) {
  if (index === 0) {
    return (
      <div className="business-outcomes-motion__visual business-outcomes-motion__visual--time">
        <div className="business-outcomes-motion__clock"><i /><i /></div>
        <div className="business-outcomes-motion__paper business-outcomes-motion__paper--one" />
        <div className="business-outcomes-motion__paper business-outcomes-motion__paper--two" />
        <Mascot />
      </div>
    )
  }

  if (index === 1) {
    return (
      <div className="business-outcomes-motion__visual business-outcomes-motion__visual--operations">
        <div className="business-outcomes-motion__track" />
        {[0, 1, 2, 3].map((node) => <i className={`business-outcomes-motion__block business-outcomes-motion__block--${node + 1}`} key={node} />)}
        <div className="business-outcomes-motion__flow-block" />
        <Mascot />
      </div>
    )
  }

  if (index === 2) {
    return (
      <div className="business-outcomes-motion__visual business-outcomes-motion__visual--customer">
        <div className="business-outcomes-motion__message business-outcomes-motion__message--one"><i /><span /></div>
        <div className="business-outcomes-motion__message business-outcomes-motion__message--two"><i /><span /></div>
        <div className="business-outcomes-motion__stars" aria-hidden="true">✦ ✦ ✦</div>
        <Mascot />
      </div>
    )
  }

  if (index === 3) {
    return (
      <div className="business-outcomes-motion__visual business-outcomes-motion__visual--tasks">
        {[0, 1, 2].map((task) => <div className="business-outcomes-motion__task" key={task}><i /><span /></div>)}
        <Mascot />
      </div>
    )
  }

  if (index === 4) {
    return (
      <div className="business-outcomes-motion__visual business-outcomes-motion__visual--decisions">
        <div className="business-outcomes-motion__decision-glow" />
        <div className="business-outcomes-motion__decision-core" />
        {[0, 1, 2, 3, 4, 5].map((node) => <i className={`business-outcomes-motion__orbit business-outcomes-motion__orbit--${node + 1}`} key={node} />)}
        <Mascot />
      </div>
    )
  }

  return (
    <div className="business-outcomes-motion__visual business-outcomes-motion__visual--scale">
      <Mascot />
      <svg className="business-outcomes-motion__network" viewBox="0 0 100 70" aria-hidden="true">
        <path d="M12 35 34 16M12 35 34 54M34 16 58 8M34 16 58 24M34 54 58 40M34 54 58 60M58 8 84 16M58 40 84 50" />
        <g>
          <circle cx="12" cy="35" r="4" />
          <circle cx="34" cy="16" r="3" />
          <circle cx="34" cy="54" r="3" />
          <circle cx="58" cy="8" r="2.5" />
          <circle cx="58" cy="24" r="2.5" />
          <circle cx="58" cy="40" r="2.5" />
          <circle cx="58" cy="60" r="2.5" />
          <circle cx="84" cy="16" r="2.5" />
          <circle cx="84" cy="50" r="2.5" />
        </g>
      </svg>
    </div>
  )
}

export function BusinessOutcomesMotionGraphic({ outcomes }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      root.querySelectorAll('.business-outcomes-motion__item').forEach((item) => item.classList.add('is-visible'))
      return undefined
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.35 })
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-offscreen', !entry.isIntersecting))
    })
    const items = [...root.querySelectorAll('.business-outcomes-motion__item')]
    items.forEach((item) => {
      revealObserver.observe(item)
      visibilityObserver.observe(item)
    })

    return () => {
      revealObserver.disconnect()
      visibilityObserver.disconnect()
    }
  }, [])

  return (
    <div className="business-outcomes-motion" ref={rootRef} aria-label="Business outcomes">
      {outcomes.map((outcome, index) => (
        <article className={`business-outcomes-motion__item business-outcomes-motion__item--${index + 1}`} key={outcome.number}>
          <OutcomeVisual index={index} />
          <div className="business-outcomes-motion__copy">
            <span>{outcome.number}</span>
            <h3>{outcome.title}</h3>
            <p>{outcome.text}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
