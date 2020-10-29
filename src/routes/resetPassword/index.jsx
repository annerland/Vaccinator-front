import React, { useState } from 'react'
import Input from 'Components/atoms/input'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import LoginTemplate from 'Templates'
import { FormValidator, validator } from 'Util/validator'
import Api from 'Util/api'
import Alert from 'Components/atoms/alert'
import Modals from 'Util/modals'
import Loading from 'Components/atoms/loading'
import Button from '../../components/atoms/button'

export default function ResetPasswordRoute () {
  const { t } = useTranslation('ResetPassword')
  const history = useHistory()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')
  const params = useParams()

  const redirect = () => {
    history.push('/')
  }

  // Form schema validator
  const formValidator = new FormValidator([
    {
      field: 'password',
      method: validator.isEmpty,
      validWhen: false,
      message: t('validation.password')
    },
    {
      field: 'password',
      method: validator.isPowerfullPassword,
      validWhen: false,
      message: t('validation.short-password')
    },
    {
      field: 'confirmPassword',
      method: validator.isSamePassword,
      validWhen: true,
      message: t('validation.confirm-password')
    }
  ])

  const submit = (e) => {
    e.preventDefault()
    const validation = formValidator.validate({ password, confirmPassword })
    setErrors(validation)
    const payload = {}
    payload.password = password
    payload.password_confirmation = confirmPassword
    payload.token = params.token

    setLoading(true)
    Api.Auth.resetPassword(payload)
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
        if (err.response.status === 422) return setLoginError('ERRO: Token expirado')
      })
  }

  return (
    <LoginTemplate>
      <Loading show={loading} />
      <h2>{t('title')}</h2>
      <Input
        type='password'
        label='password'
        placeholder={t('placeholder')}
        value={password}
        onChange={setPassword}
        validator={errors.password}
      />

      <Input
        type='password'
        label='confirm password'
        placeholder={t('placeholder')}
        value={confirmPassword}
        onChange={setConfirmPassword}
        validator={errors.confirmPassword}
      />

      <div className='button-reset'>
        <Button type='decline' onClick={redirect}>{t('back')}</Button>
        <Button onClick={submit}>{t('reset')}</Button>
      </div>
      {loginError && <Alert children={loginError} />}
    </LoginTemplate>
  )
}
