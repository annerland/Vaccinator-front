export default class Persona {
  constructor (httpWrapper) {
    this.httpWrapper = httpWrapper
  }

  async listAllPersons () {
    const url = '/persons'
    const res = await this.httpWrapper.get(url)
    return res.data
  }

  async post (data) {
    const url = '/persons'
    const res = await this.httpWrapper.post(url, data)
    return res.data
  }

  async update (data, id) {
    const url = `/persons/${id}`
    const res = await this.httpWrapper.patch(url, data)
    return res.data
  }

  async delete (id) {
    const url = `/persons/${id}`
    const res = await this.httpWrapper.delete(url)
    return res.data
  }

  async getOne (id) {
    const url = `/persons/${id}`
    const res = await this.httpWrapper.get(url)
    return res.data
  }

  async getPersonByUser (id) {
    const url = `/persons/id/${id}`
    const res = await this.httpWrapper.get(url)
    return res.data
  }
}
