import Validator from 'validator'
import moment from 'moment'

const validator = Validator

validator.isDate = (value) => {
  return moment(value, 'DD/MM/YYYY', true).isValid()
}

validator.isSamePassword = (value, args) => {
  return value === args.password
}

validator.isShort = (value = '') => {
  return value.length < 6
}

validator.isPowerfullPassword = (value) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*\+\[\]\{\}\$\)\()]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
  return regex.test(value)
}

class FormValidator {
  constructor (validations) {
    this.validations = validations
  }

  validate (state) {
    const validation = this.valid()

    this.validations.forEach(rule => {
      if (!validation[rule.field].isInvalid) {
        const fieldValue = state[rule.field].toString()
        const args = rule.args || []
        const validationMethod = typeof rule.method === 'string' ? validator[rule.method] : rule.method

        if (validationMethod(fieldValue, ...args, state) !== rule.validWhen) {
          validation[rule.field] = {
            isInvalid: true,
            message: rule.message
          }

          validation.isValid = false
        }
      }
    })

    return validation
  }

  valid () {
    const validation = {}

    this.validations.map(rule => (
      validation[rule.field] = { isInvalid: false, message: '' }
    ))

    return { isValid: true, ...validation }
  }
}

export {
  FormValidator,
  validator
}
