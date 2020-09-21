import React, { useState, useEffect } from 'react'
import Search from 'Components/atoms/search'
import Neo from 'Assets/neo.jpg'
import Wallet from 'Components/molecules/wallet'
import Button from 'Components/atoms/button'
import moment from 'moment'
import Modals from 'Util/modals'
import ShowWalletModal from 'Modals/showWallet'
import CreateWalletModal from 'Modals/createWallet'
import AddVaccineWallet from 'Modals/addVaccineWallet'
import EditWalletModal from 'Modals/editWallet'
import Api from 'Util/api'
import './index.scss'

export default function WalletUser () {
  const [persons, setPersons] = useState([])

  const createWallet = () => {
    Modals.Generic.show('create-wallet')
  }

  const showWallet = (elm) => {
    Modals.Generic.show('show-wallet', { data: elm })
  }

  const addVaccine = (elm) => {
    Modals.Generic.show('add-vaccine-wallet', { data: elm })
  }

  const editWallet = (elm) => {
    Modals.Generic.show('edit-wallet', { data: elm })
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
              edit={() => editWallet(person)}
              watch={() => showWallet(person)}
              add={() => addVaccine(person)}
              name={person.strNome}
              date={moment(person.dtNascimento).format('DD/MM/YYYY')}
              gender={(person.charGenero).toUpperCase()}
              field={person.strCpf}
            />
          )
        })}
      </div>
      <EditWalletModal />
      <ShowWalletModal />
      <AddVaccineWallet />
      <CreateWalletModal onChange={fetchPersons} />
    </div>
  )
}
