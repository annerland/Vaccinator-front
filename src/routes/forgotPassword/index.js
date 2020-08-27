import React from 'react'
import Input from 'Components/atoms/input'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import LoginTemplate from 'Templates'
import Button from '../../components/atoms/button'
import './index.scss'

export default function ForgotPasswordRoute () {
  const { t } = useTranslation('ResetPassword')
  const history = useHistory()
  const redirect = () => {
    history.push('/')
  }

  return (
    <LoginTemplate>
      <h2>{t('title')}</h2>
      <Input
        label={t('label')}
        placeholder={t('placeholder')}
      />

      <div className='button-reset'>
        <Button type='decline' onClick={redirect}>{t('back')}</Button>
        <Button>{t('reset')}</Button>
      </div>
    </LoginTemplate>
  )
}
