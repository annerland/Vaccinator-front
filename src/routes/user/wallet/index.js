import React from 'react'
import Search from 'Components/atoms/search'
import './index.scss'

export default function WalletUser () {
  return (
    <div className='wallet-user-route'>
      <h1 className='title'>Carteiras</h1>

      <h2 className='wallet-title'>Carteira principal</h2>

      <div className='other-wallets'>
        <Search placeholder='Search' />

        <h2 className='wallet-title'>Carteiras Dependêntes</h2>
      </div>
    </div>
  )
}
