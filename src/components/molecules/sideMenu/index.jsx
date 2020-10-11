import React from 'react'
import Logo from 'Assets/reverse-logo.svg'
import { useHistory } from 'react-router-dom'
import StoreRedux from 'Redux/'
import { logOut } from 'Redux/auth/actions'
import { useTranslation } from 'react-i18next'
import Classnames from 'classnames'

import './index.scss'

const SideMenu = () => {
  const history = useHistory()
  const { t } = useTranslation('SideMenu')

  const getStyle = (term) => {
    const pathname = window.location.href

    const data = {
      active: new RegExp(term).test(pathname)
    }

    return Classnames('options', data)
  }

  const redirect = (url) => {
    history.push(`/user/${url}`)
  }

  return (
    <div className='side-menu'>
      <div className='top-menu'>
        <img src={Logo} alt='Vaccinator logo' />
      </div>

      <ul>
        <li className={getStyle('/user/wallets')} onClick={() => redirect('wallets')}>
          <i className='icon-card' />
          <p>{t('wallets')}</p>
        </li>

        <li className={getStyle('/user/vaccines')} onClick={() => redirect('vaccines')}>
          <i className='icon-vaccine' />
          <p>{t('vaccines')}</p>
        </li>

        <li className={getStyle('/user/news')} onClick={() => redirect('news')}>
          <i className='icon-news' />
          <p>{t('news')}</p>
        </li>

        <li className={getStyle('/user/establishments')} onClick={() => redirect('establishments')}>
          <i className='icon-map' />
          <p>{t('establish')}</p>
        </li>

        <li className={getStyle('/user/configurations')} onClick={() => redirect('configurations')}>
          <i className='icon-cog' />
          <p>{t('config')}</p>
        </li>

        <li className='exit' onClick={() => StoreRedux.dispatch(logOut())}>
          <i className='icon-sign-out' />
          <p>{t('exit')}</p>
        </li>
      </ul>
    </div>
  )
}

export default SideMenu
