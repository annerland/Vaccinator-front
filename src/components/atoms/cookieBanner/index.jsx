import React, { useState, useEffect } from 'react'
import Button from 'Components/atoms/button'
import Modals from 'Util/modals'
import { useTranslation } from 'react-i18next'
import PolicyModal from 'Modals/policy'

import './index.scss'

const CookieBanner = () => {
  const [show, setShow] = useState(true)
  const [enabled, setEnabled] = useState(false)
  const { t } = useTranslation('Policy')

  useEffect(() => {
    setEnabled(true)
  }, [enabled])

  const showPolicy = () => {
    Modals.Generic.show('show-policy')
  }

  const handleClose = () => {
    localStorage.setItem('not-show-cookie-banner', enabled)
    setShow(false)
  }

  if (!show) return null

  return (
    <div className='main-container-banner'>
      {show &&
        <div className='cookie-banner'>
          <i className='icon-cookie' />
          <p>{t('cookie')}<span onClick={showPolicy}>{t('policy')}</span></p>

          <Button type='secondary' onClick={() => handleClose()} children='Prosseguir' />
        </div>}
      <PolicyModal />
    </div>
  )
}

export default CookieBanner
