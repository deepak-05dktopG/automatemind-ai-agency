import { Link } from 'react-router-dom'

export function PrimaryButton({ to, children, className = '', external = false, ...rest }) {
  const linkProps = external
    ? { to, target: '_blank', rel: 'noreferrer' }
    : { to }

  return (
    <Link className={`button primary-button ${className}`.trim()} {...linkProps} {...rest}>
      <span>
        {children}
        <span className="button-arrow">→</span>
      </span>
    </Link>
  )
}

export function SecondaryButton({ to, children, className = '', external = false, ...rest }) {
  const linkProps = external
    ? { to, target: '_blank', rel: 'noreferrer' }
    : { to }

  return (
    <Link className={`button secondary-button ${className}`.trim()} {...linkProps} {...rest}>
      <span>{children}</span>
    </Link>
  )
}

export function ActionButton({ children, className = '', type = 'button', onClick, ...rest }) {
  return (
    <button type={type} onClick={onClick} className={`button primary-button ${className}`.trim()} {...rest}>
      <span>{children}</span>
    </button>
  )
}
