import { memo, useEffect, useRef } from 'react'
import './ProblemMotionGraphic.css'

const problemNodes = [
  { id: '01', title: 'Doing the Same Work Again', x: 24, y: 13 },
  { id: '02', title: 'Work Does Not Connect', x: 76, y: 13 },
  { id: '03', title: 'Chasing People for Updates', x: 15, y: 40 },
  { id: '04', title: 'Information in Different Places', x: 85, y: 40 },
  { id: '05', title: 'Decisions Take Too Long', x: 24, y: 67 },
  { id: '06', title: 'Work Keeps Getting Left Behind', x: 76, y: 67 },
]

const connectionPatterns = [
  '6 3 1.5 12',
  '4 2 4 30',
  '9 5 2 20',
  '3 2 8 25',
  '7 4 1 16',
  '5 3 3 22',
]

const chaosCards = [
  ['tk', 6, 24, 0.9, 1.9],
  ['tk', 70, 24, 1, 2.6],
  ['ms', 29, 27, 0.95, 3.4],
  ['ms', 32, 29, 1, 5.2],
  ['ms', 35, 31, 1.05, 7.4],
  ['dc', 62, 50, 1, 4],
  ['dc', 65, 53, 0.95, 6.6],
  ['pr', 8, 52, 0.9, 3],
  ['pr', 80, 57, 1, 8.2],
  ['tk', 44, 5, 0.85, 9.4],
  ['dc', 3, 66, 0.9, 10.6],
  ['ms', 70, 69, 0.95, 6],
  ['ms', 73, 71, 1, 11.6],
  ['tk', 24, 49, 0.8, 12.4],
  ['pr', 56, 18, 0.8, 5.8],
  ['tk', 88, 30, 0.85, 13.4],
]

function ProblemRobot() {
  return (
    <svg viewBox="0 0 100 120" aria-hidden="true">
      <defs>
        <radialGradient id="problem-robot-gradient" cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor="#ff8f84" />
          <stop offset="1" stopColor="#b92b2b" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="116" rx="28" ry="4" fill="#000" opacity=".5" />
      <line x1="50" y1="22" x2="56" y2="9" stroke="#b92b2b" strokeWidth="2.5" />
      <circle className="problem-motion__antenna" cx="57" cy="7" r="4.5" fill="#d8453b" />
      <rect className="problem-motion__arm-left" x="12" y="72" width="11" height="25" rx="5.5" fill="url(#problem-robot-gradient)" />
      <rect className="problem-motion__arm-right" x="77" y="72" width="11" height="25" rx="5.5" fill="url(#problem-robot-gradient)" />
      <ellipse cx="40" cy="111" rx="9" ry="5" fill="#b92b2b" />
      <ellipse cx="60" cy="111" rx="9" ry="5" fill="#b92b2b" />
      <ellipse cx="50" cy="92" rx="25" ry="21" fill="url(#problem-robot-gradient)" />
      <circle cx="50" cy="92" r="6" fill="#0f1722" />
      <circle cx="50" cy="92" r="2.5" fill="#c9a45c" />
      <circle cx="14" cy="47" r="6" fill="#b92b2b" />
      <circle cx="86" cy="47" r="6" fill="#b92b2b" />
      <rect x="16" y="20" width="68" height="54" rx="26" fill="url(#problem-robot-gradient)" />
      <ellipse cx="36" cy="28" rx="11" ry="4" fill="#fff" opacity=".28" transform="rotate(-20 36 28)" />
      <rect x="24" y="33" width="52" height="28" rx="14" fill="#0c121b" />
      <ellipse cx="39" cy="47" rx="6" ry="5.5" fill="#fff0ec" />
      <ellipse cx="61" cy="47" rx="6" ry="5.5" fill="#fff0ec" />
      <circle className="problem-motion__pupil" cx="39" cy="47" r="2.4" fill="#1a0c0c" />
      <circle className="problem-motion__pupil" cx="61" cy="47" r="2.4" fill="#1a0c0c" />
      <path d="M32 41 45 37M68 41 55 37" stroke="#ffd9d0" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M44 59Q50 55.5 56 59" stroke="#ffd9d0" fill="none" strokeWidth="1.8" strokeLinecap="round" />
      <path className="problem-motion__sweat" d="M82 22q-3.5 5 0 7.5 3.5-2.5 0-7.5z" fill="#9fd3ff" />
    </svg>
  )
}

function ProblemMotionGraphicComponent() {
  const stageRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    const observer = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
        stage.classList.toggle('is-offscreen', !entry.isIntersecting)
      })

    const pauseForScroll = () => stage.classList.add('is-scrolling')
    const resumeAfterScroll = () => stage.classList.remove('is-scrolling')

    observer?.observe(stage)
    window.addEventListener('automatemind:scrollstart', pauseForScroll)
    window.addEventListener('automatemind:scrollend', resumeAfterScroll)

    return () => {
      observer?.disconnect()
      window.removeEventListener('automatemind:scrollstart', pauseForScroll)
      window.removeEventListener('automatemind:scrollend', resumeAfterScroll)
    }
  }, [])

  return (
    <div className="problem-motion" role="img" aria-label="Animated mind map of common business problems">
      <div className="problem-motion__stage" ref={stageRef}>
        <div className="problem-motion__camera">
          <svg className="problem-motion__lines" viewBox="0 0 100 80" aria-hidden="true">
            {problemNodes.map((node, index) => (
              <g key={node.id} className="problem-motion__connection" style={{ '--line-delay': `${index * 0.3}s`, '--line-cycle': `${3.1 + index * 0.2}s` }}>
                <line x1="50" y1="40" x2={node.x} y2={node.y} strokeDasharray={connectionPatterns[index]} />
                <path d={`M${(50 + node.x) / 2 - 0.8} ${(40 + node.y) / 2 - 0.8}l1.6 1.6m0-1.6l-1.6 1.6`} />
              </g>
            ))}
          </svg>

          <div className="problem-motion__chaos">
            {chaosCards.map(([type, x, y, scale, delay], index) => (
              <div
                className={`problem-motion__chaos-card is-${type}`}
                key={`${type}-${index}`}
                style={{ left: `${x}%`, top: `${y}%`, '--card-scale': scale, '--card-delay': `${delay}s`, '--card-x': `${(index % 5 - 2) * 1.6}cqw`, '--card-y': `${((index + 2) % 5 - 2) * 1.6}cqw`, '--card-rotate': `${(index % 7 - 3) * 4}deg` }}
              >
                <div className="problem-motion__mini-card-motion">
                  <div className="problem-motion__mini-card">
                    <div className="problem-motion__card-twitch">
                      <span className="problem-motion__tag">{type === 'tk' ? 'Overdue' : type === 'ms' ? 'Re: Re:' : type === 'dc' ? 'final_v7' : 'Pending'}</span>
                      <i className="problem-motion__skeleton" />
                      {(type === 'tk' || type === 'dc' || type === 'ms') && <i className="problem-motion__skeleton is-short" />}
                      {type === 'dc' && <i className="problem-motion__skeleton" />}
                      {type === 'tk' && <i className="problem-motion__checkbox" />}
                      {type === 'pr' && <span className="problem-motion__progress"><i /></span>}
                      <u className="problem-motion__badge">{index + 2}</u>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="problem-motion__orbit" aria-hidden="true">
            {[0, 120, 240].map((angle) => (
              <div key={angle} className="problem-motion__orbit-item" style={{ transform: `rotate(${angle}deg) translateX(10.5cqw)` }}>
                <div><i /><i /></div>
              </div>
            ))}
          </div>

          <div className="problem-motion__robot" aria-hidden="true">
            <div className="problem-motion__robot-pan"><div className="problem-motion__robot-shake"><ProblemRobot /></div></div>
          </div>

          <span className="problem-motion__exclamation is-one" aria-hidden="true">!</span>
          <span className="problem-motion__exclamation is-two" aria-hidden="true">?</span>
          <span className="problem-motion__exclamation is-three" aria-hidden="true">!</span>

          {problemNodes.map((node, index) => (
            <div className="problem-motion__node" key={node.id} style={{ left: `${node.x}%`, top: `${node.y}%`, '--node-delay': `${0.6 + index * 0.35}s`, '--node-float': `${3.7 + index * 0.35}s`, '--node-jitter': `${4.1 + index * 0.4}s` }}>
              <div className="problem-motion__node-motion">
                <div className="problem-motion__node-card">
                  <span className="problem-motion__number">{node.id}</span>
                  <span className="problem-motion__title">{node.title}</span>
                  <u className="problem-motion__badge">{3 + index * 2}</u>
                </div>
              </div>
            </div>
          ))}

          <div className="problem-motion__core">
            <div className="problem-motion__core-motion">
              <span className="problem-motion__core-label">BUSINESS<br />PROBLEMS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ProblemMotionGraphic = memo(ProblemMotionGraphicComponent)
