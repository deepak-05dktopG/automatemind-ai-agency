import { useEffect, useRef } from 'react'
import './CtaMotionGraphic.css'

export function CtaMotionGraphic() {
  const graphicRef = useRef(null)

  useEffect(() => {
    const graphic = graphicRef.current
    if (!graphic) return undefined

    const section = graphic.closest('.homepage-final-cta')
    if (!section || typeof IntersectionObserver === 'undefined') {
      graphic.dataset.ctaOn = ''
      return undefined
    }

    const revealObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        graphic.dataset.ctaOn = ''
        revealObserver.disconnect()
      }
    }, { threshold: 0.2 })
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) delete graphic.dataset.ctaOff
      else graphic.dataset.ctaOff = ''
    })

    revealObserver.observe(section)
    visibilityObserver.observe(section)

    return () => {
      revealObserver.disconnect()
      visibilityObserver.disconnect()
    }
  }, [])

  return (
    <div className="cta-motion" ref={graphicRef} aria-hidden="true">
      <div className="cta-motion__grid" />
      <svg className="cta-motion__trail" viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice">
        <path className="cta-motion__trail-base" pathLength="1" style={{ '--delay': '.3s' }} d="M-40 560C260 470 520 380 780 270S1200 90 1480 30" />
        <path className="cta-motion__trail-highlight" pathLength="1" style={{ '--delay': '.6s' }} d="M-40 560C260 470 520 380 780 270S1200 90 1480 30" />
        <path className="cta-motion__trail-base" pathLength="1" style={{ '--delay': '.5s' }} d="M-40 640C300 560 560 470 820 360S1240 170 1480 110" />
        <path className="cta-motion__trail-highlight" pathLength="1" style={{ '--delay': '1.1s' }} d="M-40 640C300 560 560 470 820 360S1240 170 1480 110" />
        <path className="cta-motion__trail-base" pathLength="1" style={{ '--delay': '.7s' }} d="M-40 470C240 380 470 300 720 190S1140 10 1480 -30" />
        <path className="cta-motion__trail-highlight" pathLength="1" style={{ '--delay': '1.6s' }} d="M-40 470C240 380 470 300 720 190S1140 10 1480 -30" />
      </svg>
      <div className="cta-motion__gold-panel" />
      <svg className="cta-motion__mascot" viewBox="0 0 100 120">
        <defs>
          <radialGradient id="cta-motion-mascot" cx=".35" cy=".3" r=".85">
            <stop offset="0" stopColor="#ffa58e" />
            <stop offset="1" stopColor="#e0553f" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="116" rx="27" ry="4" fill="#000" opacity=".4" />
        <line x1="50" y1="22" x2="50" y2="9" stroke="#e0553f" strokeWidth="2.5" />
        <circle className="cta-motion__antenna" cx="50" cy="7" r="4.5" fill="#f1c978" />
        <rect className="cta-motion__arm cta-motion__arm--left" x="12" y="72" width="11" height="25" rx="5.5" fill="url(#cta-motion-mascot)" />
        <rect className="cta-motion__arm cta-motion__arm--right" x="77" y="72" width="11" height="25" rx="5.5" fill="url(#cta-motion-mascot)" />
        <ellipse cx="40" cy="111" rx="9" ry="5" fill="#e0553f" />
        <ellipse cx="60" cy="111" rx="9" ry="5" fill="#e0553f" />
        <ellipse cx="50" cy="92" rx="25" ry="21" fill="url(#cta-motion-mascot)" />
        <circle cx="50" cy="92" r="6" fill="#0f1722" />
        <circle cx="50" cy="92" r="2.5" fill="#f1c978" />
        <circle cx="14" cy="47" r="6" fill="#e0553f" />
        <circle cx="86" cy="47" r="6" fill="#e0553f" />
        <rect x="16" y="20" width="68" height="54" rx="26" fill="url(#cta-motion-mascot)" />
        <ellipse cx="36" cy="28" rx="11" ry="4" fill="#fff" opacity=".28" transform="rotate(-20 36 28)" />
        <rect x="24" y="33" width="52" height="28" rx="14" fill="#0c121b" />
        <g className="cta-motion__gaze">
          <ellipse className="cta-motion__eye" cx="40" cy="48" rx="4.6" ry="6" fill="#bff3ff" />
          <ellipse className="cta-motion__eye" cx="60" cy="48" rx="4.6" ry="6" fill="#bff3ff" />
          <path d="M43 55 Q50 62 57 55" stroke="#bff3ff" fill="none" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  )
}
