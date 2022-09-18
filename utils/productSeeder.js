const mongoose = require('mongoose')
const product = require('../models/productSchema')

let seederProducts = [
    {
        productName : "novel",
        productPrice: 150,
        categoryName:"books" ,
        categoryId  : "SKU3"
    },
    {
        productName : "Mobile",
        productPrice: 15000,
        categoryName:"electronics",
        categoryId  : "SKU1"
    },
    {
        productName : "laptop",
        productPrice: 150000,
        categoryName:"electronics",
        categoryId  : "SKU1"
    },
    {
        productName : "dinnerware",
        productPrice: 1500,
        categoryName:"kitchen things",
        categoryId  : "SKU2"
    },
    {
        productName : "cookware",
        productPrice: 1500,
        categoryName:"kitchen things",
        categoryId  : "SKU2"
    }
]

const seedDb = async ()=>{
    await product.deleteMany({});
    await product.insertMany(seederProducts)
}
seedDb().then(()=>{
    mongoose.connection.close()
})



module.exports = seederProducts