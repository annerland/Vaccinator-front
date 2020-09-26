import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import LoginTemplate from 'Templates'
import Api from 'Util/api'

import './index.scss'

export default function ConfirmRoute () {
  const history = useHistory()
  const params = useParams()

  const getParam = () => {
    Api.Auth.active(params)
  }

  useEffect(() => {
    getParam()
  }, [])

  return (
    <LoginTemplate>
      <div className='active-content'>
        <h1>Parabéns! sua conta foi ativada.</h1>
        <p>Para efetuar o login, <span onClick={() => history.push('/login')}>clique aqui.</span></p>
      </div>
    </LoginTemplate>
  )
}
