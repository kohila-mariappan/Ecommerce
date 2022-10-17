const Brand = require('../models/brandSchema')
const ProductType = require('../models/productTypeSchema')
const statusCode = require('../utils/statusCode')

const productTypeDetails = async (req, res) => {
  try {
    const input = req.query.productTypeId
    // console.log('input',input)
    // let productType = await ProductType.findById(input)
    if ((input) != null) {
      ProductType.findById(input)
        .populate('brandId')
        .then(brand => {
          console.log('brand list', brand)
          const message = 'product details'
          statusCode.successResponseWithData(res, message, brand)
        })
        .catch(error => {
          console.log(error)
          statusCode.errorResponse(res, error)
        })
    } else {
      const message = 'invalid productType id'
      statusCode.dataResponse(res, message)
    }
  } catch (err) {
    const message = 'Product type is not availbale'
    statusCode.errorResponse(res, message)
  }
}

const searchProduct = async (req, res) => {
  try {
    console.log('enter', req.query)
    const brand = req.query.brandName
    console.log(brand)

    const brandDetails = await Brand.find()

    // console.log('details',brandDetails)
    const brandData = []

    // eslint-disable-next-line no-undef
    for (let j = 0; j < brandDetails.length; j++) {
      console.log('1', brandDetails[j].brandName, brand)
      if (brandDetails[j].brandName === brand) {
        console.log(brandDetails[j].brandName, brand)
        const data = {
          brandName: brand,
          skuName: brandDetails[j].skuName,
          price: brandDetails[j].price,
          storage: brandDetails[j].storage,
          ram: brandDetails[j].ram,
          color: brandDetails[j].color,
          model: brandDetails[j].model
        }
        console.log('dtaa', data)
        brandData.push(data)
      } else {
        console.log('error')
        continue
      }
    }

    console.log('brand Data', brandData)
    const message = brand
    statusCode.successResponseWithData(res, message, brandData)
  } catch (err) {
    const message = 'invalid search'
    statusCode.errorResponse(res, message)
  }
}

const updateProductType = async (req, res) => {
  try {
    console.log(req.body.brandId, req.body.categoryId, req.body.productTypeName)

    // const productTypeName = req.body.productTypeName
    // const brandId = req.body.brandId
    // const productTypeId = req.body.productTypeId

    // console.log(productTypeName,productTypeId,brandId)

    const product = await ProductType.updateMany({
      productTypeName: req.body.productTypeName,
      productTypeId: req.body.productTypeId,
      brandId: req.body.brandId,
      categoryId: req.body.categoryId
    })
    console.log('product', product)

    // const productDetails = await product.save()
    const message = 'product added successfully'
    statusCode.successResponseWithData(res, message, product)
  } catch (err) {
    const message = 'error product type'
    statusCode.errorResponse(res, message)
  }
}

module.exports = { productTypeDetails, searchProduct, updateProductType }
