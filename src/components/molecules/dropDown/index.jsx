import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import './index.scss'

const DropDown = (props) => {
  const [show, setShow] = useState(false)
  const { t } = useTranslation('Establishments')

  const showInfo = () => {
    show ? setShow(false) : setShow(true)
  }

  const animation = () => {
    if (show) {
      return { y: -9, scale: 1 }
    } else {
      return { x: 0, scale: 0 }
    }
  }

  const text = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={text}
      className='drop-down'
    >
      <div className='list-drop'>
        <div className='flex-text-name'>
          <i className='icon-hospital' />
          <p className='field'>{t('name')}:</p>
          <p className='field-name'>{props.name}</p>
        </div>

        <div className='flex-text'>
          <p className='field'>{t('address')}:</p>
          <p>{props.adress}</p>
        </div>

        <i onClick={() => showInfo()} className={show ? 'icon-arrow-up' : 'icon-arrow-down'} />
      </div>

      {show &&
        <motion.div animate={animation()} className='info'>
          <p className='title'>{t('info')}</p>

          <div className='flex-text'>
            <p className='field'>{t('vaccines')}:</p>
            <p>{props.vaccine}</p>
          </div>

          <div className='flex-text'>
            <p className='field'>{t('district')}:</p>
            <p>{props.district}</p>
          </div>

          <div className='flex-text'>
            <p className='field'>{t('cep')}:</p>
            <p>{props.cep}</p>
          </div>

          <p className='information'>{t('info-text')} <span onClick={props.onClick}>{t('here')}</span></p>
        </motion.div>}
    </motion.div>
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
