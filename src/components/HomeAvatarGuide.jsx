import { useEffect, useRef, useState } from 'react'
import { createAvatar } from '@bible-strong/avatar-react'
import '@bible-strong/avatar-react/styles.css'
import freddyDefinition from '../assets/freddy.avatar.json'
import './HomeAvatarGuide.css'

const FreddyAvatar = createAvatar(freddyDefinition)
const AngryFreddyAvatar = createAvatar({
  ...freddyDefinition,
  colors: {
    ...freddyDefinition.colors,
    body: '#c53535',
  },
})

export function HomeAvatarGuide({ as: Element = 'span', children, animation, side = 'right' }) {
  const guideRef = useRef(null)
  const avatarControllerRef = useRef(null)
  const isVisibleRef = useRef(false)
  const isScrollingRef = useRef(false)
  const hasBeenVisibleRef = useRef(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  const revealAvatar = () => {
    if (hasBeenVisibleRef.current) return
    hasBeenVisibleRef.current = true
    setHasBeenVisible(true)
  }

  useEffect(() => {
    const guide = guideRef.current
    if (!guide) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting
      if (entry.isIntersecting && !isScrollingRef.current) revealAvatar()

      if (!animation) return
      if (entry.isIntersecting && !isScrollingRef.current) avatarControllerRef.current?.play(animation)
      else avatarControllerRef.current?.pause()
    }, {
      rootMargin: '120px 0px',
      threshold: 0,
    })

    observer.observe(guide)

    return () => {
      observer.disconnect()
      avatarControllerRef.current?.pause()
    }
  }, [animation])

  useEffect(() => {
    if (!animation) return undefined

    const handleScrollStart = () => {
      isScrollingRef.current = true
      avatarControllerRef.current?.pause()
    }

    const handleScrollEnd = () => {
      isScrollingRef.current = false
      if (isVisibleRef.current) {
        revealAvatar()
        avatarControllerRef.current?.play(animation)
      }
    }

    window.addEventListener('automatemind:scrollstart', handleScrollStart)
    window.addEventListener('automatemind:scrollend', handleScrollEnd)

    if (hasBeenVisible && isVisibleRef.current && !isScrollingRef.current) {
      avatarControllerRef.current?.play(animation)
    }

    return () => {
      window.removeEventListener('automatemind:scrollstart', handleScrollStart)
      window.removeEventListener('automatemind:scrollend', handleScrollEnd)
      avatarControllerRef.current?.pause()
    }
  }, [animation, hasBeenVisible])

  return (
    <Element ref={guideRef} className={`home-avatar-guide home-avatar-guide--${side}`}>
      <span className="home-avatar-guide__cloud">
        <span className="home-avatar-guide__text">{children}</span>
      </span>
      <span className="home-avatar-guide__avatar-slot" aria-hidden="true">
        {hasBeenVisible && (
          animation === 'angry' ? (
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
          )
        )}
      </span>
    </Element>
  )
}

export default HomeAvatarGuide
