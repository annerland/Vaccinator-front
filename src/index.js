import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import SucessModal from 'Modals/success'
import { Provider } from 'react-redux'
import App from './App'
import store from 'Redux/'
import CookieBanner from 'Components/atoms/cookieBanner'
import 'Assets/font-icon/icons.css'
import 'Styles/index.scss'
import 'Styles/animations.scss'
import './i18n'

const app = document.getElementById('app')
localStorage.getItem('not-show-cookie-banner')

const main = (
  <Provider store={store}>
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <SucessModal />
        <CookieBanner />
        <App />
      </QueryParamProvider>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(main, app)
