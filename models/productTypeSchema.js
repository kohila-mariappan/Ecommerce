const mongoose = require('mongoose');
const { serializeInteger } = require('whatwg-url');
const  productTypeSchema = new mongoose.Schema({
    productType :{
        type : String,
        required :true
    },
    productPrice :{
        type : Integer
    },
    productSku :{
        type : String
    },
    productBrand :{
        type:String
    }

    
    
  },{timestamps: true});




module.exports = mongoose.model('ProductType',productTypeSchema)