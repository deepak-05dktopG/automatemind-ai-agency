import { useCallback, useEffect, useRef, useState } from 'react'
import './AgencyName.css'

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'

export function AgencyName({ className = '' }) {
  const text = 'AutomateMind'
  const [displayText, setDisplayText] = useState(text)
  const isAnimatingRef = useRef(false)
  const hasAnimatedRef = useRef(false)
  const containerRef = useRef(null)
  const intervalRef = useRef(null)

  const startDecrypt = useCallback(() => {
    if (isAnimatingRef.current || hasAnimatedRef.current) return

    isAnimatingRef.current = true
    hasAnimatedRef.current = true
    let iteration = 0
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((character, index) => {
            if (character === ' ' || index < iteration) return character
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join(''),
      )

      iteration += 1 / 2
      if (iteration >= text.length) {
        clearInterval(intervalRef.current)
        setDisplayText(text)
        isAnimatingRef.current = false
      }
    }, 45)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startDecrypt()
      },
      { threshold: 0.1 },
    )

    observer.observe(container)
    return () => {
      observer.disconnect()
      clearInterval(intervalRef.current)
    }
  }, [startDecrypt])

  return (
    <span
      ref={containerRef}
      className={`agency-name ${className}`.trim()}
      aria-label={text}
    >
      <span className="agency-name__sr-only">{text}</span>
      <span className="agency-name__layout" aria-hidden="true">
        {text.split('').map((character, index) => (
          <span key={`${character}-${index}`} className={index < 7 ? 'agency-name__automate' : 'agency-name__mind'}>
            {character}
          </span>
        ))}
      </span>
      <span className="agency-name__visual" aria-hidden="true">
        {displayText.split('').map((character, index) => (
          <span key={`${character}-${index}`} className={index < 8 ? 'agency-name__automate' : 'agency-name__mind'}>
            {character}
          </span>
        ))}
      </span>
    </span>
  )
}
