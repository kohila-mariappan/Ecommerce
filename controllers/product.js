const Product = require('../models/productSchema')
const statusCode = require('../utils/statusCode')
const Category = require('../models/productCategoryShema')

const addProduct = async(req, res) =>{
    try{
      console.log('enter the product')
        const {productName, productBrand, productPrice,productType,categoryName} = req.body;
        console.log(req.body)
        //findUser = await User.findOne({name : createdUser})
        findCategory = await Category.findOne({categoryName : categoryName})
        console.log('finduser',findCategory)
        if((findCategory)  != null){          
            const product = await Product.create({
                productName,
                productBrand,
                productPrice,
                categoryName :findCategory.categoryName,
                productType,
                categoryId:findCategory._id
            });
            console.log(product)
            const productDetails = await product.save()
            let message = "product added successfully"
            statusCode.successResponseWithData(res,message,productDetails)
        }
         else{
        res.status(401).json({
            message: "invalid username or category name",
        });
    }
    }catch(err){
      let message = "enter poduct name and details"
        statusCode.errorResponse(res,message)
    }
}

let listProduct = async (req,res)=>{
  // let productList = await Product.find()
  //   console.log('category list',productList)
  //   let message = "category was listed"
  //   statusCode.successResponseWithData(res,message,productList)
  // router.get('/products/:page', function(req, res, next) {
    let pageNo = parseInt(req.query.pageNo)
    let size = parseInt(req.query.size)
    Product
        .find({})
        .skip(size * (pageNo - 1))
        .limit(size)
        .exec(function(err, products) {
            Product.count().exec(function(err, count) {
                if (err) return next(err)
                else{
                  let data =  {
                    // products: products,
                    // current: size,
                    // pages: Math.ceil(count / pageNo)
                    pages:count
                }
                let message = "product list"
                statusCode.successResponseWithData(res,message,data)
              }
            })
        
})




    
}

let updateProduct = async (req,res)=>{
  const {productId,productName,productBrand,productPrice,productType,categoryName} = req.body
  let findProduct = await Product.findById(productId)
  console.log('findproduct',findProduct)
  if(!findProduct){
    let message = 'product is not available'
    statusCode.badRequestResponse(res,message)
  }
  else{
    findProduct.productName = productName
    findProduct.productBrand = productBrand
    findProduct.productPrice = productPrice
    findProduct.productType = productType
    findProduct.categoryName = categoryName

  let updateProduct = await findProduct.save()
  let message = 'product name updated successfully'
  statusCode.successResponseWithData(res,message,updateProduct)
}
}

let deleteProduct = async (req,res)=>{
  const {productId} = req.body
  let findProduct = await Product.findById(productId)
  if(!findProduct){
      let message = "category and categoryId is not available";
      statusCode.badRequestResponse(res,message)
  }
  else{
      await Product.deleteOne(findProduct)
      let message = "Product was deleted successfully"
      statusCode.successResponseWithData(res,message)

  }


}

let viewProduct = async (req,res) =>{
  try{
    console.log(req.query)
      const productId = req.query.productId
      const productData = await Product.find()
      console.log('productData',productData)
      
      const findData = await productData.filter(product => product._id == productId );      
      console.log('findData',findData)

      let message = "product result"
      statusCode.successResponseWithData(res,message,findData)
    
  }catch(err){
    let message = " request data is not available "
    statusCode.errorResponse(res,message)
  }
  

}












let uploadCsv = async (req, res) => {
    let  productDetails = []

    //console.log('req',req.file.path)
    //let upload = await uploads.single('csvFile')
    //let response = csv().formFile(req.file.path)
    csv()
      .fromFile("bulkProduct.csv")
      .then((response) => {
        console.log('reponse',response)
        for (let x = 0; x < response; x++) {
                let oneRow = {
                    productName: source[i]['productName'],
                    productDesc: source[i]['productDesc'],
                    productPrice: source[i]['productPrice'],
                    createdUser: source[i]['createdUser'],
                    categoryId:source[i]['categoryId']
                };
                productDetails.push(oneRow);
            
        }
        console.log('product',productDetails)
        const productCsv = Product.insertMany(productDetails, (err, data) => {
            console.log('productCsv',productCsv)
          if (err) {
            console.log(err)
          } else {
            res.send(productCsv)             
          }
        })
    })
      
  }
module.exports =  {addProduct,uploadCsv,listProduct,updateProduct,deleteProduct,viewProduct}