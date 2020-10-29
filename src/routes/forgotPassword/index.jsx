import React, { useState } from 'react'
import Input from 'Components/atoms/input'
import Alert from 'Components/atoms/alert'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import LoginTemplate from 'Templates'
import { FormValidator, validator } from 'Util/validator'
import Button from '../../components/atoms/button'
import Api from 'Util/api'
import './index.scss'

export default function ForgotPasswordRoute () {
  const { t } = useTranslation('ResetPassword')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [httpError, setHttpError] = useState('')
  const [httpSucess, setHttpSucess] = useState('')
  const history = useHistory()
  const redirect = () => {
    history.push('/')
  }

  const formValidator = new FormValidator([
    {
      field: 'email',
      method: validator.isEmail,
      validWhen: true,
      message: t('validation.email')
    }
  ])

  const sendEmail = (e) => {
    e.preventDefault()
    const validation = formValidator.validate({ email })
    setErrors(validation)

    if (validation.isValid) {
      const payload = {}
      payload.email = email

      Api.Auth.forgotPassword(payload)
        .then(res => {
          setHttpSucess(res.message)
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
        label={t('label')}
        onChange={setEmail}
        value={email}
        placeholder={t('placeholder')}
        validator={errors.email}
      />

      {httpError && <Alert onClick={() => setHttpError(false)} type='error'>{httpError}</Alert>}
      {httpSucess && <Alert onClick={() => setHttpSucess(false)} type='sucess'>{httpSucess}</Alert>}

      <div className='button-reset'>
        <Button type='decline' onClick={redirect}>{t('back')}</Button>
        <Button onClick={sendEmail}>{t('reset')}</Button>
      </div>
    </LoginTemplate>
  )
}
