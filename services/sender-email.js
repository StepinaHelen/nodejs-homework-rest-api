const sendGridMail = require('@sendgrid/mail')
require('dotenv').config()

class CreateSenderSendgrid {
  async send(msg) {
    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

    return await sendGridMail.send({ ...msg, from: 'stepinahelen@gmail.com' })
  }
}

module.exports = CreateSenderSendgrid
