import React from 'react'
import StoreRedux from 'Redux/'
import { logOut } from 'Redux/auth/actions'

export default function HomeUser () {
  return (
    <div>
      <h1 className='title'>Teste Home</h1>
      <button onClick={() => StoreRedux.dispatch(logOut())}>logout</button>
    </div>
  )
}
