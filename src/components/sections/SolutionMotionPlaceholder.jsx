export function SolutionMotionPlaceholder({ label, className = '', aspectRatio = '16 / 9' }) {
  return (
    <div
      className={`solution-motion-placeholder ${className}`.trim()}
      style={{ '--solution-motion-aspect-ratio': aspectRatio }}
      aria-label={`${label} motion graphic placeholder`}
    >
      <span className="solution-motion-placeholder__corner solution-motion-placeholder__corner--top" />
      <span className="solution-motion-placeholder__corner solution-motion-placeholder__corner--bottom" />
      <span className="solution-motion-placeholder__play" aria-hidden="true">▶</span>
      <span className="solution-motion-placeholder__label">MOTION GRAPHIC</span>
      <span className="solution-motion-placeholder__concept">{label}</span>
      <span className="solution-motion-placeholder__timeline" aria-hidden="true"><i /></span>
    </div>
  )
}
