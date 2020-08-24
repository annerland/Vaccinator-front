import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const ListItem = (props) => {
  return (
    <div className='list-item'>
      <div onClick={props.onClick} className='flex-text-name'>
        <i className='icon-vaccines' />
        <p className='field'>Nome:</p>
        <p className='field-name'>{props.name}</p>
      </div>

      <div onClick={props.onClick} className='flex-text'>
        <p className='field'>Descrição:</p>
        <p>{props.description}</p>
      </div>

      <i className='icon-close' />
    </div>
  )
}

ListItem.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  description: PropTypes.string
}

export default ListItem
