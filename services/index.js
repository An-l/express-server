class Service {
  constructor(model) {
    this.model = model
  }

  async getList(pageNum, pageSize) {
    pageNum = parseInt(pageNum)
    pageSize = parseInt(pageSize)
    let end = pageSize // 默认页数
    let start = (pageNum - 1) * end

    let list = await this.model.getList(start, end)

    let totals = await this.model.count()

    return {
      totals,
      pageSize,
      pageNum,
      list
    }
  }
  async create(obj) {
    let result = await this.model.create(obj)

    if (result.affectedRows > 0) {
      return true
    }
    return false
  }

  async delete(id) {
    let result = await this.model.delete(id)

    if (result.affectedRows > 0) {
      return true
    }
    return false
  }

  async update(id, obj) {
    let result = await this.model.update(id, obj)

    if (result.affectedRows > 0) {
      return true
    }
    return false
  }
}

module.exports = Service
