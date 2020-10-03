import React, { useState } from 'react'
import Input from 'Components/atoms/input'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import LoginTemplate from 'Templates'
import { FormValidator, validator } from 'Util/validator'
import Api from 'Util/api'
import Button from '../../components/atoms/button'
import { useDispatch } from 'react-redux'
import { signIn } from 'Redux/auth/actions'

export default function ResetPasswordRoute () {
  const { t } = useTranslation('ResetPassword')
  const history = useHistory()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')
  const [token, setToken] = useState(null)
  const params = useParams()
  const dispatch = useDispatch()

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
      method: validator.isShort,
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

    if (validation.isValid) {
      Api.Auth.changePassword({
        password,
        password_confirmation: confirmPassword,
        token: params.token
      })
        .then((res) => {
          dispatch(signIn(res))
          history.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <LoginTemplate>
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
    </LoginTemplate>
  )
}
