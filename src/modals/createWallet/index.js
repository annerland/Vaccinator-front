import React, { useState } from 'react'
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

const CreateWalletModal = (props) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [gender, setGender] = useState('')
  const [date, setDate] = useState('')
  const [cpf, setCpf] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [adress, setAdress] = useState('')
  const [cep, setCep] = useState('')

  const formValidator = new FormValidator([
    {
      field: 'name',
      method: validator.isEmpty,
      validWhen: false,
      message: 'vazio'
    },
    {
      field: 'surname',
      method: validator.isEmpty,
      validWhen: false,
      message: 'vazio'
    },
    {
      field: 'date',
      method: validator.isEmpty,
      validWhen: false,
      message: 'vazio'
    },
    {
      field: 'gender',
      method: validator.isEmpty,
      validWhen: false,
      message: 'vazio'
    },
    {
      field: 'cpf',
      method: validator.isEmpty,
      validWhen: false,
      message: 'vazio'
    },
    {
      field: 'adress',
      method: validator.isEmpty,
      validWhen: false,
      message: 'vazio'
    },

    {
      field: 'cep',
      method: validator.isEmpty,
      validWhen: false,
      message: 'vazio'
    }
  ])

  const submit = async () => {
    const validation = formValidator.validate({
      name,
      surname,
      gender,
      date,
      cpf,
      adress,
      cep
    })
    setErrors(validation)

    if (validation.isValid) {
      const payload = {}
      payload.strNome = name
      payload.strSobrenome = surname
      payload.charGenero = gender
      payload.dtNascimento = date
      payload.strCpf = cpf
      payload.strEndereco = adress
      payload.strCep = cep
      payload.boolAtivo = 1
      moment(date).format('YYYY-MM-DD')

      setLoading(true)
      try {
        await Api.Persona.post(payload)
        props.onChange()

        Modals.Generic.sucess({
          title: 'Criar Carteira',
          text: 'Sua Carteira foi criada com sucesso!',
          continue: 'OK',
          handleAction: () => Modals.Generic.hide()
        })
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
  }

  return (
    <Modal id='create-wallet' height={400} width={532}>
      <Loading show={loading} />
      <div className='modal-container'>
        <h2 className='title'>Criar Carteira</h2>

        <Input
          label='Nome'
          onChange={setName}
          value={name}
          placeholder='Digite seu nome'
          validator={errors.name}
        />
        <Input
          label='Sobrenome'
          onChange={setSurname}
          value={surname}
          placeholder='Digite seu sobrenome'
          validator={errors.surname}
        />
        <Input
          label='Gênero'
          onChange={setGender}
          value={gender}
          placeholder='Gênero'
          validator={errors.gender}
        />
        <Input
          label='Data de nascimento'
          onChange={setDate}
          value={date}
          placeholder='Data de nascimento'
          validator={errors.date}
        />
        <Input
          label='CPF'
          onChange={setCpf}
          value={cpfMask(cpf)}
          placeholder='CPF'
          validator={errors.cpf}
        />

        <Input
          label='Endereço'
          onChange={setAdress}
          value={adress}
          placeholder='endereço'
          validator={errors.adress}
        />

        <Input
          label='Cep'
          onChange={setCep}
          value={cep}
          placeholder='00000-000'
          validator={errors.cep}
        />
        <Button onClick={() => submit()}>Enviar</Button>
      </div>
    </Modal>
  )
}

CreateWalletModal.propTypes = {
  onChange: PropTypes.func
}

export default CreateWalletModal
