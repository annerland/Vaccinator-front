import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import ErrorMessage from 'Components/atoms/errorMessage'
import './index.scss'

const SelectWrapper = (props) => {
  return (
    <div className='select'>
      <div className='title-section'>
        {props.label && <label>{props.label}</label>}
      </div>

      <Select
        isDisabled={props.disabled}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        options={props.options}
      />
      <ErrorMessage validator={props.validator} />
    </div>
  )
}

SelectWrapper.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.array,
  validator: PropTypes.object
}

SelectWrapper.defaultProps = {
  options: [],
  validator: {}
}

export default SelectWrapper
