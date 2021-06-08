const Mailgen = require('mailgen')

class EmailService {
  constructor(env, sender) {
    this.sender = sender

    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000'
        break

      case 'production':
        this.link = 'link for production '
        break

      default:
        this.link = 'http://localhost:3000'
        break
    }
  }
  #createTemplateVerifyEmail(token, name) {
    const mailGenerator = new Mailgen({
      theme: 'cerberus',
      product: {
        name: 'GoItHomework',
        link: this.link,
      },
    })

    const email = {
      body: {
        name: 'Stepina Helen',
        intro:
          "Welcome to GoItHomework! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with GoItHomework, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${token}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    }

    // Generate an HTML email with the provided contents
    return mailGenerator.generate(email)
  }
  async sendVerifyPasswordEmail(token, email, name) {
    const emailBody = this.#createTemplateVerifyEmail(token, name)
    const result = await this.sender.send({
      to: email,
      subject: 'Verify our account',
      html: emailBody,
    })
    console.log(result)
  }
}

module.exports = EmailService
