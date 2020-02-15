import React from 'react'
import { useTranslation } from 'react-i18next'
import './index.scss'

const Login = () => {
  const { t } = useTranslation('test')

  return (
    <h1>{t('testing')}</h1>
  )
}

export default Login
