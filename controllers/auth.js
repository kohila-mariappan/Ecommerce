const User = require('../models/userSchema')
const Product = require('../models/productSchema')
const Category = require('../models/productCategoryShema')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
 const fs = require("fs");
// const csv = require("fast-csv");
// const CsvParser = require("json2csv").Parser;
var csvFileSchema = require('../models/csvFileSchema')
var csv = require('csvtojson')



let addCategory = async (req,res) =>{
    try{
        if(req.body && req.body.categoryName && req.body.categoryId){
            const {categoryName,categoryId} = req.body
            const category = await Category.create({
                categoryName,
                categoryId
            });
            const newCategory = await category.save()
            console.log('new category',newCategory)
            res.status(200).json({
                message :" add a new category successfully",
                newCategory
            });
        }
        else{

        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: err,
        });
    }
}

let listCategory = async (req,res)=>{
    let categoryList = await Category.find()
    console.log('category list',categoryList)
    res.send(categoryList) //send json
}






// const uploadCsv = async (req, res) => {
//     try {
//       if (req.file == undefined) {
//         return res.status(400).send("Please upload a CSV file!");
//       }
  
//       let tutorials = [];
//       let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;
  
//       fs.createReadStream(path)
//         .pipe(csv.parse({ headers: true }))
//         .on("error", (error) => {
//           throw error.message;
//         })
//         .on("data", (row) => {
//           tutorials.push(row);
//         })
//         .on("end", () => {
//           Tutorial.bulkCreate(tutorials)
//             .then(() => {
//               res.status(200).send({
//                 message:
//                   "Uploaded the file successfully: " + req.file.originalname,
//               });
//             })
//             .catch((error) => {
//               res.status(500).send({
//                 message: "Fail to import data into database!",
//                 error: error.message,
//               });
//             });
//         });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         message: "Could not upload the file: " + req.file.originalname,
//       });
//     }
//   };
  
  



    
// const categoryNames = {
//         "electronics" : 
//         {"mobile": ["samsung","redmi"],"laptop" : ["Dell","mac"],"headphone" : ["boat","redmi"]},
   
//     "books" :{"children" : ["stories","novels"],"Acadamic" : ["upsc","group1"]},
    
//     "kitchan & home" : 
//         {"kitchen & appliances" : [ "cookware","dinner ware"],"home textiles" : ["curtains","carpet"]}
//     }

//console.log("welcome",categoryNames.books.children)


  
  





  module.exports = {
   
    addCategory,
    listCategory,
   
  }