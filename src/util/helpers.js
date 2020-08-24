import StoreRedux from 'Redux/'

export function getRedirectLoginUrl (data) {
  return '/user/home'
}

export function getUserLogged (history) {
  const { auth } = StoreRedux.getState()

  if (auth.token) {
    history.push('/user/home')
  }
}
