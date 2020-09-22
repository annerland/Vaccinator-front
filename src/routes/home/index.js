import React from 'react'
import Curve from 'Assets/curve.svg'
import MiniCurve from 'Assets/mini-curve.svg'
import Logo from 'Assets/logo-vaccinator-home.svg'
import Button from 'Components/atoms/button'
import Health from 'Assets/health-vector.svg'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BR from 'Assets/brflag.png'
import US from 'Assets/usflag.png'
import i18next from 'i18next'

import './index.scss'

export default function HomePage () {
  const { t } = useTranslation('Home')
  const history = useHistory()

  const redirectLogin = () => {
    history.push('/login')
  }

  const redirectSignUp = () => {
    history.push('/sign-up')
  }

  const changeLanguage = (lang) => {
    i18next.changeLanguage(lang)
  }

  return (
    <div className='home-container'>
      <div className='home-navbar'>
        <img className='logo' src={Logo} />
        <div className='home-options'>
          <p>{t('home')}</p>
          <p>{t('about')}</p>
          <p>{t('contact')}</p>
        </div>

        <Button size='middle' type='decline-primary' onClick={() => redirectLogin()}>{t('login')}</Button>
      </div>

      <div className='call-to-action'>
        <div className='flex-div'>
          <h1>{t('title')}</h1>
          <img src={BR} onClick={() => changeLanguage('pt')} alt='br-flag' />
          <img src={US} onClick={() => changeLanguage('en')} alt='us-flag' />
        </div>

        <p>{t('resume')}</p>

        <Button onClick={() => redirectSignUp()}>{t('register')}</Button>
      </div>
      <img className='curve' src={Curve} />
      <img className='mini-curve' src={MiniCurve} />
      <img className='undraw-vector' src={Health} />
    </div>
  )
}
