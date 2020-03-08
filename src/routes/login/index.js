import React from 'react'
import Input from 'Components/atoms/input'
import { useTranslation } from 'react-i18next'
import LoginTemplate from 'Templates'
import { Link } from 'react-router-dom'
import Button from '../../components/atoms/button'
import './index.scss'

export default function LoginRoute () {
  const { t } = useTranslation('test')

  return (
    <LoginTemplate>
      <h2>Welcome</h2>

      <Input
        label='Username'
        placeholder='Username'
      />
      <Input
        label='Password'
        placeholder='Password'
      />

      <Button>Login</Button>
      <div className='form-footer'>
        <span>Don't have an account?</span> <span className='sign-up'><Link to='/sign-up'>Sign up</Link></span>
        <p><Link to='/forgot-password'>Forgot your password?</Link></p>
      </div>
    </LoginTemplate>
  )
}
