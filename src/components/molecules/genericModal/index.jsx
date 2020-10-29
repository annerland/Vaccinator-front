import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import ClassNames from 'classnames'
import Modals from 'Util/modals'
import './index.scss'

const GenericModal = (props) => {
  const modal = useSelector(({ modals }) => modals.generic)
  const style = ClassNames('generic-body')

  if (!modal.show || modal.id !== props.id) return null

  const handleClose = () => {
    Modals.Generic.hide()
    if (props.handleClose) {
      props.handleClose()
    }
  }

  const stopPropation = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  return (
    <div className='generic-modal'>
      <div onClick={stopPropation} className={style} style={{ width: `${props.width}px`, height: `${props.height}px`, overflow: `${props.overflow}` }}>
        <i className='icon-close' onClick={handleClose} />
        {props.children}
      </div>
    </div>
  )
}

GenericModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  id: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  overflow: PropTypes.string,
  handleClose: PropTypes.func
}

export default GenericModal
