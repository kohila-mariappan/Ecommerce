const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    max: 200
  },
  categoryName: {
    type: String
    // required: true,
  },
  brand: [{
    type: String
    // required: true,
  }],
  productTypeName: {
    type: String
    // required: true,
  },
  brandId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Brand' },
  productTypeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ProductType' },
  categoryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' }

}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
