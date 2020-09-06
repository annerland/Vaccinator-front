import React from 'react'
import PropTypes from 'prop-types'

const Wallet = (props) => {
  return (
    <div className='wallet-component-container'>
      <div className='header'>
        <img src={props.src} />
        <div className='content'>
          <div className='flex-content'>
            <p className='bold-text'>Nome:</p>
            <p>{props.name}</p>
          </div>
          <div className='flex-content'>
            <p className='bold-text'>Idade:</p>
            <p>{props.age}</p>
          </div>
          <div className='flex-content'>
            <p className='bold-text'>Gênero:</p>
            <p>{props.gender}</p>
          </div>
        </div>
        <div className='footer'>
          <div className='flex-content'>
            <p className='bold-text'>Alergias:</p>
            <p>{props.name}</p>
          </div>
          <div className='flex-content'>
            <p className='bold-text'>Grau de parentesco:</p>
            <p>{props.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

Wallet.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  age: PropTypes.string,
  gender: PropTypes.string
}

export default Wallet
