import React, { useEffect, useState } from 'react'
import Search from 'Components/atoms/search'
import Neo from 'Assets/neo.jpg'
import Wallet from 'Components/molecules/wallet'
import Button from 'Components/atoms/button'
import moment from 'moment'
import BR from 'Assets/brflag.png'
import US from 'Assets/usflag.png'
import Modals from 'Util/modals'
import ShowWalletModal from 'Modals/showWallet'
import CreateWalletModal from 'Modals/createWallet'
import AddVaccineWallet from 'Modals/addVaccineWallet'
import EditWalletModal from 'Modals/editWallet'
import pagination from 'Util/hooks/pagination'
import PaginationComponent from 'Components/atoms/paginationComponent'
import i18next from 'i18next'
import StoreRedux from 'Redux/'
import { search } from 'fast-fuzzy'
import { useTranslation } from 'react-i18next'
import Api from 'Util/api'

import './index.scss'

export default function WalletUser () {
  const [originalData, setOriginalData] = useState([])
  const { auth } = StoreRedux.getState()

  const { t } = useTranslation('Wallets')
  const [
    page,
    pages,
    list,
    setPage,
    setContent
  ] = pagination(6)

  const handleOnSearch = (query) => {
    if (!query) return setContent(originalData)
    if (query === null) return ''

    const res = search(query || '', originalData, { keySelector: (obj) => obj.strNome || '' })
    setContent(res)
  }

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

  const changeLanguage = (lang) => {
    i18next.changeLanguage(lang)
  }

  useEffect(() => {
    fetchPersons()
  }, [])

  const fetchPersons = async () => {
    await Api.Persona.getPersonByUser(auth.id)
      .then((res) => {
        setContent(res.pessoas)
        setOriginalData(res.pessoas)
      })
  }

  return (
    <div className='wallet-user-route'>
      <div className='title-and-language'>
        <h1 className='title'>Carteiras</h1>
        <img src={BR} onClick={() => changeLanguage('pt')} alt='br-flag' />
        <img src={US} onClick={() => changeLanguage('en')} alt='us-flag' />
      </div>
      <div className='wallet-header'>
        <div className='search-container'>
          <Search
            onChange={handleOnSearch}
            placeholder='search'
          />
        </div>
        <Button onClick={() => createWallet()} type='primary'>{t('add-button')}</Button>
      </div>

      <div className='grid-container'>
        {list.map(person => {
          return (
            <Wallet
              key={person.id}
              src={Neo}
              edit={() => editWallet(person)}
              watch={() => showWallet(person)}
              add={() => addVaccine(person)}
              name={person.strNome}
              date={moment(person.dtNascimento).format('DD/MM/YYYY')}
              gender={person.charGenero === 'f' ? t('female') : t('male')}
              field={person.strCpf}
            />
          )
        })}
      </div>
      <PaginationComponent
        total={pages}
        current={page}
        onChange={setPage}
      />
      <EditWalletModal />
      <ShowWalletModal />
      <AddVaccineWallet />
      <CreateWalletModal onChange={fetchPersons} />
    </div>
  )
}
