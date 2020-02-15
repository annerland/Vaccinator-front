import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from 'Routes/login'

export default function App () {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
    </Switch>
  )
}
