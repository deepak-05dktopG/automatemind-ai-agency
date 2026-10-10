import { useEffect, useId, useRef } from 'react'
import './IndustrySectionMotionGraphic.css'

const robotLooks = [
  { color: '#e0553f', light: '#ffa58e', mouth: 'M43 55 Q50 62 57 55' },
  { color: '#2b6fe0', light: '#8fd0ff', mouth: 'M43 55 Q50 62 57 55' },
  { color: '#2a9d8f', light: '#7fe0c8', mouth: 'M45 57 Q50 59 55 57' },
  { color: '#9fb52a', light: '#f4e27a', mouth: 'M43 55 Q50 62 57 55' },
]

function Robot({ look, className = '', style }) {
  const { color, light, mouth } = robotLooks[look]
  const gradientId = `industry-robot-${look}-${useId().replace(/:/g, '')}`

  return (
    <div className={`industry-motion__robot ${className}`} style={style}>
      <svg viewBox="0 0 100 120" aria-hidden="true">
        <defs>
          <radialGradient id={gradientId} cx=".35" cy=".3" r=".85">
            <stop offset="0" stopColor={light} />
            <stop offset="1" stopColor={color} />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="116" rx="27" ry="4" fill="#000" opacity=".45" />
        <line x1="50" y1="22" x2="50" y2="9" stroke={color} strokeWidth="2.5" />
        <circle cx="50" cy="7" r="4.5" fill="#f1c978" />
        <rect className="industry-motion__arm industry-motion__arm--left" x="12" y="72" width="11" height="25" rx="5.5" fill={`url(#${gradientId})`} />
        <rect className="industry-motion__arm industry-motion__arm--right" x="77" y="72" width="11" height="25" rx="5.5" fill={`url(#${gradientId})`} />
        <ellipse cx="40" cy="111" rx="9" ry="5" fill={color} />
        <ellipse cx="60" cy="111" rx="9" ry="5" fill={color} />
        <ellipse cx="50" cy="92" rx="25" ry="21" fill={`url(#${gradientId})`} />
        <circle cx="50" cy="92" r="6" fill="#0f1722" />
        <circle cx="50" cy="92" r="2.5" fill="#f1c978" />
        <circle cx="14" cy="47" r="6" fill={color} />
        <circle cx="86" cy="47" r="6" fill={color} />
        <rect x="16" y="20" width="68" height="54" rx="26" fill={`url(#${gradientId})`} />
        <ellipse cx="36" cy="28" rx="11" ry="4" fill="#fff" opacity=".28" transform="rotate(-20 36 28)" />
        <rect x="24" y="33" width="52" height="28" rx="14" fill="#0c121b" />
        <ellipse className="industry-motion__eye" cx="40" cy="48" rx="4.6" ry="6" fill="#bff3ff" />
        <ellipse className="industry-motion__eye" cx="60" cy="48" rx="4.6" ry="6" fill="#bff3ff" />
        {look === 2 && <path d="M33 39 Q40 35 46 38 M54 38 Q60 35 67 39" stroke="#e8dccb" strokeWidth="1.8" strokeLinecap="round" fill="none" />}
        <path d={mouth} stroke="#bff3ff" fill="none" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function Calendar({ className = '', style }) {
  return (
    <div className={`industry-motion__item industry-motion__calendar ${className}`} style={style} aria-hidden="true">
      <b />
      <i />
      <i className="short" />
    </div>
  )
}

function Message({ className = '', style }) {
  return (
    <div className={`industry-motion__item industry-motion__message ${className}`} style={style} aria-hidden="true">
      <em />
      <span />
    </div>
  )
}

function PeopleFirstScene() {
  return (
    <>
      <i className="industry-motion__highlight" />
      <Robot look={0} className="industry-motion__scene-robot industry-motion__scene-robot--first" />
      <Calendar className="float" style={{ left: '34cqw', top: '5cqh', '--rotate': '-6deg', '--delay': '.5s' }} />
      <Message className="float industry-motion__mobile-hide" style={{ left: '50cqw', top: '22cqh', '--rotate': '0deg', '--delay': '.8s' }} />
      <div className="industry-motion__schedule industry-motion__mobile-hide" style={{ left: '31cqw', top: '27cqh', '--delay': '1.1s' }}><i /><i /><i className="on" /></div>
      <Calendar className="industry-motion__catalog" style={{ left: '60cqw', top: '12cqh', '--rotate': '5deg', '--delay': '2s' }} />
    </>
  )
}

function RelationshipScene() {
  return (
    <>
      <i className="industry-motion__highlight" />
      <Robot look={1} className="industry-motion__scene-robot industry-motion__scene-robot--sender" />
      <Robot look={3} className="industry-motion__scene-robot industry-motion__scene-robot--receiver" />
      <i className="industry-motion__connection" />
      <Message className="small industry-motion__mobile-hide industry-motion__message--send" style={{ left: '62cqw', top: '5cqh', '--delay': '1.2s' }} />
      <Message className="small industry-motion__mobile-hide industry-motion__message--return" style={{ left: '70cqw', top: '11cqh', '--delay': '2.2s' }} />
      <Calendar className="industry-motion__request industry-motion__mobile-hide" style={{ left: '67cqw', top: '22cqh', '--delay': '3.6s' }} />
    </>
  )
}

function ExpertScene() {
  return (
    <>
      <i className="industry-motion__highlight" />
      <Robot look={2} className="industry-motion__scene-robot industry-motion__scene-robot--expert" />
      <div className="industry-motion__page" style={{ left: '34cqw', top: '10cqh', '--delay': '.6s' }}><i /><i className="short" /></div>
      <div className="industry-motion__page industry-motion__page--flip" style={{ left: '36cqw', top: '8cqh', '--delay': '.8s' }}><i /><i className="short" /><u /></div>
      <div className="industry-motion__tasks industry-motion__mobile-hide" style={{ left: '51cqw', top: '6cqh' }}>
        {[0, 1, 2].map((item) => <p key={item}><b /><i /><u style={{ '--delay': `${2.4 + item * .4}s` }} /></p>)}
      </div>
      <div className="industry-motion__toggle industry-motion__mobile-hide" style={{ left: '52cqw', top: '27cqh' }}><i /></div>
    </>
  )
}

function GrowingTeamScene() {
  return (
    <>
      <i className="industry-motion__highlight" />
      <Robot look={0} className="industry-motion__scene-robot industry-motion__scene-robot--team-one" />
      <Robot look={1} className="industry-motion__scene-robot industry-motion__scene-robot--team-two" />
      <Robot look={3} className="industry-motion__scene-robot industry-motion__scene-robot--team-three" />
      <i className="industry-motion__growth-ring industry-motion__mobile-hide" />
      <div className="industry-motion__dashboard industry-motion__mobile-hide">
        <i /><i /><i /><i />
        <div><i /><i /><i /></div>
      </div>
      <div className="industry-motion__activity industry-motion__mobile-hide"><i /><i /><i /></div>
      <Message className="small float industry-motion__mobile-hide" style={{ left: '42cqw', top: '25cqh', '--delay': '2s' }} />
    </>
  )
}

const scenes = [PeopleFirstScene, RelationshipScene, ExpertScene, GrowingTeamScene]

export function IndustrySectionMotionGraphic({ index }) {
  const Scene = scenes[index]
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      card.dataset.indOn = ''
      return undefined
    }

    const startObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        card.dataset.indOn = ''
        startObserver.disconnect()
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.35 })
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) delete card.dataset.indOff
      else card.dataset.indOff = ''
    })

    startObserver.observe(card)
    visibilityObserver.observe(card)
    return () => {
      startObserver.disconnect()
      visibilityObserver.disconnect()
    }
  }, [])

  if (!Scene) return null

  return (
    <div className="industry-motion" ref={cardRef} aria-hidden="true">
      <Scene />
    </div>
  )
}
