import { useId } from 'react'
import './RobotFigure.css'

export function RobotFigure({
  name,
  size = 220,
  color,
  accentColor,
  faceColor = '#08090e',
  detailColor,
  animate = false,
  className = '',
  style,
  content,
  contentClassName = '',
  contentStyle,
  children,
}) {
  const id = useId().replace(/:/g, '')
  const ids = {
    body: `${id}-body`,
    sparkle: `${id}-sparkle`,
  }

  return (
    <div
      className={`robot-figure${animate ? ' robot-figure--animated' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--robot-size': `${size}px`,
        '--robot-color': color,
        '--robot-accent': accentColor,
        '--robot-face': faceColor,
        '--robot-detail': detailColor || accentColor,
        ...style,
      }}
      role="img"
      aria-label={`${name} robot mascot`}
    >
      <svg viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={ids.body} x1="48" y1="45" x2="176" y2="221" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--robot-accent)" />
            <stop offset=".38" stopColor="var(--robot-color)" />
            <stop offset=".78" stopColor="var(--robot-color)" />
            <stop offset="1" stopColor="var(--robot-shade, var(--robot-color))" />
          </linearGradient>
          <radialGradient id={ids.sparkle} cx="0" cy="0" r="1" gradientTransform="matrix(0 10 -10 0 0 0)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="var(--robot-accent)" />
          </radialGradient>
        </defs>
        {children(ids)}
      </svg>
      {content && (
        <div className={`robot-figure__content${contentClassName ? ` ${contentClassName}` : ''}`} style={contentStyle}>
          {content}
        </div>
      )}
    </div>
  )
}

export default RobotFigure
