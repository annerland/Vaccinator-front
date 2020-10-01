import React, { useState, useEffect } from 'react'
import Button from 'Components/atoms/button'
import Input from 'Components/atoms/input'
import Modal from 'Components/molecules/genericModal'
import Modals from 'Util/modals'
import Api from 'Util/api'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Loading from 'Components/atoms/loading'
import { useSelector } from 'react-redux'
import Select from 'Components/atoms/select'
import { path } from 'ramda'

const EditWalletModal = (props) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [gender, setGender] = useState('')
  const [date, setDate] = useState('')
  const [cpf, setCpf] = useState('')
  const [loading, setLoading] = useState(false)
  const [adress, setAdress] = useState('')
  const [cep, setCep] = useState('')
  const [data, setData] = useState()
  const { t } = useTranslation('Wallets')
  const modal = useSelector(({ modals }) => modals.generic)

  const options = [
    { value: 'f', label: 'F' },
    { value: 'm', label: 'M' }
  ]

  useEffect(() => {
    const data = path(['body', 'data'], modal)
    setData(data)
    if (data) {
      setName(data.strNome)
      setSurname(data.strSobrenome)
      setGender(data.charGenero)
      setDate(data.dtNascimento)
      setCpf(data.strCpf)
      setAdress(data.strEndereco)
      setCep(data.strCep)
    }
  }, [modal])

  const submit = () => {
    const payload = {}
    if (name) payload.strNome = name
    if (surname) payload.strSobrenome = surname
    if (gender) payload.charGenero = gender.value
    if (date) payload.dtNascimento = date
    if (cpf) payload.strCpf = cpf
    if (adress) payload.strEndereco = adress
    if (cep) payload.strCep = cep
    payload.boolAtivo = 1

    try {
      Modals.Generic.sucess({
        title: t('edit-wallet'),
        text: t('edit-wallet-text'),
        cancel: t('cancel'),
        continue: t('continue'),
        handleAction: async () => {
          setLoading(true)
          await Api.Persona.update(payload, data.id)
          setLoading(false)
          props.onChange()
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal id='edit-wallet' height={400} width={532}>
      <Loading show={loading} />
      <div className='modal-container'>
        <h2 className='title'>{t('edit-wallet')}</h2>

        <Input
          label={t('name')}
          onChange={setName}
          value={name}
        />
        <Input
          label={t('surname')}
          onChange={setSurname}
          value={surname}
        />
        <Select
          label={t('gender')}
          onChange={setGender}
          value={gender}
          options={options}
        />
        <Input
          label={t('birthday')}
          onChange={setDate}
          mask='99/99/9999'
          value={date}
        />
        <Input
          label={t('cpf')}
          onChange={setCpf}
          value={cpf}
          mask='999.999.999-99'
        />

        <Input
          label={t('address')}
          onChange={setAdress}
          value={adress}
        />

        <Input
          label={t('cep')}
          onChange={setCep}
          value={cep}
          mask='99999-999'
        />
        <Button onClick={() => submit()}>{t('send')}</Button>
      </div>
    </Modal>
  )
}

EditWalletModal.propTypes = {
  onChange: PropTypes.func
}

export default EditWalletModal
