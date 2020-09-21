import React, { useState, useEffect } from 'react'
import Button from 'Components/atoms/button'
import Input from 'Components/atoms/input'
import { FormValidator, validator } from 'Util/validator'
import Modal from 'Components/molecules/genericModal'
import Modals from 'Util/modals'
import Api from 'Util/api'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { cpfMask } from 'Util/helpers'

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
  const modal = useSelector(({ modals }) => modals.generic)

  // const fetchPerson = async () => {
  //   const res = await Api.Persona.getOne(path(['id', data]))
  //   setName(res.pessoas.strNome)
  //   setSurname(res.pessoas.strSobrenome)
  //   setGender(res.pessoas.charGenero)
  //   setDate(res.pessoas.dtNascimento)
  //   setCpf(res.pessoas.strCpf)
  //   setAdress(res.pessoas.strEndereco)
  //   setCep(res.pessoas.strCep)
  // }

  // useEffect(() => {
  //   fetchPerson()
  // }, [])

  useEffect(() => {
    setData(path(['body', 'data'], modal))
  }, [modal])

  const submit = async () => {
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
      await Api.Persona.update(payload, path(['id'], data))
      props.onChange()

      Modals.Generic.sucess({
        title: 'Criar Carteira',
        text: 'Sua Carteira foi editada com sucesso!',
        continue: 'OK',
        handleAction: () => Modals.Generic.hide()
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
        <h2 className='title'>Editar Carteira</h2>

        <Input
          label='Nome'
          onChange={setName}
          value={name}
        />
        <Input
          label='Sobrenome'
          onChange={setSurname}
          value={surname}
        />
        <Input
          label='Gênero'
          onChange={setGender}
          value={gender}
        />
        <Input
          label='Data de nascimento'
          onChange={setDate}
          value={date}
        />
        <Input
          label='CPF'
          onChange={setCpf}
          value={cpf}
        />

        <Input
          label='Endereço'
          onChange={setAdress}
          value={adress}
        />

        <Input
          label='Cep'
          onChange={setCep}
          value={cep}
        />
        <Button onClick={() => submit()}>Enviar</Button>
      </div>
    </Modal>
  )
}

EditWalletModal.propTypes = {
  onChange: PropTypes.func
}

export default EditWalletModal
