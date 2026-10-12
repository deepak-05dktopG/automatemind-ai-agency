import { useEffect, useRef } from 'react'
import { createAvatar } from '@bible-strong/avatar-react'
import '@bible-strong/avatar-react/styles.css'
import freddyDefinition from '../assets/freddy.avatar.json'
import './HomeAvatarGuide.css'

const MASCOT_SPEED = 2

function speedUpDefinition(definition) {
  return {
    ...definition,
    animations: Object.fromEntries(Object.entries(definition.animations).map(([key, animation]) => [
      key,
      {
        ...animation,
        steps: animation.steps?.map((step) => ({
          ...step,
          holdMs: step.holdMs / MASCOT_SPEED,
          transitionMs: step.transitionMs / MASCOT_SPEED,
        })),
        blink: animation.blink
          ? {
              ...animation.blink,
              initialDelayMs: animation.blink.initialDelayMs / MASCOT_SPEED,
              minIntervalMs: animation.blink.minIntervalMs / MASCOT_SPEED,
              maxIntervalMs: animation.blink.maxIntervalMs / MASCOT_SPEED,
              durationMs: animation.blink.durationMs / MASCOT_SPEED,
            }
          : animation.blink,
      },
    ])),
  }
}

const fastFreddyDefinition = speedUpDefinition(freddyDefinition)
const FreddyAvatar = createAvatar(fastFreddyDefinition)
const AngryFreddyAvatar = createAvatar({
  ...fastFreddyDefinition,
  colors: {
    ...fastFreddyDefinition.colors,
    body: '#c53535',
  },
})

export function HomeAvatarGuide({ as: Element = 'span', children, animation, side = 'right' }) {
  const guideRef = useRef(null)
  const avatarControllerRef = useRef(null)

  useEffect(() => {
    const guide = guideRef.current
    const avatarController = avatarControllerRef.current
    if (!guide) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (!animation) return
      if (entry.isIntersecting) avatarControllerRef.current?.play(animation)
      else avatarControllerRef.current?.pause()
    }, {
      rootMargin: '120px 0px',
      threshold: 0,
    })

    observer.observe(guide)

    return () => {
      observer.disconnect()
      avatarController?.pause()
    }
  }, [animation])

  return (
    <Element ref={guideRef} className={`home-avatar-guide home-avatar-guide--${side}`}>
      <span className="home-avatar-guide__cloud">
        <span className="home-avatar-guide__text">{children}</span>
      </span>
      <span className="home-avatar-guide__avatar-slot" aria-hidden="true">
        {animation === 'angry' ? (
          <AngryFreddyAvatar
            ref={avatarControllerRef}
            defaultAnimation={animation}
            autoplay={false}
            size="var(--home-avatar-size)"
            className="home-avatar-guide__robot"
            ariaLabel="Red Freddy avatar"
          />
        ) : (
          <FreddyAvatar
            ref={avatarControllerRef}
            defaultAnimation={animation}
            autoplay={false}
            size="var(--home-avatar-size)"
            className="home-avatar-guide__robot"
            ariaLabel="Freddy avatar"
          />
        )}
      </span>
    </Element>
  )
}

export default HomeAvatarGuide
