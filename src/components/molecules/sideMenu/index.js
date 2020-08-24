import React from 'react'
import Logo from 'Assets/reverse-logo.svg'
import Neo from 'Assets/neo.jpg'
import { useSelector } from 'react-redux'

import './index.scss'

const SideMenu = () => {
  const auth = useSelector((state) => state.auth)

  return (
    <div className='side-menu'>
      <div className='top-menu'>
        <img src={Logo} alt='Vaccinator logo' />
      </div>

      <ul>
        <li>
          <i className='icon-home' />
          <p>Home</p>
        </li>

        <li>
          <i className='icon-vaccine' />
          <p>Vacinas</p>
        </li>

        <li>
          <i className='icon-card' />
          <p>Carteiras</p>
        </li>

        <li>
          <i className='icon-map' />
          <p>Estabelecimentos</p>
        </li>
      </ul>

      <div className='user-profile'>
        <img src={Neo} /><p>Thomas A. Anderson</p>
      </div>
    </div>
  )
}

export default SideMenu
