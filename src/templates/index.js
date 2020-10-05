import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'Assets/logo.png'
import { motion } from 'framer-motion'
import Curve from 'Assets/curve.svg'
import MiniCurve from 'Assets/mini-curve.svg'
import './index.scss'

const LoginTemplate = (props) => {
  const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={list}
      className='login-template'
    >
      <img src={Logo} className='vaccinator-logo' />
      <form>
        {props.children}
      </form>

      <img className='curve' src={Curve} />
      <img className='mini-curve' src={MiniCurve} />
    </motion.div>
  )
}

LoginTemplate.propTypes = {
  children: PropTypes.node.isRequired
}

export default LoginTemplate
