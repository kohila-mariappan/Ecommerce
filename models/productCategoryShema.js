const mongoose = require('mongoose')
const productCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  skuId: {
    type: String
  }

}, { timestamps: true }
)

module.exports = mongoose.model('Category', productCategorySchema)
