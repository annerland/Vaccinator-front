import StoreRedux from 'Redux/'
import { setGenericModal } from 'Redux/modals/generic/actions'

class Generic {
  static sucess (body) {
    const data = { show: true, id: 'sucess-modal', body }
    StoreRedux.dispatch(setGenericModal(data))
    document.body.style.overflow = 'hidden'
  }

  static show (id, body) {
    const data = { show: true, id, body }
    StoreRedux.dispatch(setGenericModal(data))
    document.body.style.overflow = 'hidden'
  }

  static hide () {
    StoreRedux.dispatch(setGenericModal({}))
    document.body.style.overflow = 'auto'
  }
}

const modals = {
  Generic
}

export default modals
