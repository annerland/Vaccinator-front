import React from 'react'
import Curve from 'Assets/curve.svg'
import MiniCurve from 'Assets/mini-curve.svg'
import Logo from 'Assets/logo-vaccinator-home.svg'
import Button from 'Components/atoms/button'
import Health from 'Assets/health-vector.svg'
import { useHistory } from 'react-router-dom'

import './index.scss'

export default function HomePage () {
  const history = useHistory()

  const redirectLogin = () => {
    history.push('/login')
  }

  const redirectSignUp = () => {
    history.push('/sign-up')
  }

  return (
    <div className='home-container'>
      <div className='home-navbar'>
        <img className='logo' src={Logo} />
        <div className='home-options'>
          <p>Home</p>
          <p>About</p>
          <p>Contact</p>
        </div>

        <Button size='middle' type='decline-primary' onClick={() => redirectLogin()}>Login</Button>
      </div>

      <div className='call-to-action'>
        <h1>Vaccinator</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
        </p>

        <Button onClick={() => redirectSignUp()}>REGISTRE-SE</Button>
      </div>
      <img className='curve' src={Curve} />
      <img className='mini-curve' src={MiniCurve} />
      <img className='undraw-vector' src={Health} />
    </div>
  )
}
