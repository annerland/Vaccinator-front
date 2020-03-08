import React from 'react'
import Input from 'Components/atoms/input'
import { useTranslation } from 'react-i18next'
import LoginTemplate from 'Templates'
import { useHistory } from 'react-router-dom'
import Button from '../../components/atoms/button'
import './index.scss'

export default function SignUpRoute () {
  const { t } = useTranslation('test')
  const history = useHistory()
  const redirect = () => {
    history.push('/')
  }

  return (
    <div className='sign-up-route'>
      <LoginTemplate>
        <h2>Sign up</h2>
        <div className='sign-up-grid'>
          <Input
            label='Name'
            placeholder='Name'
          />
          <Input
            label='Surname'
            placeholder='Surname'
          />
          <Input
            label='E-mail'
            placeholder='teste@teste.com'
          />
          <Input
            label='Password'
            placeholder='*****'
          />
          <Input
            label='CPF'
            placeholder='000.000.000-00'
          />
          <Input
            label='date of birth'
            placeholder='13/11/1999'
          />
          <Input
            label='Endereço'
            placeholder='rua qualquer, 23'
          />
          <Input
            label='CEP'
            placeholder='8888-888'
          />
        </div>

        <div className='sign-button'>
          <Button type='decline' onClick={redirect}>Back</Button>
          <Button>Register</Button>
        </div>

      </LoginTemplate>
    </div>
  )
}
