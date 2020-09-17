import Select from 'Components/atoms/select'
import Search from 'Components/atoms/search'
import Button from 'Components/atoms/button'
import Input from 'Components/atoms/input'
import DropDown from 'Components/molecules/dropDown'
import React, { useState, useEffect } from 'react'
import Api from 'Util/api'

import './index.scss'

export default function EstablishmentsUser () {
  const [establishments, setEstablishments] = useState([])
  const [originalData, setOriginalData] = useState([])
  const [cep, setCep] = useState('')
  const [options, setOptions] = useState({})
  const [vaccine, setVaccine] = useState('')
  const [adress, setAdress] = useState('')
  const [milles, setMilles] = useState('')

  const fetchEstablishments = () => {
    Api.Establishment.list()
      .then((res) => {
        setEstablishments(res[0].data)
        setOriginalData(res[0].data)
      })
      .catch(err => console.log(err))
  }

  const fetchVaccines = async () => {
    const res = await Api.Vaccine.list()
    let array = res.vacinas.map(elm => {
      return { value: elm.id, label: elm.strNome }
    })

    setOptions(array)
  }

  const search = async () => {
    if (vaccine !== null) {
      setEstablishments(originalData.filter(elm => elm.id === vaccine.value))
    } else fetchEstablishments()
    const res = await Api.Establishment.getAll(cep, vaccine.value, milles, adress)
    setEstablishments(res)
  }

  useEffect(() => {
    fetchVaccines()
  }, [])

  useEffect(() => {
    fetchEstablishments()
  }, [])

  return (
    <div className='establishments-route'>
      <h1 className='title'>Estabelecimentos</h1>

      <div className='establishments-header'>
        <div className='search-container'>
          <Input
            value={cep}
            onChange={setCep}
            label='Digite seu CEP'
            placeholder='00000-000'
          />
        </div>

        <div className='search-container'>
          <Input
            value={adress}
            onChange={setAdress}
            label='Digite seu Endereço'
            placeholder='Rua toledo malta, 25'
          />
        </div>

        <div className='search-container'>
          <Input
            label='Digite a distância'
            placeholder='5km'
            onChange={setMilles}
            value={milles}
          />
        </div>
        <div className='search-container'>
          <Select
            options={options}
            value={vaccine}
            onChange={setVaccine}
            label='Escolha a vacina'
            placeholder='Escolher vacinas'
          />
        </div>

        <div className='button-container'>
          <Button onClick={() => search()}>Enviar</Button>
        </div>
      </div>

      {establishments.map(elm => {
        return (
          <DropDown
            key={elm.id}
            name={elm.strNomeUnidade}
            adress={elm.strEndereco}
            cep={elm.strCep}
            district={elm.strBairro}
          />)
      })}
    </div>
  )
}
