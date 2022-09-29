const express = require('express');
const router = express.Router();
const productCategory = require('../controllers/category')

router.post('/add',productCategory.addCategory)
router.get('/list',productCategory.listCategory)
router.post('/update',productCategory.updateCategory)
router.post('/delete',productCategory.deleteCategory)
router.get('/view',productCategory.viewCategory)


module.exports = router