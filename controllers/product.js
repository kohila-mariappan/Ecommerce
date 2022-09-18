const Product = require('../models/productSchema')
const addProduct = async(req, res) =>{
    try{
        const {productName, productDesc, productPrice,createdUser,categoryId} = req.body;
        findUser = await User.findOne({name : createdUser})
        findCategory = await Category.findOne({categoryId : categoryId})
        console.log('finduser',findCategory)
        if((findUser&&findCategory)  != null){
            const product = await Product.create({
                productName,
                productDesc,
                productPrice,
                createdUser,
                userId : findUser._id,
                categoryId : findCategory.categoryId,
                categoryName :findCategory.categoryName
            });
            console.log(product)
            const productDetails = await product.save()
            res.status(201).json(productDetails);
        }
         else{
        res.status(401).json({
            message: "invalid username or category name",
        });
    }
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err,
        });
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
module.exports =  {addProduct,uploadCsv}