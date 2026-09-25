import { Link } from 'react-router-dom'
import ButtonText from './ButtonText'

export function PrimaryButton({ to, children, className = '', external = false, shuffle = true, ...rest }) {
  const linkProps = external
    ? { to, target: '_blank', rel: 'noreferrer' }
    : { to }

  return (
    <Link className={`button primary-button ${className}`.trim()} {...linkProps} {...rest}>
      {shuffle ? (
        <ButtonText>
          {children}
          <span className="button-arrow">→</span>
        </ButtonText>
      ) : (
        <span>
          {children}
          <span className="button-arrow">→</span>
        </span>
      )}
    </Link>
  )
}

export function SecondaryButton({ to, children, className = '', external = false, ...rest }) {
  const linkProps = external
    ? { to, target: '_blank', rel: 'noreferrer' }
    : { to }

  return (
    <Link className={`button secondary-button ${className}`.trim()} {...linkProps} {...rest}>
      <ButtonText>{children}</ButtonText>
    </Link>
  )
}

export function ActionButton({ children, className = '', type = 'button', onClick, ...rest }) {
  return (
    <button type={type} onClick={onClick} className={`button primary-button ${className}`.trim()} {...rest}>
      <ButtonText>{children}</ButtonText>
    </button>
  )
}
