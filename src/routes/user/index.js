import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeUser from 'Routes/user/home'
import SideMenu from 'Components/molecules/sideMenu'
import VaccinesUser from 'Routes/user/vaccines'

import './index.scss'

export default function UserRoutes () {
  return (
    <div className='user-routes'>
      <SideMenu />
      <div className='user_body'>
        <div className='user-routes__container'>
          <Switch>
            <Route exact path='/user/home' component={HomeUser} />
            <Route path='/user/vaccines' component={VaccinesUser} />
          </Switch>
        </div>
      </div>
    </div>
  )
}
