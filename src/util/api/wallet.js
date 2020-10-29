export default class Wallet {
  constructor (httpWrapper) {
    this.httpWrapper = httpWrapper
  }

  async list () {
    const url = '/wallet'
    const res = await this.httpWrapper.get(url)
    return res.data
  }

  async getOne (id) {
    const url = `/wallet/person/${id}`
    const res = await this.httpWrapper.get(url)
    return res.data
  }

  async post (data) {
    const url = '/wallet'
    const res = await this.httpWrapper.post(url, data)
    return res.data
  }

  async update (data, id) {
    const url = `/wallet/${id}`
    const res = await this.httpWrapper.patch(url, data)
    return res.data
  }

  async delete (id) {
    const url = `/wallet/${id}`
    const res = await this.httpWrapper.delete(url)
    return res.data
  }
}
