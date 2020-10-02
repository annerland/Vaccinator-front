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

const CreateEstablishModal = (props) => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [district, setDistrict] = useState('')
  const [cep, setCep] = useState('')
  const [loading, setLoading] = useState(false)
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
      field: 'address',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('empty-name')}`
    },
    {
      field: 'district',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('empty-name')}`
    },
    {
      field: 'cep',
      method: validator.isEmpty,
      validWhen: false,
      message: `${t('empty-name')}`
    }
  ])

  const submit = async () => {
    const validation = formValidator.validate({
      name,
      address,
      district,
      cep
    })
    setErrors(validation)

    if (validation.isValid) {
      const payload = {}
      payload.strNomeUnidade = name
      payload.strEndereco = address
      payload.strBairro = district
      payload.strCep = cep
      payload.boolAtivo = 1
      setLoading(true)
      try {
        await Api.Establishment.create(payload)
        props.onChange()

        Modals.Generic.sucess({
          title: 'Criar Estabelecimento',
          text: 'Seu estabelecimento foi criado com sucesso!',
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
          onChange={setAddress}
          value={address}
          placeholder={t('placeholder-desc')}
          validator={errors.address}
        />
        <Input
          label={t('restricted')}
          onChange={setDistrict}
          value={district}
          placeholder={t('placeholder-rest')}
          validator={errors.district}
        />
        <Input
          type='number'
          label={t('doses')}
          onChange={setCep}
          value={cep}
          placeholder={t('placeholder-doses')}
          validator={errors.cep}
        />

        <Button onClick={() => submit()}>{t('send')}</Button>
      </div>
    </Modal>
  )
}

CreateEstablishModal.propTypes = {
  onChange: PropTypes.func
}

export default CreateEstablishModal
