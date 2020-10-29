import React, { useEffect, useState } from 'react'
import Modal from 'Components/molecules/genericModal'
import Input from 'Components/atoms/input'
import Select from 'Components/atoms/select'
import Button from 'Components/atoms/button'
import Checkbox from 'Components/atoms/checkbox'
import { FormValidator, validator } from 'Util/validator'
import { useTranslation } from 'react-i18next'
import Loading from 'Components/atoms/loading'
import Modals from 'Util/modals'
import Api from 'Util/api'
import PropTypes from 'prop-types'
import './index.scss'
import { useSelector } from 'react-redux'
import { path } from 'ramda'

const AddVaccineEstablishment = (props) => {
  const [application, setApplication] = useState('')
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState({})
  const [unity, setUnity] = useState()
  const [vaccine, setVaccine] = useState()
  const [hasVaccine, setHasVaccine] = useState(false)
  const [hasntVaccine, setHasntVaccine] = useState(false)

  const modal = useSelector(({ modals }) => modals.generic)
  const { t } = useTranslation('Establishments')

  const fetchVaccines = async () => { 
    const res = await Api.Vaccine.list(1)
    // eslint-disable-next-line prefer-const
    let array = res.vacinas.map(elm => {
      return { value: elm.id, label: elm.strNome }
    })

    setOptions(array)
  }

  const resetFields = () => {
    setVaccine('')
    setApplication('')
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
    setUnity(path(['body', 'unity', 'id'], modal))
    resetFields()
  }, [modal])

  const submit = async () => {
    const validation = formValidator.validate({ vaccine })

    setErrors(validation)

    if (validation.isValid) {
      const data = {}
      data.fkUnidade = unity
      data.fkVacina = vaccine.value
      if (application) data.dtAplicacao = application
      data.boolAtivo = '1'
      if (hasVaccine) data.boolStatus = '1'
      if (hasntVaccine) data.boolStatus = '0'

      try {
        setLoading(true)
        await Api.Establishment.addVaccine(data)
        props.onChange()
        resetFields()

        Modals.Generic.sucess({
          title: t('add-vaccine'),
          text: t('add-vaccine-text'),
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

  useEffect(() => {
    fetchVaccines()
  }, [])

  const handleHasVaccine = (value) => {
    setHasVaccine(value)
    setHasntVaccine(false)
  }

  const handleHasntVaccine = (value) => {
    setHasntVaccine(value)
    setHasVaccine(false)
  }

  return (
    <Modal id='add-vaccine-establishment' width={532}>
      <Loading show={loading} />
      <div className='modal-container'>
        <h2 className='title'>{t('add-vaccine')}</h2>

        <Select
          label={t('label-vaccine')}
          options={options}
          value={vaccine}
          onChange={setVaccine}
          validator={errors.vaccine}
        />

        <Input
          label={t('application')}
          onChange={setApplication}
          value={application}
          mask='99/99/9999'
          placeholder='Ex. 13/11/2020'
          validator={errors.application}
        />

        <p className='text'>Nesse estabelecimento há essa vaccina?</p>

        <div className='checkbox-container'>
          <Checkbox label='Sim' onChange={(e) => handleHasVaccine(e)} value={hasVaccine} />
          <Checkbox label='Não' onChange={(e) => handleHasntVaccine(e)} value={hasntVaccine} />
        </div>

        <Button onClick={() => submit()}>{t('send')}</Button>
      </div>
    </Modal>
  )
}

AddVaccineEstablishment.propTypes = {
  onChange: PropTypes.func
}

export default AddVaccineEstablishment
