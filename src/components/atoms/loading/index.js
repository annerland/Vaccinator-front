import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const LoadingSpin = (props) => {
  if (!props.show) return null

  return (
    <div className='loading-spin'>
      <div className='lds-dual-ring' />
    </div>
  )
}

LoadingSpin.propTypes = {
  show: PropTypes.bool
}

LoadingSpin.defaultProps = {
  show: false
}

export default LoadingSpin
