import React, { useEffect, useState } from 'react'
import Modal from 'Components/molecules/genericModal'
import Input from 'Components/atoms/input'
import Select from 'Components/atoms/select'
import Button from 'Components/atoms/button'
import { FormValidator, validator } from 'Util/validator'
import { useTranslation } from 'react-i18next'
import Loading from 'Components/atoms/loading'
import Modals from 'Util/modals'
import Api from 'Util/api'
import PropTypes from 'prop-types'
import moment from 'moment'

import { useSelector } from 'react-redux'
import { path } from 'ramda'

const AddVaccineEstablishment = (props) => {
  const [application, setApplication] = useState('')
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState({})
  const [unity, setUnity] = useState()
  const [vaccine, setVaccine] = useState()
  const modal = useSelector(({ modals }) => modals.generic)
  const { t } = useTranslation('Establishments')

  const fetchVaccines = async () => {
    const res = await Api.Vaccine.list()
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
      field: 'application',
      method: validator.isEmpty,
      validWhen: false,
      message: t('application-invalid')
    },
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
    const validation = formValidator.validate({ application, vaccine })
    setErrors(validation)

    if (validation.isValid) {
      const data = {}
      data.fkUnidade = unity
      data.fkVacina = vaccine.value
      data.dtAplicacao = application
      data.boolStatus = '1'
      data.boolAtivo = '1'
      moment(application).format('YYYY-MM-DD')
      console.log(application)

      try {
        await Api.Establishment.addVaccine(data)
        props.onChange()
        setLoading(true)
        resetFields()

        Modals.Generic.sucess({
          title: t('add-vaccine'),
          text: t('info-text'),
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
        />

        <Input
          label={t('application')}
          onChange={setApplication}
          value={application}
          placeholder='Ex. 13/11/2020'
          validator={errors.application}
        />

        <Button onClick={() => submit()}>{t('send')}</Button>
      </div>
    </Modal>
  )
}

AddVaccineEstablishment.propTypes = {
  onChange: PropTypes.func
}

export default AddVaccineEstablishment
