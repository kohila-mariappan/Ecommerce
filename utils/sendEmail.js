const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, text) => {
  try {
    console.log(process.env.USER, process.env.PASS, email)
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 8082,
      secure: true,
      auth: {
        user: 'kohilaecommerce@gmail.com',
        pass: 'kfokpvnqoiakcznp'
      }
    })

    await transporter.sendMail({
      from: 'kohilaecommerce@gmail.com',
      to: email,
      subject,
      text
    })

    console.log('email sent sucessfully')
  } catch (error) {
    console.log(error, 'email not sent')
  }
}

module.exports = sendEmail
