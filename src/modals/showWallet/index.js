import React, { useState, useEffect } from 'react'
import Modal from 'Components/molecules/genericModal'
import Loading from 'Components/atoms/loading'
import Api from 'Util/api'
import { useSelector } from 'react-redux'
import { path } from 'ramda'
import moment from 'moment'

import './index.scss'

const ShowWalletModal = (props) => {
  const modal = useSelector(({ modals }) => modals.generic)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setData(path(['body', 'data'], modal))
  }, [modal])

  return (
    <Modal id='show-wallet' width={432}>
      <Loading show={loading} />
      <div className='modal-container'>
        <h1 className='title-component'>Informações adicionais</h1>
        <div className='header'>
          <div className='content'>
            <div className='flex-content'>
              <p className='bold-text'>Nome:</p>
              <p>{path(['strNome'], data)} {path(['strSobrenome'], data)}</p>
            </div>
            <div className='flex-content'>
              <p className='bold-text'>Nascimento:</p>
              <p>{moment(path(['dtNascimento'], data)).format('DD/MM/YYYY')}</p>
            </div>
            <div className='flex-content'>
              <p className='bold-text'>Gênero:</p>
              <p>{path(['charGenero'], data) === 'f' ? 'Fêminino' : 'Masculino'}</p>
            </div>
          </div>
        </div>
        <div className='footer'>
          <div className='flex-content'>
            <p className='bold-text'>CPF:</p>
            <p>{path(['strCpf'], data)}</p>
          </div>
          <div className='flex-content'>
            <p className='bold-text'>Endereço:</p>
            <p>{path(['strEndereco'], data)}</p>
          </div>
          <div className='flex-content'>
            <p className='bold-text'>CEP:</p>
            <p>{path(['strCep'], data)}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ShowWalletModal
