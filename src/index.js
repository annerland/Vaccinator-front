import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { Provider } from 'react-redux'
import App from './App'
import 'Assets/font-icon/icons.css'
import 'Styles/index.scss'
import 'Styles/animations.scss'
import './i18n'

const app = document.getElementById('app')

const main = (
  <BrowserRouter>
    <QueryParamProvider ReactRouterRoute={Route}>
      <App />
    </QueryParamProvider>
  </BrowserRouter>
)

ReactDOM.render(main, app)
