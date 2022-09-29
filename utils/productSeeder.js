const mongoose = require('mongoose')
const productType = require('../models/productTypeSchema')

let seederProducts = [
    {
        productType : "Mobile" [
            {

            }
        ],
        productType : "Laptop"[
                    {
                        brandtName :"Dell"[
                            {
                                productName : ['inspiron','XPS 13']

                            }
                        ],
                        brandName:"lenovo"[
                            {
                                productName:['Pavilion','Ryzen']
                            }
                        ]
                    }
                ]
            
        ,
        productType : [
                   

                ],
                productType : [
                    
                ]
            
        
    },
]


    

const seedDb = async ()=>{
    await product.deleteMany({});
    await product.insertMany(seederProducts)
}
seedDb().then(()=>{
    mongoose.connection.close()
})



module.exports = seederProducts