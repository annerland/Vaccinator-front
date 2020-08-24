import React, { useState, useEffect } from 'react'
import StoreRedux from 'Redux/'
import { logOut } from 'Redux/auth/actions'
import Api from 'Util/api'

export default function HomeUser () {
  return (
    <div>
      <h1>Teste Home</h1>
      <button onClick={() => StoreRedux.dispatch(logOut())}>logout</button>
    </div>
  )
}
