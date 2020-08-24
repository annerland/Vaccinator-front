import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'Assets/logo.png'
import Curve from 'Assets/curve.svg'
import MiniCurve from 'Assets/mini-curve.svg'
import './index.scss'

const LoginTemplate = (props) => {
  return (
    <div className='login-template'>
      <img src={Logo} className='vaccinator-logo' />
      <form>
        {props.children}
      </form>

      <img className='curve' src={Curve} />
      <img className='mini-curve' src={MiniCurve} />
    </div>
  )
}

LoginTemplate.propTypes = {
  children: PropTypes.node.isRequired
}

export default LoginTemplate
