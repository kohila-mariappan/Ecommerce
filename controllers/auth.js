const User = require('../models/userSchema')
const Product = require('../models/productSchema')
const Category = require('../models/productCategoryShema')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {

    try {
        const {name, email, password } = req.body;
        
        if (!(email && password && name )) {
            res.status(400).send("All input is required");
        }
        
        const oldUser = await User.findOne({ email });
        
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        
        const salt = await bcrypt.genSalt(12)
        console.log('salt',salt)

        encryptedPassword = await bcrypt.hash(password, salt);
        
        const user = await User.create({
            name,
            email: email.toLowerCase(), 
            password: encryptedPassword,
        });
        const userRegister = await user.save()
        res.status(201).json({
            message : "User Registered Successfully",
            userRegister});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    }
};
  
const userLogin = async (req, res) => {
    try{
        if(req.body && req.body.email && req.body.password){
        const{email,password} = req.body;
        console.log('user mail',email)

        const user = await User.find({ email:email })
        console.log(user)

        if (user.length < 1) {
            return res.status(401).json({
                message: "Auth failed: User not found,Please sign up",
            });
        }

            if (user && (await bcrypt.compare(password, user[0].password))){
            const token = jwt.sign(
                {
                    userId: user[0]._id,
                    email: user[0].email,
                    name: user[0].name,
                    phone_number: user[0].phone_number,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "3h",
                }
                );
                console.log(user[0])
                 return res.status(200).json({
                    message: "Auth successful",
                    userDetails: {
                        userId: user[0]._id,
                        name: user[0].name,
                        email: user[0].email,
                        phone_number: user[0].phone_number,
                    },
                    token: token,
                });
            }
            res.status(401).json({
                message: "Auth failed: Incorrect email or pasword",
            });
        }
        else{
            res.status(400).json({
                message: "Enter mail and password",
            });
        }
    }
		catch(err)  {
			res.status(500).json({
				error: err,
			});
		};
}

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
            res.status(201).json({
                message :" add a new category successfully",
                newCategory
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: err,
        });
    }

    // console.log('poduct',productName)
    // let findCategory = await Category.findOne({categoryName : productName})
    // console.log('find category',findCategory)
    // return findCategory
}
let listCategory = async (req,res)=>{
    let categoryList = await Category.find()
    console.log('category list',categoryList)
    res.send(categoryList)
}

// const categoryNames = {
//         "electronics" : 
//         {"mobile": ["samsung","redmi"],"laptop" : ["Dell","mac"],"headphone" : ["boat","redmi"]},
   
//     "books" :{"children" : ["stories","novels"],"Acadamic" : ["upsc","group1"]},
    
//     "kitchan & home" : 
//         {"kitchen & appliances" : [ "cookware","dinner ware"],"home textiles" : ["curtains","carpet"]}
//     }

//console.log("welcome",categoryNames.books.children)


  
  





  module.exports = {
    userRegister,
    userLogin,
    addProduct,
    addCategory,
    listCategory,
  }