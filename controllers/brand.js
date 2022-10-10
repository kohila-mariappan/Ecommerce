const statusCode = require('../utils/statusCode')
const Brand = require('../models/brandSchema')



let addBrand = async (req,res) =>{
    try{
      console.log('enter the product')
        const {brandName, price,skuName,storage,color,ram,model,brandId} = req.body;
        const brand = await Brand.create({
              brandName : brandName,
              price: price,
              skuName: skuName,
              storage:storage,
              color:color,
              ram:ram,
              model:model,
              brandId:brandId
            });
            console.log('brand',brand)
            const brandDetails = await brand.save()
            console.log('brandDetails',brandDetails)

            let message = "brand added successfully"
            statusCode.successResponseWithData(res,message,brandDetails)
       
    }catch(err){
      let message = "enter poduct name and details"
        statusCode.errorResponse(res,message)
    }
  
  }

  let brandList = async (req,res) =>{
    let brandtList = await Brand.find()
    console.log('brandtList',brandtList)
    let message = "brandtList"
    statusCode.successResponseWithData(res,message,brandtList)
  }


module.exports = {addBrand,brandList}