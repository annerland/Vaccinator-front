import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from 'Routes/login'
import Home from 'Routes/home'
// import AdminRoutes from 'Routes/admin'
import UserRoutes from 'Routes/user'
import ForgotPasswordRoute from 'Routes/forgotPassword'
import SignUpRoute from 'Routes/signUp'
import ConfirmRoute from 'Routes/confirmAccount'
import ResetPasswordRoute from 'Routes/resetPassword'

export default function App () {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      {/* <Route path='/user' component={AdminRoutes} /> */}
      <Route path='/user' component={UserRoutes} />
      <Route path='/forgot-password' component={ForgotPasswordRoute} />
      <Route path='/sign-up' component={SignUpRoute} />
      <Route exact path='/active/:token' component={ConfirmRoute} />
      <Route exact path='/reset-password/:token' component={ResetPasswordRoute} />
    </Switch>
  )
}
