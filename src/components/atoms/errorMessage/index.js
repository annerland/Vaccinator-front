import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

const ErrorMessage = (props) => {
  const { t } = useTranslation('validation')

  if (!props.validator.isInvalid) return null

  return (
    <span className={cn('error__invalid-msg', { bg: props.bg })}>
      {t(props.validator.message)}
    </span>
  )
}

ErrorMessage.propTypes = {
  validator: PropTypes.object,
  bg: PropTypes.bool
}

export default ErrorMessage
