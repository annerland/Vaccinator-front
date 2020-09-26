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
import StoreRedux from 'Redux/'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { path } from 'ramda'

import './index.scss'

const AddVaccineWallet = (props) => {
  const [application, setApplication] = useState('')
  const [errors, setErrors] = useState('')
  const [schedule, setSchedule] = useState('')
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState({})
  const [data, setData] = useState()
  const [vaccine, setVaccine] = useState()
  const modal = useSelector(({ modals }) => modals.generic)
  const { t } = useTranslation('Wallets')
  const { auth } = StoreRedux.getState()

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
      payload.dtAgendamento = schedule
      payload.dtAplicacao = application
      payload.boolAtivo = 1
      moment(application).format('YYYY-MM-DD')
      console.log(application)

      try {
        setLoading(true)
        await Api.Wallet.post(payload)
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

  return (
    <Modal id='add-vaccine-wallet' width={432}>
      <Loading show={loading} />
      <div className='modal-container'>
        <h2 className='title'>{t('add-vaccine')}</h2>

        <p className='info'>{t('info')}</p>

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
        />

        <Input
          label={t('scheduling')}
          onChange={setSchedule}
          value={schedule}
          mask='99/99/9999'
          placeholder='Ex. 13/12/2020'
        />

        <Button onClick={() => submit()}>{t('send')}</Button>
      </div>
    </Modal>
  )
}

AddVaccineWallet.propTypes = {
  onChange: PropTypes.func
}

export default AddVaccineWallet
