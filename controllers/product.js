const Product = require('../models/productSchema')
const statusCode = require('../utils/statusCode')
const Category = require('../models/productCategoryShema')
const ProductType = require('../models/productTypeSchema')
const Brand = require('../models/brandSchema')
const addProduct = async (req, res) => {
  try {
    console.log('enter the product')
    const { productName, brandId, productTypeId, categoryId } = req.body
    console.log(req.body)
    // findUser = await User.findOne({name : createdUser})
    const category = await Category.findById({ _id: categoryId })
    console.log('finduser', category)

    if ((category) != null) {
      const product = await Product.create({
        productName,
        brandId,
        productTypeId,
        categoryId
      })
      console.log(product)
      await product.save()
      const brandDetail = await Brand.findById(brandId)
      const productType = await ProductType.findById(productTypeId)

      const data = {
        category: Category.categoryName,
        productType: productType.productTypeName,
        productNmae: productName,
        brand: brandDetail

      }
      console.log(data)
      const message = 'product added successfully'
      statusCode.successResponseWithData(res, message, data)
    } else {
      res.status(401).json({
        message: 'invalid username or category name'
      })
    }
  } catch (err) {
    const message = 'enter poduct name and details'
    statusCode.errorResponse(res, message)
  }
}

const listProduct = async (_req, res) => {
  // let productList = await Product.find()
  //   console.log('category list',productList)
  //   let message = "category was listed"
  //   statusCode.successResponseWithData(res,message,productList)
  // router.get('/products/:page', function(req, res, next) {
  const pageNo = 1
  const size = 10
  Product
    .find({})
    .skip(size * (pageNo - 1))
    .limit(size)
    .exec(function (_err, products) {
      Product.count().exec(function (err, count) {
        // eslint-disable-next-line no-undef
        if (err) return next(err)
        else {
          const data = {
            products,
            // current: size,
            // pages: Math.ceil(count / pageNo)
            pages: count
          }
          const message = 'product list'
          statusCode.successResponseWithData(res, message, data)
        }
      })
    })
}

const updateProduct = async (req, res) => {
  const { productId, productName, productBrand, productPrice, productType, categoryName } = req.body
  const findProduct = await Product.findById(productId)
  console.log('findproduct', findProduct)
  if (!findProduct) {
    const message = 'product is not available'
    statusCode.badRequestResponse(res, message)
  } else {
    findProduct.productName = productName
    findProduct.productBrand = productBrand
    findProduct.productPrice = productPrice
    findProduct.productTypeId = productType
    findProduct.categoryName = categoryName

    const updateProduct = await findProduct.save()
    const message = 'product name updated successfully'
    statusCode.successResponseWithData(res, message, updateProduct)
  }
}

const deleteProduct = async (req, res) => {
  const { productId } = req.body
  const findProduct = await Product.findById(productId)
  if (!findProduct) {
    const message = 'category and categoryId is not available'
    statusCode.badRequestResponse(res, message)
  } else {
    await Product.deleteOne(findProduct)
    const message = 'Product was deleted successfully'
    statusCode.successResponseWithData(res, message)
  }
}

const viewProduct = async (req, res) => {
  try {
    console.log(req.query)
    const productId = req.query.productId
    const productData = await Product.find()
    console.log('productData', productData)

    const findData = await productData.filter(product => product._id === productId)
    console.log('findData', findData)

    const message = 'product result'
    statusCode.successResponseWithData(res, message, findData)
  } catch (err) {
    const message = ' request data is not available '
    statusCode.errorResponse(res, message)
  }
}

const uploadCsv = async (_req, res) => {
  const productDetails = []

  // console.log('req',req.file.path)
  // let upload = await uploads.single('csvFile')
  // let response = csv().formFile(req.file.path)
  // eslint-disable-next-line no-undef
  csv()
    .fromFile('bulkProduct.csv')
    .then((response) => {
      console.log('reponse', response)
      for (let x = 0; x < response; x++) {
        const oneRow = {
          productName: response[x].productName,
          productDesc: response[x].productDesc,
          productPrice: response[x].productPrice,
          createdUser: response[x].createdUser,
          categoryId: response[x].categoryId
        }
        productDetails.push(oneRow)
      }
      console.log('product', productDetails)
      const productCsv = Product.insertMany(productDetails, (err, _data) => {
        console.log('productCsv', productCsv)
        if (err) {
          console.log(err)
        } else {
          res.send(productCsv)
        }
      })
    })
}
module.exports = { addProduct, uploadCsv, listProduct, updateProduct, deleteProduct, viewProduct }
