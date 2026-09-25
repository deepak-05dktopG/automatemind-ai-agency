export function SectionHeader({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={`section-header text-${align}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}
