import { SET_GENERIC_MODAL, LOG_OUT } from '../../actionTypes'

const genericModalReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_GENERIC_MODAL:
      return action.payload
    case LOG_OUT:
      return {}
    default:
      return state
  }
}

export default genericModalReducer
