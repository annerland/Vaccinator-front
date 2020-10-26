import React from 'react'
import Modals from 'Util/modals'
import ShowTerms from 'Modals/terms'
import PolicyModal from 'Modals/policy'
import Api from 'Util/api'
import StoreRedux from 'Redux/'
import { useTranslation } from 'react-i18next'
import './index.scss'
import { useHistory } from 'react-router-dom'

export default function ConfigUser () {
  const { auth } = StoreRedux.getState()
  const { t } = useTranslation('Config')

  const history = useHistory()

  const deleteAccount = () => {
    Modals.Generic.sucess({
      title: t('delete-account'),
      text: t('delete-text'),
      cancel: t('cancel'),
      continue: t('continue'),
      handleAction: async () => {
        try {
          await Api.Auth.delete(auth.id)
          history.push('/login')
        } catch (err) {
          console.log(err)
        }
      }
    })
  }

  const showPolicy = () => {
    Modals.Generic.show('show-policy')
  }

  const showTerms = () => {
    Modals.Generic.show('show-terms')
  }

  return (
    <div className='config-route'>
      <h1 className='title'>{t('title')}</h1>

      <div className='config-content'>
        <p onClick={showTerms}>{t('terms')}</p>
        <p onClick={showPolicy}>{t('policy')}</p>

        <p className='delete' onClick={() => deleteAccount()}>{t('delete-account')}</p>
      </div>
      <ShowTerms />
      <PolicyModal />
    </div>
  )
}
