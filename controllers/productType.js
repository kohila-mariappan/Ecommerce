const Brand = require('../models/brandSchema')
const ProductType = require('../models/productTypeSchema')
const statusCode = require('../utils/statusCode')


const productTypeDetails = async (req,res) =>{
    try{
        const input = req.query.productTypeName
        console.log('input',input)
        let productType = await ProductType.find()
        //const findType = await productType.filter(type => type.productTypeName == input );      
        //console.log('findType',findType.productTypeName)
        let data 
        for(i=0;i<productType.length;i++){
            if(productType[i].productTypeName == input){
                 data = productType[i]
                console.log('data',data)
            }
        }
        const brandList = data.productBrandId
        console.log('brand',brandList)

        let brandDetails = await Brand.find()
 
        console.log('details',brandDetails)        


        // const findBrand = await brandList.filter(data => data.productBrandId == brandDetails.brandId );  
        // console.log('brandDetails',findBrand)    

        let brandData = []

        for(i=0;i<brandList.length;i++){
            for(j=0;j<brandDetails.length;j++){
                if(brandList[i] == brandDetails[j].brandId){
                    let data = {
                        brandName : brandDetails[j].brandName,
                        skuName : brandDetails[j].skuName,
                        price : brandDetails[j].price,
                        storage : brandDetails[j].storage,
                        ram : brandDetails[j].ram,
                        color : brandDetails[j].color,
                        model : brandDetails[j].model
                    }
                    brandData.push(data)

                
                }
                else{
                    continue
                }


            }
            
        }
        console.log('brandData',brandData)

        let message = "product details"
        statusCode.successResponseWithData(res,message,brandData)

    }catch(err){
        let message = "Product type is not availbale"
        statusCode.errorResponse(res,message)
    }
}

let searchProduct = async (req,res) =>{
    try {
        console.log('enter',req.query)
        const brand = req.query.brandName
        console.log(brand)
            
            let brandDetails = await Brand.find()
     
            //console.log('details',brandDetails)
            let brandData = []

                for(j=0;j<brandDetails.length;j++){
                    console.log('1',brandDetails[j].brandName,brand)
                    if(brandDetails[j].brandName === brand){
                        console.log(brandDetails[j].brandName,brand)
                        let data = {
                            brandName : brand,
                            skuName : brandDetails[j].skuName,
                            price : brandDetails[j].price,
                            storage : brandDetails[j].storage,
                            ram : brandDetails[j].ram,
                            color : brandDetails[j].color,
                            model : brandDetails[j].model
                        }
                        console.log('dtaa',data)
                        brandData.push(data)
    
                    
                    }
                    else{
                        console.log('error')
                        continue
                    }
    
    
                }
                

    
            console.log('brand Data',brandData)
                let message = brand
                statusCode.successResponseWithData(res,message,brandData)


            
            
    
}catch(err){
    let message = "invalid search"
    statusCode.errorResponse(res,message)
}
   
}

module.exports = {productDetails,productTypeDetails,deleteProduct,searchProduct}