import axios from 'axios'
import Auth from './auth'
import { logOut } from 'Redux/auth/actions'
import StoreRedux from 'Redux/'
import Vaccine from './vaccine'
import Persona from './persona'
import News from './news.js'
import Establishment from './establishment'

const httpWrapper = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000
})

const handleRequest = config => {
  const { auth } = StoreRedux.getState()

  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }

  return config
}

const handleError = error => {
  if (error.response.status === 401) {
    // window.location.replace('/')
    console.log('401')
    // StoreRedux.dispatch(logOut())
  }

  return Promise.reject(error)
}

httpWrapper.interceptors.request.use(handleRequest, err => Promise.reject(err))
httpWrapper.interceptors.response.use(res => res, handleError)

export default {
  Auth: new Auth(httpWrapper),
  Vaccine: new Vaccine(httpWrapper),
  Persona: new Persona(httpWrapper),
  Establishment: new Establishment(httpWrapper),
  News: new News(httpWrapper)
}
