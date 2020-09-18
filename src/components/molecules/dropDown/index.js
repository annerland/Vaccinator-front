import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const DropDown = (props) => {
  const [show, setShow] = useState(false)

  const showInfo = () => {
    show ? setShow(false) : setShow(true)
  }

  return (
    <div className='drop-down'>
      <div className='list-drop'>
        <div className='flex-text-name'>
          <i className='icon-hospital' />
          <p className='field'>Unidade:</p>
          <p className='field-name'>{props.name}</p>
        </div>

        <div className='flex-text'>
          <p className='field'>Endereço:</p>
          <p>{props.adress}</p>
        </div>

        <i onClick={() => showInfo()} className={show ? 'icon-arrow-up' : 'icon-arrow-down'} />
      </div>

      {show &&
        <div className='info'>
          <p className='title'>Informações adicionais</p>

          <div className='flex-text'>
            <p className='field'>Vacinas disponíveis:</p>
            <p>{props.vaccine}</p>
          </div>

          <div className='flex-text'>
            <p className='field'>Bairro:</p>
            <p>{props.district}</p>
          </div>

          <div className='flex-text'>
            <p className='field'>CEP:</p>
            <p>{props.cep}</p>
          </div>

          <p className='information'>Informe aos usuários que há outras vacinas disponíveis <span onClick={props.onClick}>aqui</span></p>
        </div>}
    </div>
  )
}

DropDown.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  adress: PropTypes.string,
  vaccine: PropTypes.string,
  district: PropTypes.string,
  cep: PropTypes.string
}

export default DropDown
