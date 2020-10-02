import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import StoreRedux from 'Redux/'

import './index.scss'

const ListItem = (props) => {
  const { t } = useTranslation('ListItem')
  const { auth } = StoreRedux.getState()
  const admin = auth.intNivel === 2

  return (
    <div className='list-item'>
      <div onClick={props.onClick} className='flex-text-name'>
        <i className='icon-vaccines' />
        <p className='field'>{t('name')}:</p>
        <p className='field-name'>{props.name}</p>
      </div>

      <div onClick={props.onClick} className='flex-text'>
        <p className='field'>{t('description')}:</p>
        <p>{props.description}</p>
      </div>

      {admin && props.active && <i onClick={props.active} className='icon-check' />}
      {admin && <i onClick={props.delete} className='icon-close' />}
    </div>
  )
}

ListItem.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  description: PropTypes.string,
  delete: PropTypes.func,
  active: PropTypes.func
}

export default ListItem
