const mongoose = require('mongoose')
const  productSchema = new mongoose.Schema({
    productName: {
      type: String,
      required: true,
      max: 200
    },                 
    productDesc: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    createdUser:{ 
      type: String,
      required: true,
    },
  },{timestamps: true});
module.exports = mongoose.model('Product',productSchema)