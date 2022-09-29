const mongoose = require('mongoose')
const  productSchema = new mongoose.Schema({
    productName: {
      type: String,
      required: true,
      max: 200
    },                 
    productBrand: {
      type: String,
      //required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productType:{ 
      type: String,
      //required: true,
    },
    categoryName :{
      type : String,
      required : true,
    },
    categoryId :{
      type:String
    }
    
  },{timestamps: true});




module.exports = mongoose.model('Product',productSchema)