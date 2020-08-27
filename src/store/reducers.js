import { combineReducers } from 'redux'
import auth from './auth/reducer'
import modals from './modals'

const reducers = combineReducers({
  auth,
  modals
})

export default reducers
