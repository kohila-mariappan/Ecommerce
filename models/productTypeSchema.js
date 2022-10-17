const mongoose = require('mongoose')
// const Category = require('./productCategoryShema')
// const Brand = require('./brandSchema')
const productTypeSchema = new mongoose.Schema({
  productTypeName: {
    type: String,
    required: true
  },
  brandId: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Brand' }],
  categoryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' }

}, { timestamps: true })

module.exports = mongoose.model('ProductType', productTypeSchema)
