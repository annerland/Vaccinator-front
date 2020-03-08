import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserHomeRoute from 'Routes/user/home'
import './index.scss'

export default function UserRoute () {
  return (
    <div className='user-routes'>
      <div className='user_body'>
        <div className='user-routes__container'>
          <Switch>
            <Route exact path='/user/home' component={UserHomeRoute} />
          </Switch>
        </div>
      </div>
    </div>
  )
}
