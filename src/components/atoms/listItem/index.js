import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import './index.scss'

const ListItem = (props) => {
  const { t } = useTranslation('ListItem')

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

      <i onClick={props.delete} className='icon-close' />
    </div>
  )
}

ListItem.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  description: PropTypes.string,
  delete: PropTypes.func
}

export default ListItem
