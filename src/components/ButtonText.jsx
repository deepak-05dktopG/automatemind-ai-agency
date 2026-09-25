import React, { Children, isValidElement } from 'react'
import Shuffle from './Shuffle'

/**
 * ButtonText helper component that recursively traverses button children,
 * automatically applying the Shuffle animation to string text nodes while preserving
 * icons, arrows, and other elements.
 */
export function ButtonText({ children, shuffleProps = {} }) {
  const defaultProps = {
    loop: true,
    loopDelay: 1.5,
    triggerOnce: false,
    triggerOnMount: true,
    triggerOnHover: true,
    shuffleDirection: 'right',
    textAlign: 'left',
    tag: 'span',
    ...shuffleProps
  }

  const processChild = (child) => {
    if (typeof child === 'string') {
      if (!child.trim()) return child
      return <Shuffle text={child} {...defaultProps} />
    }
    if (typeof child === 'number') {
      return <Shuffle text={String(child)} {...defaultProps} />
    }
    if (isValidElement(child) && child.props && child.props.children) {
      // If child is a wrapper like <span>Text</span>, process its children recursively
      return React.cloneElement(child, {
        children: processChildren(child.props.children)
      })
    }
    return child
  }

  const processChildren = (nodes) => {
    return Children.map(nodes, (node) => processChild(node))
  }

  return <>{processChildren(children)}</>
}

export default ButtonText
