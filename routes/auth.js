const express = require('express');
//const checkAuth = require('../Middleware/checkAuth.middleware');
const userControllers = require('../controllers/auth');
const router = express.Router();

router.post('/register', userControllers.userRegister);
router.post('/login',userControllers.userLogin)
router.post('/product/add',userControllers.addProduct)
router.post('/category/add',userControllers.addCategory)
router.get('/category/list',userControllers.listCategory)
router.post('/password/reset',userControllers.passwordlink)
// router.post('/login', userControllers.userLogin);
// router.get('/me', checkAuth, userControllers.getMe);

module.exports = router






