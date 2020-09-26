import React, { useState } from 'react'
import Input from 'Components/atoms/input'
import LoginTemplate from 'Templates'
import { useHistory } from 'react-router-dom'
import { FormValidator, validator } from 'Util/validator'
import { useTranslation } from 'react-i18next'
import Modals from 'Util/modals'
import Loading from 'Components/atoms/loading'
import Button from '../../components/atoms/button'
import { path } from 'ramda'
import Api from 'Util/api'

import './index.scss'

export default function SignUpRoute () {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [errors, setErrors] = useState('')
  const { t } = useTranslation('Login')
  const history = useHistory()
  const redirect = () => {
    history.push('/')
  }

  const formValidator = new FormValidator([
    {
      field: 'email',
      method: validator.isEmpty,
      validWhen: false,
      message: t('invalidUser')
    },
    {
      field: 'password',
      method: validator.isEmpty,
      validWhen: false,
      message: t('invalidPass')
    },
    {
      field: 'confirmPassword',
      method: validator.isEmpty,
      validWhen: false,
      message: t('invalidPass')
    }
  ])

  const submit = (e) => {
    e.preventDefault()
    const validation = formValidator.validate({ email, password, confirmPassword })
    setErrors(validation)

    if (validation.isValid) {
      setLoading(true)
      const payload = {}
      payload.email = email
      payload.password = password
      payload.password_confirmation = confirmPassword

      setLoading(false)
      Api.Auth.signUp(payload)
        .then(res => {
          setLoading(false)
          Modals.Generic.sucess({
            title: t('sign-up'),
            text: t('text-sign-up'),
            cancel: t('cancel'),
            continue: t('continue'),
            handleAction: () => history.push('/login')
          })
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
          setLoginError(path(['error', 'message'], err))
        })
    }
  }

  return (
    <div className='sign-up-route'>
      <Loading show={loading} />
      <LoginTemplate>
        <h2>Sign up</h2>
        <div className='sign-up-grid'>
          <Input
            label='E-mail'
            value={email}
            onChange={setEmail}
            placeholder='teste@gmail.com'
            validator={errors.email}
          />
          <Input
            type='password'
            label={t('password')}
            value={password}
            onChange={setPassword}
            placeholder='******'
            validator={errors.password}
          />

          <Input
            type='password'
            label={t('confirm-password')}
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder='******'
            validator={errors.confirmPassword}
          />
        </div>

        <div className='sign-button'>
          <Button type='decline' onClick={() => redirect()}>{t('back')}</Button>
          <Button onClick={submit}>{t('send')}</Button>
        </div>

        {loginError && console.log(loginError)}

      </LoginTemplate>
    </div>
  )
}
