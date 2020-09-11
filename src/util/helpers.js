import StoreRedux from 'Redux/'

export function getRedirectLoginUrl (data) {
  return '/user/home'
}

export const cpfMask = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export function getUserLogged (history) {
  const { auth } = StoreRedux.getState()

  if (auth.token) {
    history.push('/user/home')
  }
}
