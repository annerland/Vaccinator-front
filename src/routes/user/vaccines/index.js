import React, { useState, useEffect } from 'react'
import Button from 'Components/atoms/button'
import Search from 'Components/atoms/search'
import ListItem from 'Components/atoms/listItem'
import Api from 'Util/api'

import './index.scss'

export default function Vaccines () {
  const [vaccine, setVaccine] = useState([])

  const fetchVaccine = async () => {
    const res = await Api.Vaccine.list('en')
    setVaccine(res.vacinas)
    console.log(res)
  }

  console.log(vaccine)

  useEffect(() => {
    fetchVaccine()
  }, [])

  return (
    <div className='vaccines-content'>
      <h1>Vacinas</h1>

      <div className='vaccines-header'>
        <div className='search-container'>
          <Search
            placeholder='pesquisar vacinas'
          />
        </div>
        <Button type='primary'> Adicionar + </Button>
      </div>

      {vaccine.map(elm =>
        <ListItem
          key={elm.id}
          name={elm.strNome}
          description={elm.strSobre}
        />
      )}

    </div>
  )
}
