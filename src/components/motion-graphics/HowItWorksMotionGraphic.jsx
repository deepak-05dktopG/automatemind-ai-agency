import { useEffect, useRef } from 'react'
import './HowItWorksMotionGraphic.css'

const steps = [
  { number: '01', title: 'Tell Us', text: 'You share what feels slow, repetitive, or harder than it should be.', x: 44, y: 159 },
  { number: '02', title: 'Understand', text: 'We learn how your team works today and where the friction begins.', x: 229, y: 66 },
  { number: '03', title: 'Find the Opportunity', text: 'Together, we choose the change that can make the biggest difference.', x: 414, y: 159 },
  { number: '04', title: 'Build & Connect', text: 'We shape the solution around your people, process, and existing tools.', x: 599, y: 66 },
  { number: '05', title: 'Launch & Improve', text: 'You put it to work, and we keep refining what makes your business stronger.', x: 784, y: 159 },
]

const pathData = 'M70 158 C110 126 150 106 210 106 S330 172 400 172 S520 87 585 87 S700 172 770 172 S860 120 920 100'
const fragments = [
  '<i class="bub"><b></b><b></b><b></b></i><i class="sig"></i>',
  '<i class="gl"></i>' + [
    [37, -18, 22, -30, -20, -14],
    [34, -6, 16, -34, 10, 12],
    [36, 6, 20, -28, 26, -9],
    [32.5, 18, 13, -33, 2, 16],
  ].map((fragment, index) =>
    `<i class="fr" style="--x:${fragment[0]};--y:${fragment[1]};--w:${fragment[2]};--ox:${fragment[3]};--oy:${fragment[4]};--or:${fragment[5]}deg;--dl:${.15 + index * .18}"></i>`,
  ).join(''),
  '<i class="spot"></i><i class="dm"></i><i class="pr"></i>',
  [
    [26, -6, -30, -18, -25, .1],
    [39, -6, 20, -22, 30, .3],
    [39, 7, 24, 20, -20, .5],
  ].map(fragment =>
    `<i class="tl" style="--x:${fragment[0]};--y:${fragment[1]};--ox:${fragment[2]};--oy:${fragment[3]};--or:${fragment[4]}deg;--dl:${fragment[5]}"></i>`,
  ).join('') + '<i class="lk" style="--x:32;--y:-6"></i><i class="lk v" style="--x:39;--y:0"></i><i class="tr"></i>',
  '<i class="core"></i><i class="rg" style="--dl:0"></i><i class="rg" style="--dl:.7"></i><i class="rg" style="--dl:1.4"></i>',
]

export function HowItWorksMotionGraphic() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const track = root?.querySelector('.track')
    const svg = root?.querySelector('.p')
    const mascot = root?.querySelector('.mas')
    const mascotInner = root?.querySelector('.mi')
    const overlay = root?.querySelector('#ov')
    const maskPath = root?.querySelector('#mk')
    const basePath = root?.querySelector('#base')
    const head = root?.querySelector('#head')
    const endGlow = root?.querySelector('#endg')
    const mask = root?.querySelector('#mkm')
    if (!root || !track || !svg || !mascot || !mascotInner || !overlay || !maskPath || !basePath || !head || !endGlow || !mask) return undefined

    const stageElements = [...track.querySelectorAll('.step')]
    const effects = stageElements.map((step, index) => {
      const effect = document.createElement('div')
      effect.className = `fx fx${index + 1}`
      effect.innerHTML = fragments[index]
      track.appendChild(effect)
      return effect
    })
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let pathLength = 1
    let stageDistances = []
    let mascotPositions = []
    let progress = 0
    let currentStep = -1
    let isVisible = false
    let hasStarted = false
    let hasFinished = false
    let clock = 0
    let lastFrame = 0
    let frameId = 0
    let resizeFrameId = 0
    let finishTimer = 0
    let replayTimer = 0

    const setMascotPosition = (position) => {
      mascot.style.transform = `translate(${position.x}px,${position.y}px)`
      mascot.style.opacity = '1'
    }

    const drawPathProgress = () => {
      maskPath.style.strokeDashoffset = String(pathLength * (1 - progress))
      const point = maskPath.getPointAtLength(progress * pathLength)
      head.setAttribute('transform', `translate(${point.x} ${point.y})`)
      head.setAttribute('opacity', progress > 0 && progress < 1 ? '1' : '0')
    }

    const layout = () => {
      const trackRect = track.getBoundingClientRect()
      const width = trackRect.width
      const height = trackRect.height
      const isDesktop = width >= 760
      const viewWidth = isDesktop ? 960 : width
      const viewHeight = isDesktop ? 330 : height
      const scale = viewWidth / width

      svg.setAttribute('viewBox', `0 0 ${viewWidth} ${viewHeight}`)

      const dots = stageElements.map((step) => {
        const rect = step.querySelector('.dot').getBoundingClientRect()
        return {
          x: rect.left + rect.width / 2 - trackRect.left,
          y: rect.top + rect.height / 2 - trackRect.top,
        }
      })
      const path = isDesktop
        ? pathData
        : `M${width / 2} ${dots[0].y} V${dots[4].y + 70}`

      ;[basePath, overlay, maskPath].forEach((element) => element.setAttribute('d', path))
      const dashArray = isDesktop ? '6 7' : '5 7'
      basePath.setAttribute('stroke-dasharray', dashArray)
      overlay.setAttribute('stroke-dasharray', dashArray)
      mask.setAttribute('width', String(viewWidth))
      mask.setAttribute('height', String(viewHeight))

      pathLength = maskPath.getTotalLength()
      maskPath.style.strokeDasharray = String(pathLength)
      stageDistances = dots.map((dot) => {
        let closestLength = 0
        let closestDistance = Infinity
        for (let length = 0; length <= pathLength; length += pathLength / 400) {
          const point = maskPath.getPointAtLength(length)
          const distance = (point.x - dot.x * scale) ** 2 + (point.y - dot.y * scale) ** 2
          if (distance < closestDistance) {
            closestDistance = distance
            closestLength = length
          }
        }
        return closestLength
      })
      for (let index = 1; index < stageDistances.length; index += 1) {
        stageDistances[index] = Math.max(stageDistances[index], stageDistances[index - 1] + pathLength * .08)
      }

      mascotPositions = dots.map((dot, index) => {
        const direction = isDesktop ? 1 : index % 2 ? -1 : 1
        const position = isDesktop
          ? { x: dot.x, y: dot.y - 34 * scale }
          : { x: dot.x + direction * 64 * scale, y: dot.y + 58 * scale }
        return {
          ...position,
          direction,
          dx: (dot.x - position.x) / scale * direction,
          dy: (dot.y - position.y) / scale,
        }
      })
      effects.forEach((effect, index) => {
        const position = mascotPositions[index]
        effect.style.left = `${position.x}px`
        effect.style.top = `${position.y}px`
        effect.style.transform = `scaleX(${position.direction})`
        effect.style.setProperty('--dx', String(position.dx))
        effect.style.setProperty('--dy', String(position.dy))
      })

      const endpoint = maskPath.getPointAtLength(pathLength)
      endGlow.setAttribute('cx', String(endpoint.x))
      endGlow.setAttribute('cy', String(endpoint.y))
      endGlow.setAttribute('opacity', hasFinished ? '1' : '0')
      drawPathProgress()
      if (currentStep >= 0) {
        mascot.getAnimations().forEach((animation) => animation.cancel())
        setMascotPosition(mascotPositions[currentStep])
      }
    }

    const animateMascot = (keyframes, duration, destination, easing = 'cubic-bezier(.4,0,.3,1)') => {
      const animation = mascot.animate(keyframes, { duration, easing, fill: 'forwards' })
      animation.finished.then(() => {
        setMascotPosition(destination)
        animation.cancel()
      }).catch(() => {})
    }

    const reachStep = (index) => {
      stageElements[index].classList.add('on')
      effects[index].classList.add('go')
      const destination = mascotPositions[index]
      const previous = currentStep >= 0 ? mascotPositions[currentStep] : null
      const scale = track.clientWidth >= 760 ? track.clientWidth / 960 : 1.15

      if (!previous) {
        animateMascot([
          { opacity: 0, transform: `translate(${destination.x}px,${destination.y - 60 * scale}px) scale(.9,1.15)` },
          { opacity: 1, transform: `translate(${destination.x}px,${destination.y}px) scale(1.2,.8)`, offset: .6 },
          { opacity: 1, transform: `translate(${destination.x}px,${destination.y}px)` },
        ], 800, destination)
      } else {
        animateMascot([
          { transform: `translate(${previous.x}px,${previous.y}px)` },
          { transform: `translate(${(previous.x + destination.x) / 2}px,${Math.min(previous.y, destination.y) - 34 * scale}px) scale(.9,1.12)`, offset: .45 },
          { transform: `translate(${destination.x}px,${destination.y}px) scale(1.18,.82)`, offset: .85 },
          { transform: `translate(${destination.x}px,${destination.y}px)` },
        ], 750, destination)
      }

      currentStep = index
      mascotInner.className = `mi g${index + 1}`
      window.clearTimeout(finishTimer)
      finishTimer = window.setTimeout(() => {
        mascotInner.className = 'mi'
      }, 2100)
    }

    const resetAnimation = () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(finishTimer)
      effects.forEach((effect) => effect.classList.remove('go'))
      stageElements.forEach((step) => step.classList.remove('on'))
      mascot.getAnimations().forEach((animation) => animation.cancel())
      mascot.style.opacity = '0'
      mascotInner.className = 'mi'
      track.classList.remove('fin')
      endGlow.setAttribute('opacity', '0')
      progress = 0
      currentStep = -1
      hasFinished = false
      clock = 0
      drawPathProgress()
      hasStarted = false
      replayTimer = window.setTimeout(begin, 700)
    }

    const loop = (time) => {
      if (!isVisible) {
        lastFrame = time
        frameId = window.requestAnimationFrame(loop)
        return
      }

      const delta = Math.min(64, time - lastFrame)
      lastFrame = time
      clock += delta
      if (currentStep < 0) reachStep(0)

      if (clock > 1300) {
        progress = Math.min(1, (clock - 1300) / 8600)
        drawPathProgress()
        for (let index = currentStep + 1; index < stageElements.length; index += 1) {
          if (progress * pathLength >= stageDistances[index]) reachStep(index)
          else break
        }
      }

      if (progress >= 1) {
        hasFinished = true
        track.classList.add('fin')
        endGlow.setAttribute('opacity', '1')
        replayTimer = window.setTimeout(resetAnimation, 2400)
        return
      }

      frameId = window.requestAnimationFrame(loop)
    }

    function begin() {
      if (hasStarted) return
      hasStarted = true
      if (reducedMotion) {
        stageElements.forEach((step) => step.classList.add('on'))
        progress = 1
        drawPathProgress()
        return
      }
      lastFrame = performance.now()
      frameId = window.requestAnimationFrame(loop)
    }

    const startObserver = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          startObserver.disconnect()
          begin()
        }
      }, { rootMargin: '0px 0px -30% 0px' })
    const visibilityObserver = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting
        track.classList.toggle('off', !isVisible)
        mascot.getAnimations().forEach((animation) => {
          if (isVisible) animation.play()
          else animation.pause()
        })
      })
    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(() => {
        window.cancelAnimationFrame(resizeFrameId)
        resizeFrameId = window.requestAnimationFrame(layout)
      })
    const pauseForScroll = () => track.classList.add('is-scrolling')
    const resumeAfterScroll = () => track.classList.remove('is-scrolling')

    startObserver?.observe(track)
    visibilityObserver?.observe(root)
    resizeObserver?.observe(track)
    window.addEventListener('automatemind:scrollstart', pauseForScroll)
    window.addEventListener('automatemind:scrollend', resumeAfterScroll)
    layout()
    document.fonts?.ready.then(layout)
    if (!startObserver) begin()
    if (!visibilityObserver) isVisible = true

    return () => {
      startObserver?.disconnect()
      visibilityObserver?.disconnect()
      resizeObserver?.disconnect()
      window.removeEventListener('automatemind:scrollstart', pauseForScroll)
      window.removeEventListener('automatemind:scrollend', resumeAfterScroll)
      window.cancelAnimationFrame(frameId)
      window.cancelAnimationFrame(resizeFrameId)
      window.clearTimeout(finishTimer)
      window.clearTimeout(replayTimer)
      mascot.getAnimations().forEach((animation) => animation.cancel())
      effects.forEach((effect) => effect.remove())
    }
  }, [])

  return (
    <div className="how-it-works-motion" ref={rootRef} aria-label="AutomateMind transformation workflow">
      <div className="track">
        <svg className="p" aria-hidden="true">
          <defs>
            <radialGradient id="hg">
              <stop offset="0" stopColor="#ffe9b0" />
              <stop offset=".4" stopColor="#e0b865" stopOpacity=".55" />
              <stop offset="1" stopColor="#d1a85d" stopOpacity="0" />
            </radialGradient>
            <mask id="mkm" maskUnits="userSpaceOnUse" x="0" y="0">
              <path id="mk" fill="none" stroke="#fff" strokeWidth="16" strokeLinecap="round" />
            </mask>
          </defs>
          <path id="base" fill="none" stroke="#d1a85d" strokeOpacity=".42" strokeWidth="1.4" />
          <path id="ov" fill="none" stroke="#efce85" strokeWidth="1.8" mask="url(#mkm)" />
          <circle id="endg" r="6" fill="url(#hg)" opacity="0" />
          <g id="head" opacity="0">
            <circle r="9" fill="url(#hg)" />
            <circle r="2.6" fill="#fff2cc" />
          </g>
        </svg>
        <ol className="steps">
          {steps.map((step) => (
            <li className="step" key={step.number} style={{ '--x': step.x, '--y': step.y }}>
              <i className="dot" aria-hidden="true" />
              <div className="tx">
                <span className="num">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mas" aria-hidden="true">
          <div className="mi">
            <svg viewBox="0 0 100 120">
              <defs>
                <radialGradient id="mg" cx=".35" cy=".3" r=".85">
                  <stop offset="0" stopColor="#f6dc96" />
                  <stop offset="1" stopColor="#b78a3a" />
                </radialGradient>
              </defs>
              <ellipse cx="50" cy="116" rx="26" ry="4" fill="#000" opacity=".4" />
              <line x1="50" y1="22" x2="50" y2="9" stroke="#b78a3a" strokeWidth="2.5" />
              <circle cx="50" cy="7" r="4.5" fill="#fff0c4" />
              <rect className="al" x="12" y="72" width="11" height="25" rx="5.5" fill="url(#mg)" />
              <rect className="ar" x="77" y="72" width="11" height="25" rx="5.5" fill="url(#mg)" />
              <ellipse cx="40" cy="111" rx="9" ry="5" fill="#9b722c" />
              <ellipse cx="60" cy="111" rx="9" ry="5" fill="#9b722c" />
              <ellipse cx="50" cy="92" rx="25" ry="21" fill="url(#mg)" />
              <circle cx="50" cy="92" r="6" fill="#0f1a2a" />
              <circle cx="50" cy="92" r="2.5" fill="#9fe8ff" />
              <circle cx="14" cy="47" r="6" fill="#9b722c" />
              <circle cx="86" cy="47" r="6" fill="#9b722c" />
              <rect x="16" y="20" width="68" height="54" rx="26" fill="url(#mg)" />
              <ellipse cx="36" cy="28" rx="11" ry="4" fill="#fff" opacity=".3" transform="rotate(-20 36 28)" />
              <rect x="24" y="33" width="52" height="28" rx="14" fill="#0c1624" />
              <g className="ey">
                <ellipse cx="40" cy="47" rx="4.5" ry="6" fill="#a8f0ff" />
                <ellipse cx="60" cy="47" rx="4.5" ry="6" fill="#a8f0ff" />
                <path d="M44 55 Q50 60 56 55" stroke="#a8f0ff" fill="none" strokeWidth="1.8" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
