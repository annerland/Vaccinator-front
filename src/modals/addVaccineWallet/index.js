import React, { useEffect, useState, useCallback } from 'react'
import Modal from 'Components/molecules/genericModal'
import Input from 'Components/atoms/input'
import Select from 'Components/atoms/select'
import Button from 'Components/atoms/button'
import { FormValidator, validator } from 'Util/validator'
import { useTranslation } from 'react-i18next'
import Loading from 'Components/atoms/loading'
import Modals from 'Util/modals'
import Api from 'Util/api'
import StoreRedux from 'Redux/'
import Checkbox from 'Components/atoms/checkbox'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { path } from 'ramda'

import './index.scss'

const generateId = () => `${Math.random().toString(36).substr(2, 9)}`

const AddVaccineWallet = (props) => {
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState({})
  const [dataOptions, setDataOptions] = useState({})
  const [application, setApplication] = useState('')
  const [inputs, setInputs] = useState(null)
  const [data, setData] = useState('')
  const [add, setAdd] = useState(false)
  const [sched, setSched] = useState(false)
  const [vaccine, setVaccine] = useState()
  const [establishment, setEstablishment] = useState()
  const modal = useSelector(({ modals }) => modals.generic)
  const { auth } = StoreRedux.getState()
  const { t } = useTranslation('Wallets')

  const fetchVaccines = async () => {
    const res = await Api.Vaccine.list(1)
    // eslint-disable-next-line prefer-const
    let array = res.vacinas.map(elm => {
      return { value: elm.id, label: elm.strNome }
    })

    setDataOptions(array)
  }

  const fetchEstablishments = async () => {
    const res = await Api.Establishment.list()
    // eslint-disable-next-line prefer-const
    let array = res.establishments.map(elm => {
      return { value: elm.id, label: elm.strNomeUnidade }
    })

    setOptions(array)
  }

  const onChangeInput = useCallback(({ id, value }) => {
    const newInput = { id, value }
    const filteredInputs = inputs.filter(elm => elm.id !== id)
    const newInputs = [...filteredInputs, newInput]
    setInputs(newInputs)
  }, [inputs])

  const createNewInput = useCallback(() => {
    const newInput = { id: generateId(), value: '' }
    const newInputs = [...(inputs || []), newInput]
    setInputs(newInputs)
  }, [inputs])

  useEffect(() => {
    if (!inputs) createNewInput()
  }, [inputs, createNewInput])

  const resetFields = () => {
    setVaccine('')
    setAdd('')
    setSched('')
    setEstablishment('')
    setApplication('')
    setInputs('')
  }

  const formValidator = new FormValidator([
    {
      field: 'vaccine',
      method: validator.isEmpty,
      validWhen: false,
      message: t('vaccine-invalid')
    }
  ])

  useEffect(() => {
    setData(path(['body', 'data'], modal))
    resetFields()
  }, [modal])

  const submit = async () => {
    const validation = formValidator.validate({ vaccine })
    setErrors(validation)

    if (validation.isValid) {
      const payload = {}
      payload.fkPessoa = path(['id'], data)
      payload.fkVacina = vaccine.value
      payload.fkUser = auth.id
      payload.fkUnidade = establishment.value
      payload.boolAtivo = 1
      if (inputs) payload.doses = inputs.map(elm => elm.value)
      if (application) payload.dtAplicacao = application

      try {
        Modals.Generic.sucess({
          title: t('add-vaccine'),
          text: t('add-vaccine-text'),
          continue: 'OK',
          handleAction: () => Modals.Generic.hide()
        })

        setLoading(true)
        await Api.Wallet.post(payload)
        props.onChange()
        resetFields()
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEstablishments()
    fetchVaccines()
  }, [])

  const handleAddVaccine = (value) => {
    resetFields()
    setAdd(value)
    setSched(false)
  }

  const handleScheduleVaccine = (value) => {
    resetFields()
    setAdd(false)
    setSched(value)
  }

  return (
    <Modal id='add-vaccine-wallet' height={400} width={432}>
      <Loading show={loading} />
      <div className='modal-container'>
        <h2 className='title'>{t('add-vaccine')}</h2>

        <div className='information'>
          <p>{t('info-vaccine')}</p>
          <div className='flex-button'>
            <Checkbox label={t('add')} value={add} onChange={(e) => handleAddVaccine(e)} />
            <Checkbox label={t('schedule')} value={sched} onChange={(e) => handleScheduleVaccine(e)} type='secondary' />
          </div>
        </div>

        {(add || sched) &&
          <Select
            label={t('label-vaccine')}
            options={dataOptions}
            value={vaccine}
            onChange={setVaccine}
            validator={errors.vaccine}
          />}

        {add &&
          <Select
            label={t('establishments')}
            options={options}
            value={establishment}
            onChange={setEstablishment}
            validator={errors.vaccine}
          />}

        {add &&
          <Input
            label={t('application')}
            onChange={setApplication}
            value={application}
            mask='99/99/9999'
            placeholder='Ex. 13/11/2020'
          />}

        {sched &&
          <div className='doses-content'>
            <i onClick={() => createNewInput()} className='icon-plus-circle' />
            {inputs && inputs.length && inputs.map(({ id, value }) => {
              return (
                <div className='input-content' key={id}>
                  <Input
                    placeholder='Ex. 13/11/2020'
                    mask='99/99/9999'
                    value={value}
                    onChange={(e) => onChangeInput({ id, value: e })}
                    label={t('dose-date')}
                  />
                </div>
              )
            })}
          </div>}

        {(add || sched) && <Button onClick={() => submit()}>{t('send')}</Button>}
      </div>
    </Modal>
  )
}

AddVaccineWallet.propTypes = {
  onChange: PropTypes.func
}

export default AddVaccineWallet
