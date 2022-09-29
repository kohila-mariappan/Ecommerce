const express = require('express');
const router = express.Router();
const product = require('../controllers/product')


router.post('/add',product.addProduct)
router.get('/list',product.listProduct)
router.post('/update',product.updateProduct)
router.post('/delete',product.deleteProduct)
router.get('/view',product.viewProduct)



module.exports = router