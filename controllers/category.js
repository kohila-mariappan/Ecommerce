const Category = require('../models/productCategoryShema')
const statusCode = require('../utils/statusCode')
let addCategory = async (req,res) =>{
    try{
        if(req.body && req.body.categoryName && req.body.skuId){
            const {categoryName,skuId} = req.body
            const category = await Category.create({
                categoryName,
                skuId
            });
            const newCategory = await category.save()
            console.log('new category',newCategory)
            let message = 'new category was added'
            statusCode.successResponseWithData(res,message,newCategory)
        }
        else{
            let message = "all inputs are required"
            statusCode.badRequestResponse(res,message)

        }
    }
    catch(err){
        statusCode.errorResponse(res,err)
    }
}

let listCategory = async (req,res)=>{
    let pageNo = 1
    let size = 10  
      Category
          .find({})
          .skip(size * (pageNo - 1))
          .limit(size)
          .exec(function(err, category) {
              Category.count().exec(function(err, count) {
                  if (err) return next(err)
                  //else{
                    let data =  {
                      category: category,
                      //current: size,
                      pages: Math.ceil(count / pageNo)
                  }
                  let message = "category list"
                  statusCode.successResponseWithData(res,message,data)
                //}
              })
          
  })
}
  

let updateCategory = async (req,res)=>{
    const {categoryId,categoryName} = req.body;
    let findCategory = await Category.findById(categoryId)
    console.log('findCategory',findCategory)
    if(!findCategory){
        let message = "category and categoryId is not available";
        statusCode.badRequestResponse(res,message)
    }
    else{
        findCategory.categoryName = categoryName
        let newCategory = await findCategory.save()
        console.log('newCategory',newCategory)

        let message = "category updated successfully"
        statusCode.successResponseWithData(res,message,findCategory)


    }

}
let deleteCategory = async (req,res)=>{
    const {categoryId} = req.body
    let findCategory = await Category.findById(categoryId)
    if(!findCategory){
        let message = "category and categoryId is not available";
        statusCode.badRequestResponse(res,message)
    }
    else{
        await Category.deleteOne(findCategory)
        let message = "Category was deleted successfully"
        statusCode.successResponseWithData(res,message)
    }


}

let viewCategory = async (req,res) =>{
    try{
        console.log(req.query)
        const categoryId = req.query.categoryId
        const categoryData = await Category.find()
        console.log('categoryData',categoryData)
            
        const findData = await categoryData.filter(category => category._id == categoryId );      
        console.log('findData',findData)
      
        let message = "Category result"
        statusCode.successResponseWithData(res,message,findData)
          
        }catch(err){
          let message = " request data is not available "
          statusCode.errorResponse(res,message)
        }
        
      
      
}


module.exports = {addCategory,listCategory,updateCategory,deleteCategory,viewCategory}