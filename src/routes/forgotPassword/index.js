import React from 'react'
import Input from 'Components/atoms/input'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import LoginTemplate from 'Templates'
import Button from '../../components/atoms/button'
import './index.scss'

export default function ForgotPasswordRoute () {
  const { t } = useTranslation('test')
  const history = useHistory()
  const redirect = () => {
    history.push('/')
  }

  return (
    <LoginTemplate>
      <h2>Reset your password</h2>
      <Input
        label='Insert your e-mail to reset your password'
        placeholder='password'
      />

      <div className='button-reset'>
        <Button type='decline' onClick={redirect}>Back</Button>
        <Button>Reset</Button>
      </div>
    </LoginTemplate>
  )
}
