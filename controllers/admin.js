const Admin = require('../models/adminSchema')
const bcrypt = require('bcrypt')
const sendEmail = require('../utils/sendEmail')
const statusCode = require('../utils/statusCode')
const tokenSchema = require('../models/tokenSchema')

const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!(email && password && name)) {
      const message = 'All input is required'
      statusCode.badRequestResponse(res, message)
    }

    const oldAdminUser = await Admin.findOne({ email })

    if (oldAdminUser) {
      const message = 'User Already Exist. Please Login'
      statusCode.dataResponse(res, message)
    } else {
      const salt = await bcrypt.genSalt(12)

      const encryptedPassword = await bcrypt.hash(password, salt)

      const adminUser = await Admin.create({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        phone: req.body.phone,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        address: req.body.address
      })
      await adminUser.save()
      const message = 'Successfully Registered'
      statusCode.successResponse(res, message)
    }
  } catch (err) {
    const message = 'invalid details'
    statusCode.errorResponse(res, message)
  }
}

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    const adminUser = await Admin.find({ email })

    if (adminUser.length < 1) {
      const message = 'Auth failed: User not found,Please sign up'
      statusCode.authorisationErrorReponse(res, message)
    } else {
      if (adminUser && (await bcrypt.compare(password, adminUser[0].password))) {
        // token generation
        // eslint-disable-next-line no-undef
        const token = jwt.sign(
          {
            userId: adminUser[0]._id
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '3h'
          }
        )
        console.log('token', token)
        const userToken = await tokenSchema.create({
          userId: adminUser._id,
          token

        })
        await userToken.save()
        // console.log('user',userTokens)
        const data = {
          userDetails: {
            userId: adminUser[0]._id,
            name: adminUser[0].name,
            email: adminUser[0].email,
            phone_number: adminUser[0].phone_number
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

    const adminUser = await Admin.findOne({ email })
    if (!adminUser) {
      const message = " user with given email doesn't exist /n " + adminUser
      console.log(message, 'message')
      statusCode.badRequestResponse(res, message)
    } else {
      const link = `${process.env.BASE_URL}/${adminUser._id}`
      console.log('link', link)
      await sendEmail(adminUser.email, 'Password-reset', link)
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
    const { adminId, newPassword } = req.body

    const adminUser = await Admin.findById(adminId)
    console.log('user', adminUser)
    if (!adminUser) {
      const message = 'invalid link or expired'
      statusCode.badRequestResponse(res, message)
    } else {
      const salt = await bcrypt.genSalt(12)
      console.log('salt', salt)
      const encryptedPassword = await bcrypt.hash(newPassword, salt)
      console.log('encryptedPassword', encryptedPassword)
      adminUser.password = encryptedPassword
      // eslint-disable-next-line no-undef
      newPwd = await adminUser.save()
      const message = 'password reset sucessfully.'
      statusCode.successResponse(res, message)
    }
  } catch (error) {
    const message = 'user id is not valid'
    statusCode.errorResponse(res, message)
  }
}

module.exports = { adminRegister, adminLogin, passwordlink, passwordReset }
