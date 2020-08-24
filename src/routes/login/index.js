import React, { useState, useEffect } from 'react'
import Input from 'Components/atoms/input'
import Api from 'Util/api'
import { FormValidator, validator } from 'Util/validator'
import { useTranslation } from 'react-i18next'
import LoginTemplate from 'Templates'
import { Link, useHistory } from 'react-router-dom'
import { signIn } from 'Redux/auth/actions'
import Button from '../../components/atoms/button'
import { getUserLogged } from 'Util/helpers'
import { useDispatch } from 'react-redux'
import path from 'ramda'

import './index.scss'

const formValidator = new FormValidator([
  {
    field: 'login',
    method: validator.isEmpty,
    validWhen: false,
    message: 'usuário inválido'
  },
  {
    field: 'password',
    method: validator.isEmpty,
    validWhen: false,
    message: 'senha inválida'
  }
])

export default function LoginRoute () {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const { t } = useTranslation('login')

  useEffect(() => {
    getUserLogged(history)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    const validation = formValidator.validate({ login, password })
    setErrors(validation)
    if (validation.isValid) {
      Api.Auth.signIn({ login, password })
        .then(res => {
          dispatch(signIn(res))
          history.push('/user/home')
        })
        .catch(err => {
          setLoginError(path(['response', 'data', 'errors', 0, 'details'], err))
        })
    }
  }

  return (
    <LoginTemplate>
      <h2>Welcome</h2>

      <Input
        type='text'
        label='E-mail'
        placeholder='E-mail'
        value={login}
        onChange={setLogin}
        validator={errors.login}
      />

      <Input
        label='Password'
        placeholder='Password'
        password={password}
        onChange={setPassword}
        type='password'
        validator={errors.password}
      />

      <Button onClick={submit}>Login</Button>
      <div className='form-footer'>
        <span>Don't have an account?</span> <span className='sign-up'><Link to='/sign-up'>Sign up</Link></span>
        <p><Link to='/forgot-password'>Forgot your password?</Link></p>
      </div>

      {loginError && console.log(loginError)}

    </LoginTemplate>
  )
}
