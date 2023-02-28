const User = require('../models/userSchema').default
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/sendEmail')
const tokenSchema = require('../models/tokenSchema')
const statusCode = require('../utils/statusCode')

const userRegister = async (req, res) => {
  try {
    console.log('req', req.body)
    const { name, email, password } = req.body

    if (!(email && password && name)) {
      const message = 'All input is required'
      statusCode.badRequestResponse(res, message)
    }

    const oldUser = await User.findOne({ email })

    if (oldUser) {
      const message = 'User Already Exist. Please Login'
      statusCode.dataResponse(res, message)
    } else {
      const salt = await bcrypt.genSalt(12)
      console.log('salt', salt)

      const encryptedPassword = await bcrypt.hash(password, salt)

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        phone: req.body.phone,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        address: req.body.address
      })
      const userRegister = await user.save()
      const message = 'Successfully Registered'
      statusCode.successResponseWithData(res, message, userRegister)
    }
  } catch (err) {
    const message = 'invalid details'
    statusCode.errorResponse(res, message)
  }
}

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.find({ email })

    if (user.length < 1) {
      const message = 'Auth failed: User not found,Please sign up'
      statusCode.authorisationErrorReponse(res, message)
    } else {
      if (user && (await bcrypt.compare(password, user[0].password))) {
        // token generation
        const token = jwt.sign(
          {
            userId: user[0]._id
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '3h'
          }
        )
        console.log('token', token)
        const userToken = await tokenSchema.create({
          userId: user._id,
          token

        })
        await userToken.save()
        // console.log('user',userTokens)
        const data = {
          userDetails: {
            userId: user[0]._id,
            name: user[0].name,
            email: user[0].email,
            phone_number: user[0].phone_number
          },
          token
        }
        const mesage = 'Successfully logged in'
        // console.log('data',data)
        statusCode.successResponseWithData(res, mesage, data)
      } else {
        const message = 'username or password was incorrect'
        statusCode.authorisationErrorReponse(res, message)
      }
    }
  } catch (err) {
    const message = 'Auth failed: Incorrect email or pasword'
    statusCode.errorResponse(res, message)
  };
}
const passwordlink = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    console.log(user, 'pwd reset')
    if (!user) {
      const message = " user with given email doesn't exist /n " + user
      console.log(message, 'message')
      statusCode.badRequestResponse(res, message)
    } else {
      const link = `${process.env.BASE_URL}/${user._id}`
      console.log('link', link)
      await sendEmail(user.email, 'Password-reset', link)
      const message = 'password reset link sent to your email account'
      statusCode.successResponse(res, message)
    }
  } catch (error) {
    const message = ' Enter proper mail id'
    statusCode.errorResponse(res, message)
  }
}
const passwordReset = async (req, res) => {
  try {
    console.log(req.body)
    const { userId, newPassword } = req.body

    const user = await User.findById(userId)
    console.log('user', user)
    if (!user) {
      const message = 'invalid link or expired'
      statusCode.badRequestResponse(res, message)
    } else {
      const salt = await bcrypt.genSalt(12)
      console.log('salt', salt)
      const encryptedPassword = await bcrypt.hash(newPassword, salt)
      console.log('encryptedPassword', encryptedPassword)
      user.password = encryptedPassword
      await user.save()
      const message = 'password reset sucessfully.'
      statusCode.successResponse(res, message)
    }
  } catch (error) {
    const message = 'user id is not valid'
    statusCode.errorResponse(res, message)
  }
}

module.exports = { userRegister, passwordlink, userLogin, passwordReset }
