import React from 'react'
import Input from 'Components/atoms/input'
import { useTranslation } from 'react-i18next'
import LoginTemplate from 'Templates'
import Button from '../../components/atoms/button'
import './index.scss'

export default function LoginRoute () {
  const { t } = useTranslation('test')

  return (
    <LoginTemplate>
      <Input
        label='Username'
      />
      <Input
        label='Password'
      />
      <Button>Login</Button>
    </LoginTemplate>
  )
}
