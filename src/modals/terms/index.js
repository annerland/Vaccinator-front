import React from 'react'
import Modal from 'Components/molecules/genericModal'
import { useTranslation } from 'react-i18next'

import './index.scss'

const TermsModal = () => {
  const { t } = useTranslation('Terms')
  return (
    <Modal id='show-terms' height={400} width={532}>
      <div className='modal-container'>
        <div className='show-terms-content'>
          <h2 className='title'>{t('title')}</h2>
          <h2 className='title'>{t('terms')}</h2>
          <p>{t('paragraph')}</p>

          <h2 className='title'>{t('paragraph-2')}</h2>
          <p>{t('paragraph-3')}</p>

          <p>{t('paragraph-4')}</p>
          <p>{t('paragraph-5')}</p>
          <p>{t('paragraph-6')}</p>
          <p>{t('paragraph-7')}</p>
          <p>{t('paragraph-8')}</p>

          <p>{t('paragraph-9')}</p>

          <h2 className='title'>{t('paragraph-10')}</h2>
          <p>{t('paragraph-11')}</p>
          <p>{t('paragraph-12')}</p>
          <h2 className='title'>{t('paragraph-13')}</h2>
          <p>{t('paragraph-14')}</p>

          <p><strong>{t('paragraph-15')}</strong></p>
          <p>{t('paragraph-16')}</p>

          <h2 className='title'>{t('paragraph-17')}</h2>
          <p>{t('paragraph-18')}</p>

          <p><strong>{t('paragraph-19')}</strong></p>
          <p>{t('paragraph-20')}</p>

          <i><p>{t('paragraph-21')}</p></i>
          <i><p>{t('paragraph-22')}</p></i>
        </div>
      </div>
    </Modal>
  )
}

export default TermsModal
