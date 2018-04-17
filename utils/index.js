
// 常用工具库
class Uitls {
  /**
   * 正则验证字符串
   *
   * @param {any} type 类型
   * @param {any} str 验证的字符串
   * @returns
   * @memberof Uitls
   */
  checkStrType (type, str) {
    switch (type) {
      case 'email':
        return /^[\w-]+(\.[\w-])*@[\w-]+(\.[\w-]+)+$/.test(str)
      case 'phone':
        return /^1[3|4|5|7|8][0-9]{9}$/.test(str)
      case 'tel':
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str)
      case 'number':
        return /^[0-9]$/.test(str)
      case 'text':
        return /^\w+$/.test(str)
      case 'chinese':
        return /^[\u4E00-\u9FA5]+$/.test(str)
      case 'lower':
        return /^[a-z]+$/.test(str)
      case 'upper':
        return /^[A-Z]+$/.test(str)
      case 'idCard':
        return /^\d{6}[1|2]\d{3}[0|1]\d{1}[0|1|2|3]\d{1}\d{3}(\d|x|X)$/.test(str)
      default:
        return str
    }
  }
}

module.exports = new Uitls()
