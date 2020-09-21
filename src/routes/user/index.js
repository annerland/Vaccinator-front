import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeUser from 'Routes/user/home'
import SideMenu from 'Components/molecules/sideMenu'
import SucessModal from 'Modals/success'
import VaccinesUser from 'Routes/user/vaccines/list'
import ShowVaccine from 'Routes/user/vaccines/show'
import EstablishmentsUser from 'Routes/user/establishments'
import WalletUser from 'Routes/user/wallet'
import NewsUser from 'Routes/user/news/list'
import ShowNews from 'Routes/user/news/show'

import './index.scss'

export default function UserRoutes () {
  return (
    <div className='user-routes'>
      <SideMenu />
      <SucessModal />
      <div className='user_body'>
        <div className='user-routes__container'>
          <Switch>
            <Route exact path='/user/home' component={HomeUser} />
            <Route exact path='/user/vaccines' component={VaccinesUser} />
            <Route path='/user/vaccines/:id' component={ShowVaccine} />
            <Route path='/user/establishments' component={EstablishmentsUser} />
            <Route path='/user/wallets' component={WalletUser} />
            <Route exact path='/user/news' component={NewsUser} />
            <Route path='/user/news/:id' component={ShowNews} />
          </Switch>
        </div>
      </div>
    </div>
  )
}
