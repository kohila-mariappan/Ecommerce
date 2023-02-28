const Category = require('../models/productCategoryShema')
const statusCode = require('../utils/statusCode')
const addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body
    const findCategory = await Category.findOne(categoryName)
    if (findCategory) {
      const message = 'category is available so go to add products'
      statusCode.successResponse(res, message)
    } else {
      const category = await Category.create({
        categoryName
      })
      const newCategory = await category.save()
      console.log('new category', newCategory)
      const message = 'new category was added'
      statusCode.successResponseWithData(res, message, newCategory)
    }
  } catch (err) {
    statusCode.errorResponse(res, err)
  }
}

const listCategory = async (_req, res) => {
  const pageNo = 1
  const size = 10
  Category
    .find({})
    .skip(size * (pageNo - 1))
    .limit(size)
    .exec(function (_err, category) {
      Category.count().exec(function (err, count) {
        // eslint-disable-next-line no-undef
        if (err) return next(err)
        // else{
        const data = {
          category,
          // current: size,
          pages: Math.ceil(count / pageNo)
        }
        const message = 'category list'
        statusCode.successResponseWithData(res, message, data)
        // }
      })
    })
}

const updateCategory = async (req, res) => {
  const { categoryId, categoryName } = req.body
  const findCategory = await Category.findById(categoryId)
  console.log('findCategory', findCategory)
  if (!findCategory) {
    const message = 'category and categoryId is not available'
    statusCode.badRequestResponse(res, message)
  } else {
    findCategory.categoryName = categoryName
    const newCategory = await findCategory.save()
    console.log('newCategory', newCategory)

    const message = 'category updated successfully'
    statusCode.successResponseWithData(res, message, findCategory)
  }
}
const deleteCategory = async (req, res) => {
  const { categoryId } = req.body
  const findCategory = await Category.findById(categoryId)
  if (!findCategory) {
    const message = 'category and categoryId is not available'
    statusCode.badRequestResponse(res, message)
  } else {
    await Category.deleteOne(findCategory)
    const message = 'Category was deleted successfully'
    statusCode.successResponseWithData(res, message)
  }
}

const viewCategory = async (req, res) => {
  try {
    console.log(req.query)
    const categoryId = req.query.categoryId
    const categoryData = await Category.find()
    console.log('categoryData', categoryData)

    const findData = await categoryData.filter(category => category._id === categoryId)
    console.log('findData', findData)

    const message = 'Category result'
    statusCode.successResponseWithData(res, message, findData)
  } catch (err) {
    const message = ' request data is not available '
    statusCode.errorResponse(res, message)
  }
}

module.exports = { addCategory, listCategory, updateCategory, deleteCategory, viewCategory }
