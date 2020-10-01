import React from 'react'
import Select from 'Components/atoms/select'

import './index.scss'

export default function ConfigUser () {
  const options = [
    { value: 'pt', label: 'Português' },
    { value: 'en', label: 'Inglês' }
  ]

  return (
    <div className='config-route'>
      <h1 className='title'>Configurações</h1>

      <div className='config-content'>
        <p>Termos de uso</p>
        <p>Politica de privacidade</p>
        <Select options={options} label='Selecione o idioma' />
      </div>
    </div>
  )
}
