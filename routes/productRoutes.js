const express = require('express');
const router = express.Router();
const product = require('../controllers/product')
const brand = require('../controllers/brand')
const protectType = require('../controllers/productType')


router.post('/add',product.addProduct)
router.get('/list',product.listProduct)
router.post('/update',product.updateProduct)
router.post('/delete',product.deleteProduct)
router.get('/view',product.viewProduct)

router.post('/brand',brand.addBrand)
router.get('/brandList',brand.brandList)

router.get('/productTypeDetails',protectType.productTypeDetails)

router.get('/search',protectType.searchProduct)



module.exports = router