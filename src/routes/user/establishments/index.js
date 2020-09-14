import Select from 'Components/atoms/select'
import Search from 'Components/atoms/search'
import DropDown from 'Components/molecules/dropDown'
import React, { useState } from 'react'
import Api from 'Util/api'

import './index.scss'

export default function EstablishmentsUser () {
  const [establishments, setEstablishments] = useState([])

  const fetchEstablishments = async () => {
    console.log('test')
  }

  return (
    <div className='establishments-route'>
      <h1 className='title'>Estabelecimentos</h1>

      <div className='establishments-header'>
        <div className='search-container'>
          <Search placeholder='Pesquisar estabelecimento' />
        </div>
        <div className='search-container'>
          <Select placeholder='Filtrar por Distância' />
        </div>
        <div className='search-container'>
          <Select placeholder='Filtrar por Vacina' />
        </div>
        <p>Limpar filtros</p>
      </div>

      <DropDown />
    </div>
  )
}
