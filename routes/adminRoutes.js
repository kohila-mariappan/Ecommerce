const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin')
const checkAuth = require('../middlewares/checkAuth');


router.post('/signUp',admin.adminRegister)
router.post('/login',admin.adminLogin)
router.post('/password/reset',admin.passwordlink)
router.post("password-reset/userId",admin.passwordReset)



module.exports = router