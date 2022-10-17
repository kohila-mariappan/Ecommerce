const mongoose = require('mongoose')
const productType = require('../models/productTypeSchema')
const dotenv =  require("dotenv").config();
const db = require("../config/db")
//const brand = require('../controllers/brand')



let seederProducts = [
    {
        productTypeName : "Mobile",
        brandId :["63356b4762e43d36e9311101" , "63356b0d62e43d36e93110fe", "63356adb62e43d36e93110fb","63356c3402129fe304643d2c","63356c8502129fe304643d2f","63356cf302129fe304643d32","63356d3502129fe304643d35"] 
        
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