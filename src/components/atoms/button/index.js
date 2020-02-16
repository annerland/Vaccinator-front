import React from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import './index.scss'

const Button = (props) => {
  const style = Classnames('button',
    `button--${props.type}`,
    `button--${props.size}`
  )

  return (
    <button className={style} disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'decline']),
  size: PropTypes.oneOf(['small', 'middle', 'big']),
  disabled: PropTypes.bool
}

Button.defaultProps = {
  type: 'primary',
  size: 'small'
}

export default Button
