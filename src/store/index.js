import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import reducers from './reducers'
import persistState from 'redux-localstorage'

let middlewares = null
const persist = () => persistState(['auth'])

if (process.env.NODE_ENV === 'development') {
  middlewares = compose(applyMiddleware(logger), persist())
} else {
  middlewares = compose(persist())
}

const store = createStore(
  reducers,
  middlewares
)

export default store
