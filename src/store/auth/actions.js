import { SIGN_IN, LOG_OUT } from '../actionTypes'

export const signIn = (data) => ({
  type: SIGN_IN,
  payload: data
})

export const logOut = () => ({
  type: LOG_OUT
})
