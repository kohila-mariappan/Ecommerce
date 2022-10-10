const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const app = express()

const adminRoutes = require('./adminRoutes')
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const productCategoryRoutes = require('./productCategoryRoutes')


app.use('/admin',adminRoutes)
app.use('/user',userRoutes)
app.use('/product',[checkAuth.verifyToken],productRoutes)
app.use('/productCategory',[checkAuth.verifyToken],productCategoryRoutes)






module.exports = app






