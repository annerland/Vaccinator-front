import Select from 'Components/atoms/select'
import Button from 'Components/atoms/button'
import Input from 'Components/atoms/input'
import DropDown from 'Components/molecules/dropDown'
import AddVaccineEstablishment from 'Modals/addVaccineEstablishment'
import Modals from 'Util/modals'
import pagination from 'Util/hooks/pagination'
import PaginationComponent from 'Components/atoms/paginationComponent'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Loading from 'Components/atoms/loading'
import Api from 'Util/api'

import './index.scss'

export default function EstablishmentsUser () {
  const [cep, setCep] = useState('')
  const [options, setOptions] = useState({})
  const [vaccine, setVaccine] = useState()
  const [adress, setAdress] = useState('')
  const { t } = useTranslation('Establishments')
  const [loading, setLoading] = useState(false)
  const [milles, setMilles] = useState('')
  const [
    page,
    pages,
    list,
    setPage,
    setContent
  ] = pagination(5)

  const fetchEstablishments = () => {
    setLoading(true)
    Api.Establishment.list()
      .then((res) => {
        setContent(reorder(res.establishments))
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  const reorder = (data = []) => {
    const safeLow = (str = '') => {
      if (str === null) return ''
      return str.toLowerCase()
    }

    return data.sort((a, b) => {
      if (safeLow(a.strNome) < safeLow(b.strNome)) return -1
      if (safeLow(a.strNome) > safeLow(b.strNome)) return 1
      return 0
    })
  }

  const fetchVaccines = async () => {
    const res = await Api.Vaccine.list()
    // eslint-disable-next-line prefer-const
    let array = res.vacinas.map(elm => {
      return { value: elm.id, label: elm.strNome }
    })

    setOptions(array)
  }

  const addVaccine = (elm) => {
    Modals.Generic.show('add-vaccine-establishment', { unity: elm })
  }

  const search = async () => {
    const res = await Api.Establishment.getAll(cep, vaccine.value, milles, adress)
    setContent(res)
  }

  useEffect(() => {
    fetchVaccines()
  }, [])

  useEffect(() => {
    fetchEstablishments()
  }, [])

  const cleanFilters = () => {
    setVaccine('')
    setAdress('')
    setMilles('')
    setCep('')
    fetchEstablishments()
  }

  return (
    <div className='establishments-route'>
      <h1 className='title'>{t('title')}</h1>
      <p className='description'>{t('description')}:</p>
      <div className='establishments-header'>
        <div className='search-container'>
          <Input
            value={cep}
            onChange={setCep}
            label={t('label-cep')}
            placeholder='Ex. 00000-000'
          />
        </div>

        <div className='search-container'>
          <Input
            value={adress}
            onChange={setAdress}
            label={t('label-address')}
            placeholder='Ex. Rua toledo malta, 25'
          />
        </div>

        <div className='search-container'>
          <Input
            label={t('label-distance')}
            placeholder='Ex. 5'
            onChange={setMilles}
            value={milles}
          />
        </div>
        <div className='search-container'>
          <Select
            options={options}
            value={vaccine}
            onChange={setVaccine}
            label={t('label-vaccine')}
          />
        </div>

        <div className='button-container'>
          <Button onClick={() => search()}>{t('send')}</Button>
          <p onClick={() => cleanFilters()}>Limpar filtros</p>
        </div>
      </div>
      <Loading show={loading} />
      {list.map(elm => {
        return (
          <DropDown
            key={elm.id}
            name={elm.strNomeUnidade}
            adress={elm.strEndereco}
            cep={elm.strCep}
            vaccine={(elm.vacinas || []).map(elm => elm.strNome).join(', ') || <i>Sem informação</i>}
            onClick={() => addVaccine(elm)}
            district={elm.strBairro}
          />)
      })}
      <PaginationComponent
        total={pages}
        current={page}
        onChange={setPage}
      />
      <AddVaccineEstablishment onChange={fetchEstablishments} />
    </div>
  )
}
