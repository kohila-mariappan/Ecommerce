const mongoose = require('mongoose')
const productType = require('../models/productTypeSchema')
const dotenv =  require("dotenv").config();
const db = require("../config/db")
//const brand = require('../controllers/brand')



let seederProducts = [
    {
        productTypeName : "Mobile",
        brandId :["BM1","BM2","BM3","BM4","BM5","BM6","BM7"]
        
    }
]


    

const seedDb = async ()=>{
    await db.connect();
    await productType.deleteMany({});
    await productType.insertMany(seederProducts)
}
seedDb().then(()=>{
    mongoose.connection.close()
})



module.exports = {seederProducts}