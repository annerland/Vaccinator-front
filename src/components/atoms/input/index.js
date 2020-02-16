import React from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import './index.scss'

const Input = (props) => {
  const style = ClassNames('main-input', {
    'main-input--primary': props.primary
  })

  return (
    <div className={style}>
      {props.label && <label>{props.label}</label>}
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.label,
  placeholder: PropTypes.string,
  primary: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default Input
