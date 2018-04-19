let out = require('./../utils/out_utils')

class Controllers {
  constructor(service) {
    this.service = service
  }

  async getList(req, res, next) {
    let { pageNum = 1, pageSize = 10 } = req.query

    let resultData = await this.service.getList(pageNum, pageSize)

    if (resultData !== null) {
      res.send(out.success(resultData, '获取成功'))
    } else {
      res.send(out.error('', ''))
    }
  }
  async create(req, res, next) {
    let data = { ...req.body }

    let resultData = await this.service.create(data)

    if (resultData) {
      res.send(out.success('', '插入成功'))
    } else {
      res.send(out.error('', ''))
    }
  }
  async delete(req, res, next) {
    let { id } = req.params

    let resultData = await this.service.delete(id)

    if (resultData) {
      res.send(out.success('', '删除成功'))
    } else {
      res.send(out.error('', ''))
    }
  }
  async update(req, res, next) {
    let { id } = req.params
    let data = { ...req.body }

    let resultData = await this.service.update(id, data)

    if (resultData) {
      res.send(out.success('', '更新成功'))
    } else {
      res.send(out.error('', ''))
    }
  }
}

module.exports = Controllers
