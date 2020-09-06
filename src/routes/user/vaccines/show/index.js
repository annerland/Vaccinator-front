import React, { useState, useEffect } from 'react'
import Api from 'Util/api'
import { useParams } from 'react-router-dom'
import Button from 'Components/atoms/button'
import Input from 'Components/atoms/input'
import Modals from 'Util/modals'
import { useTranslation } from 'react-i18next'

import './index.scss'

export default function ShowVaccine () {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [restricted, setRestricted] = useState('')
  const [dose, setDose] = useState('')
  const [interval, setInterval] = useState('')
  const [show, setShow] = useState(true)
  const params = useParams()
  const { t } = useTranslation('CreateVaccineModal')

  const fetchVaccine = async () => {
    const res = await Api.Vaccine.getOne(params.id)
    console.log(res.vacinas.strNome)
    setName(res.vacinas.strNome)
    setDescription(res.vacinas.strSobre)
    setRestricted(res.vacinas.strRestricoes)
    setDose(res.vacinas.intQtdDoses)
    setInterval(res.vacinas.intDiasIntervaloDose)
  }

  const submitEdit = () => {
    const payload = {}
    if (name) payload.strNome = name
    if (description) payload.strSobre = description
    if (dose) payload.intQtdDoses = dose
    if (restricted) payload.strRestricoes = restricted
    if (interval) payload.intDiasIntervaloDose = interval

    Modals.Generic.sucess({
      title: 'Editar Vacina',
      text: 'Os dados serão alterados, você tem certeza?',
      cancel: 'Cancelar',
      continue: 'Continuar',
      handleAction: async () => {
        try {
          await Api.Vaccine.update(payload, params.id)
        } catch (err) {
          console.log(err)
        }
        fetchVaccine()
      }
    })
  }

  useEffect(() => {
    fetchVaccine()
  }, [])

  return (
    <div className='vaccines-content'>
      <h1>{name}</h1>

      <div className='vaccines-header-show'>
        <Button onClick={() => setShow(false)} type='primary'>Editar</Button>
      </div>

      <div className='show-content'>
        <div className='grid-inputs'>
          <Input
            label={t('name')}
            onChange={setName}
            value={name}
            disabled={show}
          />

          <div className='description'>
            <Input
              label={t('description')}
              onChange={setDescription}
              value={description}
              disabled={show}
            />
          </div>
          <Input
            label={t('restricted')}
            onChange={setRestricted}
            value={restricted}
            disabled={show}
          />
          <Input
            type='number'
            label={t('doses')}
            onChange={setDose}
            value={dose}
            disabled={show}
          />
          <Input
            type='number'
            label={t('interval')}
            onChange={setInterval}
            value={interval}
            disabled={show}
          />
        </div>

        {!show &&
          <div className='button-show'>
            <Button className='button-show' onClick={() => submitEdit()}>Enviar</Button>
          </div>}
      </div>
    </div>
  )
}
