import React from 'react'
import ClassNames from 'classnames'
import ErrorMessage from 'Components/atoms/errorMessage'
import InputMask from 'react-input-mask'
import PropTypes from 'prop-types'
import './index.scss'

const Input = (props) => {
  const style = ClassNames('main-input', {
    'main-input--primary': props.primary,
    'input-field--invalid': !!props.validator.isInvalid
  })

  return (
    <div className={style}>
      {props.label && <label>{props.label}</label>}
      <InputMask
        mask={props.mask}
        type={props.type}
        disabled={props.disabled}
        placeholder={props.placeholder}
        onChange={e => props.onChange(e.target.value)}
        value={props.value}
      />
      <ErrorMessage validator={props.validator} />
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  mask: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  primary: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  validator: PropTypes.object,
  onChange: PropTypes.func
}

Input.defaultProps = {
  type: 'text',
  validator: {},
  disabled: false
}

export default Input
