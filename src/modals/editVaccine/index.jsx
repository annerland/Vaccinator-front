import React, { useState, useEffect } from 'react'
import Modal from 'Components/molecules/genericModal'
import Input from 'Components/atoms/input'
import Button from 'Components/atoms/button'
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
    if (restricted) payload.strRestricoes = restricted
    if (indication) payload.strIndicacao = indication
    if (application) payload.strViaAplicacao = application
    if (effects) payload.strEfeitos = effects
    if (care) payload.strCuidados = care

    Modals.Generic.sucess({
      title: t('edit-vaccine'),
      text: t('edit-vaccine-text'),
      cancel: t('cancel'),
      continue: t('continue'),
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
        />
        <Input
          label={t('description')}
          onChange={setDescription}
          value={description}
        />
        <Input
          label={t('restricted')}
          onChange={setRestricted}
          value={restricted}
        />
        <Input
          type='text'
          label={t('indications')}
          onChange={setIndication}
          value={indication}
        />

        <Input
          type='text'
          label={t('effects')}
          onChange={setEffects}
          value={effects}
        />

        <Input
          type='text'
          label={t('care')}
          onChange={setCare}
          value={care}
        />

        <Input
          type='text'
          label={t('application')}
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
