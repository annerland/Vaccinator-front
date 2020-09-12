import React, { useState } from 'react'
import Input from 'Components/atoms/input'
import LoginTemplate from 'Templates'
import { useHistory } from 'react-router-dom'
import { FormValidator, validator } from 'Util/validator'
import Modals from 'Util/modals'
import Loading from 'Components/atoms/loading'
import Button from '../../components/atoms/button'
import { useDispatch } from 'react-redux'
import Api from 'Util/api'

import './index.scss'

export default function SignUpRoute () {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const redirect = () => {
    history.push('/')
  }

  const formValidator = new FormValidator([
    {
      field: 'email',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Email inválido'
    },
    {
      field: 'password',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Senha inválida'
    },
    {
      field: 'confirmPassword',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Senha inválida'
    }
  ])

  const submit = (e) => {
    e.preventDefault()
    const validation = formValidator.validate({ email, password, confirmPassword })
    setErrors(validation)

    if (validation.isValid) {
      setLoading(true)
      const payload = {}
      payload.email = email
      payload.password = password
      payload.language = 'pt'
      payload.password_confirmation = confirmPassword

      setLoading(false)
      Api.Auth.signUp(payload)
        .then(res => {
          setLoading(false)
          Modals.Generic.sucess({
            title: 'Registre-se',
            text: 'Seu registro foi criado com sucesso! Acesse a plataforma agora.',
            cancel: 'Cancelar',
            continue: 'Ir',
            handleAction: () => history.push('/login')
          })
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
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
            label='Password'
            value={password}
            onChange={setPassword}
            placeholder='******'
            validator={errors.password}
          />

          <Input
            type='password'
            label='Confirm Password'
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder='******'
            validator={errors.confirmPassword}
          />
        </div>

        <div className='sign-button'>
          <Button type='decline' onClick={() => redirect()}>Back</Button>
          <Button onClick={submit}>Register</Button>
        </div>

      </LoginTemplate>
    </div>
  )
}
