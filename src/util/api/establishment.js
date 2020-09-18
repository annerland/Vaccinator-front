export default class Establishment {
  constructor (httpWrapper) {
    this.httpWrapper = httpWrapper
  }

  async getVaccine () {
    const url = '/establishment/vaccine'
    const res = await this.httpWrapper.get(url)
    return res.data
  }

  async addVaccine (data) {
    const url = '/establishment/vaccine'
    const res = await this.httpWrapper.post(url, data)
    return res.data
  }

  async create (data) {
    const url = '/establishment'
    const res = await this.httpWrapper.post(url, data)
    return res.data
  }

  async list () {
    const url = '/establishment'
    const res = await this.httpWrapper.get(url)
    return res.data
  }

  async getAll (cep, vaccine, milles, adress) {
    const url = `/establishment/vaccine/${cep}/${vaccine}/${milles}/${adress}`
    const res = await this.httpWrapper.get(url)

    return res.data
  }
}
