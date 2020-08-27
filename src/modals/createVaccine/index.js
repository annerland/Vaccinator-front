import React, { useState } from 'react'
import Modal from 'Components/molecules/genericModal'
import Input from 'Components/atoms/input'
import Button from 'Components/atoms/button'
import { FormValidator, validator } from 'Util/validator'
import { useTranslation } from 'react-i18next'
import Api from 'Util/api'

import './index.scss'

const CreateVaccineModal = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [restricted, setRestricted] = useState('')
  const [dose, setDose] = useState('')
  const [interval, setInterval] = useState('')
  const [errors, setErrors] = useState('')
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
      field: 'dose',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('empty-dose')}`
    },
    {
      field: 'restricted',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('empty-rest')}`
    },
    {
      field: 'interval',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('empty-inter')}`
    }
  ])

  const submit = async () => {
    const validation = formValidator.validate({
      name,
      description,
      dose,
      restricted,
      interval
    })
    setErrors(validation)

    if (validation.isValid) {
      const payload = {}
      payload.strNome = name
      payload.strSobre = description
      payload.intQtdDoses = dose
      payload.strRestricoes = restricted
      payload.intDiasIntervaloDose = interval

      try {
        await Api.Vaccine.post(payload)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Modal id='create-vaccine' width={532}>
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
          type='number'
          label={t('doses')}
          onChange={setDose}
          value={dose}
          placeholder={t('placeholder-doses')}
          validator={errors.dose}
        />
        <Input
          type='number'
          label={t('interval')}
          onChange={setInterval}
          value={interval}
          placeholder={t('placeholder-interval')}
          validator={errors.interval}
        />

        <Button onClick={() => submit()}>{t('send')}</Button>
      </div>
    </Modal>
  )
}

export default CreateVaccineModal
