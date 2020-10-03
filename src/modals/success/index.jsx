import React from 'react'
import Modal from 'Components/molecules/genericModal'
import Modals from 'Util/modals'
import Button from 'Components/atoms/button'
import { useSelector } from 'react-redux'

const ModalSucess = () => {
  const modal = useSelector(({ modals }) => modals.generic)

  const handleContinue = () => {
    Modals.Generic.hide()
    if (modal.body.handleAction) {
      modal.body.handleAction()
    }
  }

  if (!modal.body) return null

  return (
    <Modal id='sucess-modal' width={modal.body.width || 300}>
      <div className='modal-content'>
        <p className='title'><strong>{modal.body.title}</strong></p>
        <label className='menu'>{modal.body.text}</label>
      </div>
      <div className='modal-actions'>
        {modal.body.cancel &&
          <Button onClick={() => Modals.Generic.hide()} type='decline'>
            {modal.body.cancel}
          </Button>}
        <Button onClick={handleContinue}>
          {modal.body.continue}
        </Button>
      </div>
    </Modal>
  )
}

export default ModalSucess
