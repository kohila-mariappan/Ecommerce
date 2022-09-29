const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin')
const validation = require('../middlewares/checkAuth');



router.post('/signUp',admin.adminRegister)
router.post('/login',admin.adminLogin)
router.post('/password/reset',[validation.verifyToken],admin.passwordlink)
router.post("password-reset/userId",[validation.verifyToken],admin.passwordReset)



module.exports = router