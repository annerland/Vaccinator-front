import React, { useState } from 'react'
import Modal from 'Components/molecules/genericModal'
import Input from 'Components/atoms/input'
import Button from 'Components/atoms/button'
import { FormValidator, validator } from 'Util/validator'
import { useTranslation } from 'react-i18next'
import Loading from 'Components/atoms/loading'
import Modals from 'Util/modals'
import Api from 'Util/api'
import PropTypes from 'prop-types'

import './index.scss'

const CreateVaccineModal = (props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [restricted, setRestricted] = useState('')
  const [indication, setIndication] = useState('')
  const [application, setApplication] = useState('')
  const [effects, setEffects] = useState('')
  const [care, setCare] = useState('')
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('CreateVaccineModal')

  const formValidator = new FormValidator([
    {
      field: 'name',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('empty-name')}`
    },
    {
      field: 'description',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('empty-desc')}`
    },
    {
      field: 'restricted',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('empty-rest')}`
    },
    {
      field: 'indication',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('empty-inter')}`
    },
    {
      field: 'application',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('empty-inter')}`
    },
    {
      field: 'effects',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('empty-inter')}`
    },
    {
      field: 'care',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('empty-inter')}`
    }
  ])

  const submit = async () => {
    const validation = formValidator.validate({
      name,
      description,
      restricted,
      indication,
      application,
      effects,
      care
    })
    setErrors(validation)

    if (validation.isValid) {
      const payload = {}
      payload.strNome = name
      payload.strSobre = description
      payload.strRestricoes = restricted
      payload.strIndicacao = indication
      payload.strViaAplicacao = application
      payload.strEfeitos = effects
      payload.strCuidados = care
      payload.intStatus = 2
      setLoading(true)
      try {
        await Api.Vaccine.post(payload)
        props.onChange()

        Modals.Generic.sucess({
          title: 'Criar vacina',
          text: 'Sua vacina foi criada com sucesso!',
          continue: 'OK',
          handleAction: () => Modals.Generic.hide()
        })
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
      setLoading(false)
    }
  }

  return (
    <Modal id='create-vaccine' height={400} width={532}>
      <Loading show={loading} />
      <div className='modal-container'>
        <h2 className='title'>{t('title')}</h2>

        <Input
          label={t('name')}
          onChange={setName}
          value={name}
          placeholder={t('placeholder-name')}
          validator={errors.name}
        />
        <Input
          label={t('description')}
          onChange={setDescription}
          value={description}
          placeholder={t('placeholder-desc')}
          validator={errors.description}
        />
        <Input
          label={t('restricted')}
          onChange={setRestricted}
          value={restricted}
          placeholder={t('placeholder-rest')}
          validator={errors.restricted}
        />

        <Input
          type='text'
          label='Indicações'
          onChange={setIndication}
          value={indication}
          placeholder='Ex. Pessoas acima de 60 anos'
          validator={errors.interval}
        />

        <Input
          type='text'
          label='Efeitos'
          onChange={setEffects}
          value={effects}
          placeholder='Ex. Enjoô'
          validator={errors.interval}
        />

        <Input
          type='text'
          label='Cuidados'
          onChange={setCare}
          value={care}
          placeholder='Ex. Não pegar peso pelas próximas 3 horas'
          validator={errors.interval}
        />

        <Input
          type='text'
          label='Via de aplicação'
          onChange={setApplication}
          value={application}
          placeholder='Ex. intramuscular'
          validator={errors.interval}
        />

        <Button onClick={() => submit()}>{t('send')}</Button>
      </div>
    </Modal>
  )
}

CreateVaccineModal.propTypes = {
  onChange: PropTypes.func
}

export default CreateVaccineModal
