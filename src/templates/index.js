import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'Assets/logo.png'
import './index.scss'

const LoginTemplate = (props) => {
  return (
    <div className='login-template'>
      <img src={Logo} className='vaccinator-logo' />
      <form>
        {props.children}
      </form>
    </div>
  )
}

LoginTemplate.propTypes = {
  children: PropTypes.node.isRequired
}

export default LoginTemplate
