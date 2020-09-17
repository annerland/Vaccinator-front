import React, { useState, useEffect } from 'react'
import Search from 'Components/atoms/search'
import Neo from 'Assets/neo.jpg'
import Wallet from 'Components/molecules/wallet'
import Button from 'Components/atoms/button'
import moment from 'moment'
import Modals from 'Util/modals'
import CreateWalletModal from 'Modals/createWallet'
import Api from 'Util/api'
import './index.scss'

export default function WalletUser () {
  const [persons, setPersons] = useState([])

  const createWallet = () => {
    Modals.Generic.show('create-wallet')
  }

  useEffect(() => {
    fetchPersons()
  }, [])

  const fetchPersons = async () => {
    await Api.Persona.list()
      .then((res) => {
        setPersons(res.pessoas)
      })
  }

  return (
    <div className='wallet-user-route'>
      <h1 className='title'>Carteiras</h1>
      <div className='wallet-header'>
        <div className='search-container'>
          <Search
            placeholder='search'
          />
        </div>
        <Button onClick={() => createWallet()} type='primary'>ADICIONAR +</Button>
      </div>

      <div className='grid-container'>
        {persons.map(person => {
          return (
            <Wallet
              key={person.id}
              src={Neo}
              name={person.strNome}
              date={moment(person.dtNascimento).format('DD/MM/YYYY')}
              gender={(person.charGenero).toUpperCase()}
              field={person.strCpf}
              sfield={person.strEndereco}
            />
          )
        })}
      </div>
      <CreateWalletModal onChange={fetchPersons} />
    </div>
  )
}
