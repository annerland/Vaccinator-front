import React, { useState, useEffect } from 'react'
import Button from 'Components/atoms/button'
import Search from 'Components/atoms/search'
import ListItem from 'Components/atoms/listItem'
import CreateVaccineModal from 'Modals/createVaccine'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Modals from 'Util/modals'
import Api from 'Util/api'

import './index.scss'

export default function Vaccines () {
  const [vaccine, setVaccine] = useState([])
  const { t } = useTranslation('Vaccines')
  const history = useHistory()

  const fetchVaccine = async () => {
    const res = await Api.Vaccine.list('pt')
    setVaccine(res.vacinas.data)
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

  const deleteVaccine = () => {
    Modals.Generic.sucess({
      title: `${t('delete')}`,
      text: `${t('text')}`,
      cancel: `${t('cancel')}`,
      continue: `${t('continue')}`,
      handleAction: async () => {
        try {
          await Api.Vaccine.delete(vaccine[0].id)
        } catch (err) {
          console.log(err)
        }
        fetchVaccine()
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

      {vaccine.map(elm =>
        <ListItem
          key={elm.id}
          onClick={() => redirect(elm)}
          name={elm.strNome}
          description={elm.strSobre}
          delete={() => deleteVaccine()}
        />
      )}
      <CreateVaccineModal />
    </div>
  )
}
