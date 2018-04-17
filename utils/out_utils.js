
class OutJson {
  success (data, msg = '') {
    return this._format(200, data, msg)
  }
  error (data, msg) {
    return this._format(-200, data, msg)
  }
  default (data) {
    return JSON.stringify(data)
  }
  _format (status, data, msg) {
    const _data = {
      code: status,
      data: data,
      msg: msg || ''
    }
    return _data
    // return JSON.stringify(_data)
  }
}

module.exports = new OutJson()
