const express = require('express');
const router = express.Router();
const user = require('../controllers/user')
const checkAuth = require('../middlewares/checkAuth');

router.post('/signUp',user.userRegister)
router.post('/login',user.userLogin)
router.post('/password/reset',user.passwordlink)
router.post("password-reset/userId",user.passwordReset)


module.exports = router


