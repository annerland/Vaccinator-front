import React from 'react'
import Search from 'Components/atoms/search'
import Neo from 'Assets/neo.jpg'
import Wallet from 'Components/molecules/wallet'
import Button from 'Components/atoms/button'
import './index.scss'

export default function WalletUser () {
  return (
    <div className='wallet-user-route'>
      <h1 className='title'>Carteiras</h1>
      <div className='wallet-header'>
        <div className='search-container'>
          <Search
            placeholder='search'
          />
        </div>
        <Button type='primary'>ADICIONAR +</Button>
      </div>

      <h2 className='wallet-title'>Carteira principal</h2>

      <Wallet
        src={Neo}
        name='Keanu Reeves'
        age='56'
        gender='Masculino'
        field='frutos do mar'
        sfield='eu mesmo'
      />
      <div className='other-wallets'>

        <h2 className='wallet-title'>Carteiras Dependêntes</h2>
      </div>
    </div>
  )
}
