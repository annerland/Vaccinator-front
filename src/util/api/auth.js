export default class Auth {
  constructor (httpWrapper) {
    this.httpWrapper = httpWrapper
  }

  async signIn (data) {
    const url = '/auth/login'
    const res = await this.httpWrapper.post(url, data)
    return res.data
  }

  async active (token) {
    const url = `/auth/activate/${token}`
    const res = await this.httpWrapper.get(url)
    return res.data
  }

  async signUp (data) {
    const url = '/auth/register'
    const res = await this.httpWrapper.post(url, data)
    return res.data
  }

  async resetPassword (data) {
    const url = '/auth/password/reset'
    const res = await this.httpWrapper.patch(url, data)
    return res.data
  }

  async forgotPassword (email) {
    const url = '/auth/token/create'
    const res = await this.httpWrapper.post(url, email)
    return res.data
  }
}
