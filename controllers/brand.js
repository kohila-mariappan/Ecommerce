const statusCode = require('../utils/statusCode')
const Brand = require('../models/brandSchema')

const addBrand = async (req, res) => {
  try {
    console.log('enter the product')
    const { brandName, price, skuName, storage, color, ram, model, brandId } = req.body
    const brand = await Brand.create({
      brandName,
      price,
      skuName,
      storage,
      color,
      ram,
      model,
      brandId
    })
    console.log('brand', brand)
    const brandDetails = await brand.save()
    console.log('brandDetails', brandDetails)

    const message = 'brand added successfully'
    statusCode.successResponseWithData(res, message, brandDetails)
  } catch (err) {
    const message = 'enter poduct name and details'
    statusCode.errorResponse(res, message)
  }
}

const brandList = async (req, res) => {
  const brandtList = await Brand.find()
  console.log('brandtList', brandtList)
  const message = 'brandtList'
  statusCode.successResponseWithData(res, message, brandtList)
}

module.exports = { addBrand, brandList }
