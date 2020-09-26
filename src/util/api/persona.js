export default class Persona {
  constructor (httpWrapper) {
    this.httpWrapper = httpWrapper
  }

  async list () {
    const url = '/persons'
    const res = await this.httpWrapper.get(url)
    return res.data
  }

  async post (data) {
    const url = '/persons'
    const res = await this.httpWrapper.post(url, data)
    return res.data
  }

  async getOne (id) {
    const url = `/persons/id/${id}`
    const res = await this.httpWrapper.get(url)
    return res.data
  }
}
