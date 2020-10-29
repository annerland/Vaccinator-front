import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import './index.scss'

const Line = (props) => {
  const style = ClassNames('line',
  `line--${props.size}`,
  { 'line--paginate': props.pagination })

  return (
    <div className={style}>
      <Select
        placeholder={props.placeholder}
        classNamePrefix='line-container'
        value={props.value}
        onChange={props.onChange}
        options={props.options}
      />
    </div>
  )
}

Line.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.array,
  size: PropTypes.oneOf(['small', 'default']),
  pagination: PropTypes.bool
}

Line.defaultProps = {
  size: 'default'
}

export default Line
