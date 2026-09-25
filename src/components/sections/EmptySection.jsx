export function EmptySection({ className = '', title, id }) {
  return (
    <section id={id} className={`section empty-section ${className}`}>
      {title ? (
        <div className="container empty-section__inner">
          <h2>{title}</h2>
        </div>
      ) : null}
    </section>
  )
}
