import React from 'react'
import Logo from 'Assets/reverse-logo.svg'
import Neo from 'Assets/neo.jpg'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import './index.scss'

const SideMenu = () => {
  const history = useHistory()
  const { t } = useTranslation('SideMenu')

  return (
    <div className='side-menu'>
      <div className='top-menu'>
        <img src={Logo} alt='Vaccinator logo' />
      </div>

      <ul>
        <li onClick={() => history.push('/user/home')}>
          <i className='icon-home' />
          <p>{t('home')}</p>
        </li>

        <li onClick={() => history.push('/user/vaccines')}>
          <i className='icon-vaccine' />
          <p>{t('vaccines')}</p>
        </li>

        <li onClick={() => history.push('/user/wallets')}>
          <i className='icon-card' />
          <p>{t('wallets')}</p>
        </li>

        <li onClick={() => history.push('/user/news')}>
          <i className='icon-news' />
          <p>{t('news')}</p>
        </li>

        <li onClick={() => history.push('/user/establishments')}>
          <i className='icon-map' />
          <p>{t('establish')}</p>
        </li>
      </ul>

      <div className='user-profile'>
        <img src={Neo} /><p>Thomas A. Anderson</p>
      </div>
    </div>
  )
}

export default SideMenu
