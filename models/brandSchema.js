const mongoose = require('mongoose')
const brandSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: true
  },
  brandId: {
    type: String
  },
  skuName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  storage: {
    type: String,
    required: true
  },
  ram: {
    type: String
  },
  color: {
    type: String
  },
  model: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Brand', brandSchema)
