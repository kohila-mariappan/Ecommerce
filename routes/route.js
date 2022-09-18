const express = require('express');
const { route } = require('..');
const checkAuth = require('../middlewares/checkAuth');
const admincontrollers = require('../controllers/admin');
const userControllers = require('../controllers/user')
const router = express.Router();
const upload = require("../middlewares/upload");

router.post('/register', admincontrollers.adminRegister);
router.post('/login', admincontrollers.adminLogin);
router.post('/register',userControllers.userRegister)
router.post('/login',userControllers.userLogin)
// router.post('/product/add',controllers.addProduct)
// router.post('/category/add',controllers.addCategory)
// router.get('/category/list',controllers.listCategory)
// router.post('/password/reset',controllers.passwordlink)
// router.post('/upload/file',controllers.uploadCsv)

// router.post('/login', userControllers.userLogin);
// router.get('/me', checkAuth, userControllers.getMe);

module.exports = router






