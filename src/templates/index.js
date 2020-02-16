import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const LoginTemplate = (props) => {
  return (
    <div className='login-template'>

      <form>
        <h2>Login</h2>

        {props.children}
      </form>
    </div>
  )
}

LoginTemplate.propTypes = {
  children: PropTypes.node.isRequired
}

export default LoginTemplate
