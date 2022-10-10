const mongoose = require('mongoose');
const  productTypeSchema = new mongoose.Schema({
    productTypeName :{
        type : String,
        required :true
    },
    productBrandId :[String]

    
    
  },{timestamps: true});




module.exports = mongoose.model('ProductType',productTypeSchema)