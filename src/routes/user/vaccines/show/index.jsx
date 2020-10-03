import React, { useState, useEffect } from 'react'
import Api from 'Util/api'
import { useParams } from 'react-router-dom'
import Button from 'Components/atoms/button'
import Loading from 'Components/atoms/loading'
import Modals from 'Util/modals'
import EditVaccineModal from 'Modals/editVaccine'
import { useTranslation } from 'react-i18next'
import StoreRedux from 'Redux/'

import './index.scss'

export default function ShowVaccine () {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [restricted, setRestricted] = useState('')
  const [dose, setDose] = useState('')
  const [interval, setInterval] = useState('')
  const params = useParams()
  const [indication, setIndication] = useState('')
  const [application, setApplication] = useState('')
  const [loading, setLoading] = useState(false)
  const [effects, setEffects] = useState('')
  const [care, setCare] = useState('')
  const { auth } = StoreRedux.getState()
  const admin = auth.intNivel === 2

  const { t } = useTranslation('CreateVaccineModal')

  const fetchVaccine = async () => {
    setLoading(true)
    const res = await Api.Vaccine.getOne(params.id)
    setName(res.vacinas.strNome)
    setDescription(res.vacinas.strSobre)
    setRestricted(res.vacinas.strRestricoes)
    setDose(res.vacinas.intQtdDoses)
    setInterval(res.vacinas.intDiasIntervaloDose)
    setIndication(res.vacinas.strIndicacao)
    setApplication(res.vacinas.strViaAplicacao)
    setEffects(res.vacinas.strEfeitos)
    setCare(res.vacinas.strCuidados)
    setLoading(false)
  }

  useEffect(() => {
    fetchVaccine()
  }, [])

  const editVaccine = () => {
    Modals.Generic.show('edit-vaccine')
  }

  return (
    <div className='vaccines-content'>
      <Loading show={loading} />
      <h1 className='title'>{name}</h1>

      <div className='vaccines-header-show'>
        {admin && <Button onClick={() => editVaccine()} type='primary'>Editar</Button>}
      </div>

      <div className='show-content'>
        <div className='content'>
          <h1>Descrição</h1>
          <p>{description}</p>
        </div>

        <div className='content'>
          <h1>Restrições</h1>
          <p>{restricted}</p>
        </div>

        <div className='content'>
          <h1>Quantidade de doses</h1>
          <p>{dose}</p>
        </div>

        <div className='content'>
          <h1>Intervalos entre doses</h1>
          <p>{interval}</p>
        </div>

        <div className='content'>
          <h1>Indicações</h1>
          <p>{indication}</p>
        </div>

        <div className='content'>
          <h1>Via de aplicação</h1>
          <p>{application}</p>
        </div>

        <div className='content'>
          <h1>Efeitos</h1>
          <p>{effects}</p>
        </div>

        <div className='content'>
          <h1>Cuidados</h1>
          <p>{care}</p>
        </div>
      </div>
      <EditVaccineModal onChange={fetchVaccine} />
    </div>
  )
}
