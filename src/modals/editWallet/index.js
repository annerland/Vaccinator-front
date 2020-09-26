import React, { useState, useEffect } from 'react'
import Button from 'Components/atoms/button'
import Input from 'Components/atoms/input'
import Modal from 'Components/molecules/genericModal'
import Modals from 'Util/modals'
import Api from 'Util/api'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import Loading from 'Components/atoms/loading'
import { useSelector } from 'react-redux'
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

  useEffect(() => {
    setData(path(['body', 'data'], modal))
  }, [modal])

  // const fetchPerson = () => {
  //   Api.Persona.getOne(path(['id'], data))
  //     .then((res) => {
  //       setName(res.pessoas.strNome)
  //       setSurname(res.pessoas.strSobrenome)
  //       setGender(res.pessoas.charGenero)
  //       setDate(res.pessoas.dtNascimento)
  //       setCpf(res.pessoas.strCpf)
  //       setAdress(res.pessoas.strEndereco)
  //       setCep(res.pessoas.strCep)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  // useEffect(() => {
  //   fetchPerson()
  // }, [])

  const submit = () => {
    const payload = {}
    if (name) payload.strNome = name
    if (surname) payload.strSobrenome = surname
    if (gender) payload.charGenero = gender
    if (date) payload.dtNascimento = date
    if (cpf) payload.strCpf = cpf
    if (adress) payload.strEndereco = adress
    if (cep) payload.strCep = cep
    payload.boolAtivo = 1
    moment(date).format('YYYY-MM-DD')

    setLoading(true)
    try {
      Modals.Generic.sucess({
        title: t('edit-vaccine'),
        text: t('edit-vaccine-text'),
        cancel: t('cancel'),
        continue: t('continue'),
        handleAction: async () => {
          await Api.Persona.update(payload, path(['id'], data))
          props.onChange()
        }
      })
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
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
        <Input
          label={t('gender')}
          onChange={setGender}
          value={gender}
        />
        <Input
          label={t('birthday')}
          onChange={setDate}
          value={date}
        />
        <Input
          label={t('cpf')}
          onChange={setCpf}
          value={cpf}
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
