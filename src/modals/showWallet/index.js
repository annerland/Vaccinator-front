import React, { useState, useEffect } from 'react'
import Modal from 'Components/molecules/genericModal'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { path } from 'ramda'
import moment from 'moment'

import './index.scss'

const ShowWalletModal = () => {
  const modal = useSelector(({ modals }) => modals.generic)
  const [data, setData] = useState([])
  const { t } = useTranslation('Wallets')

  useEffect(() => {
    setData(path(['body', 'data'], modal))
  }, [modal])

  return (
    <Modal id='show-wallet' width={432}>
      <div className='modal-container'>
        <h1 className='title-component'>{t('infos')}</h1>
        <div className='header'>
          <div className='content'>
            <div className='flex-content'>
              <p className='bold-text'>{t('name')}:</p>
              <p>{path(['strNome'], data)} {path(['strSobrenome'], data)}</p>
            </div>
            <div className='flex-content'>
              <p className='bold-text'>{t('birthday')}:</p>
              <p>{moment(path(['dtNascimento'], data)).format('DD/MM/YYYY')}</p>
            </div>
            <div className='flex-content'>
              <p className='bold-text'>{t('gender')}:</p>
              <p>{path(['charGenero'], data) === 'f' ? t('female') : t('male')}</p>
            </div>
          </div>
        </div>
        <div className='footer'>
          <div className='flex-content'>
            <p className='bold-text'>{t('cpf')}:</p>
            <p>{path(['strCpf'], data)}</p>
          </div>
          <div className='flex-content'>
            <p className='bold-text'>{t('address')}:</p>
            <p>{path(['strEndereco'], data)}</p>
          </div>
          <div className='flex-content'>
            <p className='bold-text'>{t('cep')}:</p>
            <p>{path(['strCep'], data)}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ShowWalletModal
