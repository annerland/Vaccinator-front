import React, { useState, useEffect } from 'react'
import Modal from 'Components/molecules/genericModal'
import Input from 'Components/atoms/input'
import Button from 'Components/atoms/button'
import { FormValidator, validator } from 'Util/validator'
import { useTranslation } from 'react-i18next'
import Loading from 'Components/atoms/loading'
import Modals from 'Util/modals'
import { useParams } from 'react-router-dom'
import Api from 'Util/api'
import PropTypes from 'prop-types'

const EditVaccineModal = (props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [restricted, setRestricted] = useState('')
  const [dose, setDose] = useState('')
  const [interval, setInterval] = useState('')
  const [indication, setIndication] = useState('')
  const [application, setApplication] = useState('')
  const [effects, setEffects] = useState('')
  const [care, setCare] = useState('')
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { t } = useTranslation('CreateVaccineModal')

  const fetchVaccine = async () => {
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
  }

  useEffect(() => {
    fetchVaccine()
  }, [])

  const submit = () => {
    const payload = {}
    if (name) payload.strNome = name
    if (description) payload.strSobre = description
    if (dose) payload.intQtdDoses = dose
    if (restricted) payload.strRestricoes = restricted
    if (interval) payload.intDiasIntervaloDose = interval
    if (indication) payload.strIndicacao = indication
    if (application) payload.strViaAplicacao = application
    if (effects) payload.strEfeitos = effects
    if (care) payload.strCuidados = care

    Modals.Generic.sucess({
      title: 'Editar Vacina',
      text: 'Os dados serão alterados, você tem certeza?',
      cancel: 'Cancelar',
      continue: 'Continuar',
      handleAction: async () => {
        try {
          setLoading(true)
          await Api.Vaccine.update(payload, params.id)
          setLoading(false)
        } catch (err) {
          console.log(err)
        }
        props.onChange()
      }
    })
  }

  return (
    <Modal id='edit-vaccine' height={400} width={532}>
      <div className='modal-container'>
        <Loading show={loading} />
        <h2 className='title'>{t('title')}</h2>

        <Input
          label={t('name')}
          onChange={setName}
          value={name}
          placeholder={t('placeholder-name')}
        />
        <Input
          label={t('description')}
          onChange={setDescription}
          value={description}
          placeholder={t('placeholder-desc')}
        />
        <Input
          label={t('restricted')}
          onChange={setRestricted}
          value={restricted}
          placeholder={t('placeholder-rest')}
        />
        <Input
          type='number'
          label={t('doses')}
          onChange={setDose}
          value={dose}
          placeholder={t('placeholder-doses')}
        />
        <Input
          type='number'
          label={t('interval')}
          onChange={setInterval}
          value={interval}
          placeholder={t('placeholder-interval')}
        />

        <Input
          type='text'
          label='Indicações'
          onChange={setIndication}
          value={indication}
        />

        <Input
          type='text'
          label='Efeitos'
          onChange={setEffects}
          value={effects}
        />

        <Input
          type='text'
          label='Cuidados'
          onChange={setCare}
          value={care}
        />

        <Input
          type='text'
          label='Via de aplicação'
          onChange={setApplication}
          value={application}
        />

        <Button onClick={() => submit()}>{t('send')}</Button>
      </div>
    </Modal>
  )
}

EditVaccineModal.propTypes = {
  onChange: PropTypes.func
}

export default EditVaccineModal
