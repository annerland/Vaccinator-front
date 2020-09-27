import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const Alert = (props) => {
  return (
    <div className='alert'>
      {props.children}
      <i onClick={props.onClick} className='icon-close' />
    </div>
  )
}

Alert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  onClick: PropTypes.func
}

Alert.defaultProps = {
  type: 'info'
}

export default Alert
