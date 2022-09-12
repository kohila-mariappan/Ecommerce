const mongoose = require('mongoose')
const productCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        max: 300
      },  
    categoryId:{
        type : String,
        required : true,
    }

},{timestamps: true}
)


module.exports = mongoose.model('Category',productCategorySchema)