export default class Schedule {
  constructor (httpWrapper) {
    this.httpWrapper = httpWrapper
  }

  async list () {
    const url = '/schedules'
    const res = await this.httpWrapper.get(url)
    return res.data
  }

  async getOne (id) {
    const url = `/schedules/${id}`
    const res = await this.httpWrapper.get(url)
    return res.data
  }

  async post (data) {
    const url = '/schedules'
    const res = await this.httpWrapper.post(url, data)
    return res.data
  }

  async update (data, id) {
    const url = `/schedules/${id}`
    const res = await this.httpWrapper.patch(url, data)
    return res.data
  }

  async delete (id) {
    const url = `/schedules/${id}`
    const res = await this.httpWrapper.delete(url)
    return res.data
  }
}
