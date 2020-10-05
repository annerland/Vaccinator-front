import React from 'react'
import Select from 'Components/atoms/select'
import Modals from 'Util/modals'
import ShowTerms from 'Modals/terms'
import PolicyModal from 'Modals/policy'
import Api from 'Util/api'
import StoreRedux from 'Redux/'
import './index.scss'
import { useHistory } from 'react-router-dom'

export default function ConfigUser () {
  const { auth } = StoreRedux.getState()
  const history = useHistory()

  const options = [
    { value: 'pt', label: 'Português' },
    { value: 'en', label: 'Inglês' }
  ]

  const deleteAccount = () => {
    Modals.Generic.sucess({
      title: 'Deletar conta',
      text: 'Todos os dados da conta serao deletados',
      cancel: 'Cancelar',
      continue: 'Continuar',
      handleAction: async () => {
        try {
          await Api.Auth.delete(auth.id)
          history.push('/login')
        } catch (err) {
          console.log(err)
        }
      }
    })
  }

  const showPolicy = () => {
    Modals.Generic.show('show-policy')
  }

  const showTerms = () => {
    Modals.Generic.show('show-terms')
  }

  return (
    <div className='config-route'>
      <h1 className='title'>Configurações</h1>

      <div className='config-content'>
        <p onClick={showTerms}>Termos de uso</p>
        <p onClick={showPolicy}>Politica de privacidade</p>

        <div className='select-container'>
          <Select options={options} label='Selecione o idioma' />
        </div>

        <p className='delete' onClick={() => deleteAccount()}>Deletar dados da conta</p>
      </div>
      <ShowTerms />
      <PolicyModal />
    </div>
  )
}
