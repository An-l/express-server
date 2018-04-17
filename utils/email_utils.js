let nodemailer = require('nodemailer')
let { mailconfig } = require('config')

class SendMail {
  // 初始化
  constructor () {
    this.mailTransport = nodemailer.createTransport({
      host: mailconfig.host,
      secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
      auth: {
        user: mailconfig.user, // 你的邮箱地址
        pass: mailconfig.password // 你的邮箱密码
      }
    })
  }
  /**
 * 发送邮件
 * @param {any} form "你的名字" <你的邮箱地址>
 * @param {any} to "用户1" <邮箱地址1>, "用户2" <邮箱地址2>
 * @param {any} title 一封来自Node Mailer的邮件
 * @param {any} text 一封来自Node Mailer的邮件
 * @param {any} html html
 * @returns 发送回馈
 * @memberof SendMail
 */
  send (form, to, title, text, html) {
    let options = {
      from: form, // "你的名字" <你的邮箱地址>
      to: to, // "用户1" <邮箱地址1>, "用户2" <邮箱地址2>
      // cc         : ''  //抄送
      // bcc      : ''    //密送
      subject: title, // 一封来自Node Mailer的邮件
      text: text, // 一封来自Node Mailer的邮件
      html: html, // <h1>你好，这是一封来自NodeMailer的邮件！</h1><p><img src="cid:00000001"/></p>
      attachments: [
        // {
        //     filename: 'img1.png', // 改成你的附件名
        //     path: 'public/images/img1.png', // 改成你的附件路径
        //     cid: '00000001' // cid可被邮件使用
        // },
        // {
        //     filename: 'img2.png', // 改成你的附件名
        //     path: 'public/images/img2.png', // 改成你的附件路径
        //     cid: '00000002' // cid可被邮件使用
        // }
      ]
    }
    return new Promise((resolve, reject) => {
      this.mailTransport.sendMail(options, function (err, msg) {
        if (err) {
          resolve(err)
        } else {
          resolve(msg)
        }
      })
    })
  }
}

module.exports = new SendMail()
