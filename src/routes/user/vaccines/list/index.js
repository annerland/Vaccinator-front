import React, { useState, useEffect } from 'react'
import Button from 'Components/atoms/button'
import Search from 'Components/atoms/search'
import ListItem from 'Components/atoms/listItem'
import CreateVaccineModal from 'Modals/createVaccine'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Loading from 'Components/atoms/loading'
import Modals from 'Util/modals'
import Api from 'Util/api'

import './index.scss'

export default function Vaccines () {
  const [vaccine, setVaccine] = useState([])
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('Vaccines')
  const history = useHistory()

  const fetchVaccine = async () => {
    setLoading(true)
    const res = await Api.Vaccine.list('pt')
    setVaccine(res.vacinas.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchVaccine()
  }, [])

  const redirect = (elm) => {
    history.push(`/user/vaccines/${elm.id}`)
  }

  const createVaccine = () => {
    Modals.Generic.show('create-vaccine')
  }

  const deleteVaccine = (elm) => {
    Modals.Generic.sucess({
      title: `${t('delete')}`,
      text: `${t('text')}`,
      cancel: `${t('cancel')}`,
      continue: `${t('continue')}`,
      handleAction: async () => {
        setLoading(true)
        try {
          await Api.Vaccine.delete(elm)
        } catch (err) {
          console.log(err)
        }
        fetchVaccine()
        setLoading(false)
      }
    })
  }

  return (
    <div className='vaccines-content'>
      <h1>{t('title')}</h1>

      <div className='vaccines-header'>
        <div className='search-container'>
          <Search
            placeholder={t('search')}
          />
        </div>
        <Button onClick={() => createVaccine()} type='primary'>{t('add')}</Button>
      </div>

      <Loading show={loading} />
      {vaccine.map(elm =>
        <ListItem
          key={elm.id}
          onClick={() => redirect(elm)}
          name={elm.strNome}
          description={elm.strSobre}
          delete={() => deleteVaccine(elm.id)}
        />
      )}
      <CreateVaccineModal onChange={fetchVaccine} />
    </div>
  )
}
