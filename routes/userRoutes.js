const express = require('express')
const router = express.Router()
const user = require('../controllers/user')
const validation = require('../middlewares/checkAuth')

router.post('/signUp', user.userRegister)
router.post('/login', user.userLogin)
router.post('/password/reset', [validation.verifyToken], user.passwordlink)
router.post('/password-reset', [validation.verifyToken], user.passwordReset)

module.exports = router
