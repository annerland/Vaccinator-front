import React from 'react'
import Classnames from 'classnames'
import PropTypes from 'prop-types'
import './index.scss'

const Checkbox = (props) => {
  const style = Classnames('checkbox', {
    'checkbox--checked': props.value,
    'checkbox--disabled': props.disabled,
    'checkbox--rounded': props.rounded
  })

  const toggle = () => {
    if (!props.disabled) {
      props.onChange(!props.value)
    }
  }

  return (
    <div className={style} onClick={toggle}>
      <span>
        <i className='icon-check' />
      </span>
      <label className='menu'>{props.label}</label>
    </div>
  )
}

Checkbox.propTypes = {
  rounded: PropTypes.bool,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
}

Checkbox.defaultProps = {
  rounded: false,
  disabled: false,
  value: false
}

export default Checkbox
