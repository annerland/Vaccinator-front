export default class Vaccine {
  constructor (httpWrapper) {
    this.httpWrapper = httpWrapper
  }

  async list (lang) {
    const url = `/vacinas/${lang}`
    const res = await this.httpWrapper.get(url)
    return res.data
  }

  async post (data) {
    const url = '/vacinas'
    const res = await this.httpWrapper.post(url, data)
    return res.data
  }
}
