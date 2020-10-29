import React from 'react'
import Modal from 'Components/molecules/genericModal'
import { useTranslation } from 'react-i18next'

import './index.scss'

const PolicyModal = () => {
  const { t } = useTranslation('Policy')
  return (
    <Modal id='show-policy' height={400} width={532}>
      <div className='modal-container'>
        <div className='show-policy-content'>
          <h2 className='title'>Política Privacidade</h2>
          <p>{t('paragraph-1')}</p>
          <p>{t('paragraph-2')}</p>
          <p>{t('paragraph-3')}</p>
          <p>{t('paragraph-4')}</p>
          <p>{t('paragraph-5')}</p>
          <p>{t('paragraph-6')}</p>
          <p>{t('paragraph-7')}</p>

          <h2 className='title'>{t('paragraph-8')}</h2>
          <p><strong>{t('paragraph-9')}</strong></p>
          <p>{t('paragraph-10')}</p>
          <p><strong>{t('paragraph-11')}</strong></p>
          <p>{t('paragraph-12')}</p>
          <p><strong>{t('paragraph-13')}</strong></p>
          <p>{t('paragraph-14')}</p>
          <h2 className='title'>{t('paragraph-15')}</h2>
          <p><strong>{t('paragraph-16')}</strong></p>

          <p>{t('paragraph-17')}</p>

          <p><strong>{t('paragraph-18')}</strong></p>

          <p>{t('paragraph-19')}</p>

          <p><strong>{t('paragraph-20')}</strong></p>

          <p>{t('paragraph-21')}</p>

          <p>{t('paragraph-22')}</p>

          <p>{t('paragraph-23')}</p>

          <p><i>{t('paragraph-24')}</i></p>
        </div>
      </div>
    </Modal>
  )
}

export default PolicyModal
