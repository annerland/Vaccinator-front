import React, { useState, useEffect } from 'react'
import Input from 'Components/atoms/input'
import Api from 'Util/api'
import { FormValidator, validator } from 'Util/validator'
import { useTranslation } from 'react-i18next'
import LoginTemplate from 'Templates'
import { Link, useHistory } from 'react-router-dom'
import { signIn } from 'Redux/auth/actions'
import Button from '../../components/atoms/button'
import Loading from 'Components/atoms/loading'
import { getUserLogged } from 'Util/helpers'
import { useDispatch } from 'react-redux'
import path from 'ramda'

import './index.scss'

export default function LoginRoute () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const { t } = useTranslation('Login')

  const formValidator = new FormValidator([
    {
      field: 'email',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('invalidUser')}`
    },
    {
      field: 'password',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('invalidPass')}`
    }
  ])

  useEffect(() => {
    getUserLogged(history)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    const validation = formValidator.validate({ email, password })
    setErrors(validation)
    if (validation.isValid) {
      setLoading(true)
      Api.Auth.signIn({ email, password })
        .then(res => {
          setLoading(false)
          dispatch(signIn(res))
          history.push('/user/home')
        })
        .catch(err => {
          setLoading(false)
          setLoginError(path(['error', 'message'], err))
        })
    }
  }

  return (
    <LoginTemplate>
      <h2>Welcome</h2>

      <Loading show={loading} />

      <Input
        type='text'
        label='E-mail'
        placeholder='E-mail'
        value={email}
        onChange={setEmail}
        validator={errors.email}
      />

      <Input
        label={t('password')}
        placeholder={t('password')}
        password={password}
        onChange={setPassword}
        type='password'
        validator={errors.password}
      />

      <Button onClick={submit}>Login</Button>
      <div className='form-footer'>
        <span>{t('text')}</span> <span className='sign-up'><Link to='/sign-up'>{t('sign')}</Link></span>
        <p><Link to='/forgot-password'>{t('forgot')}</Link></p>
      </div>

      {loginError && console.log(loginError)}

    </LoginTemplate>
  )
}
