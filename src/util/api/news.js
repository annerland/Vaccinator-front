export default class News {
  constructor (httpWrapper) {
    this.httpWrapper = httpWrapper
  }

  async list () {
    const url = '/news'
    const res = await this.httpWrapper.get(url)
    return res.data
  }
}