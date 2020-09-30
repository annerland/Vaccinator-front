import React, { useState } from 'react'
import Input from 'Components/atoms/input'
import LoginTemplate from 'Templates'
import { useHistory } from 'react-router-dom'
import { FormValidator, validator } from 'Util/validator'
import { useTranslation } from 'react-i18next'
import Modals from 'Util/modals'
import Loading from 'Components/atoms/loading'
import Alert from 'Components/atoms/alert'
import Checkbox from 'Components/atoms/checkbox'
import Button from '../../components/atoms/button'
import ShowTerms from 'Modals/terms'
import Api from 'Util/api'

import './index.scss'

export default function SignUpRoute () {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [errors, setErrors] = useState('')
  const [check, setCheck] = useState(false)
  const { t } = useTranslation('Login')
  const history = useHistory()
  const redirect = () => {
    history.push('/')
  }

  const showTerms = () => {
    Modals.Generic.show('show-terms')
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
      const payload = {}
      payload.email = email
      payload.password = password
      payload.password_confirmation = confirmPassword

      setLoading(true)
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
          if (err.response.status === 422) return setLoginError('ERRO: Usuário já cadastrado')
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

          <Checkbox value={check} onChange={setCheck} label={<>{t('register')} <p onClick={showTerms}>{t('subtitle')}</p></>} />
        </div>

        <div className='sign-button'>
          <Button type='decline' onClick={() => redirect()}>{t('back')}</Button>
          <Button disabled={!check} onClick={submit}>{t('send')}</Button>
        </div>
        {loginError && <Alert children={loginError} />}
        <ShowTerms />
      </LoginTemplate>
    </div>
  )
}
