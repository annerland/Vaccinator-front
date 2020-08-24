import { SIGN_IN, LOG_OUT } from '../actionTypes'

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.payload
    case LOG_OUT:
      window.location.replace('/')
      return {}
    default:
      return state
  }
}

export default authReducer
