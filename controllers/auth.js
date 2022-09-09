const User = require('../models/userSchema')
const Product = require('../models/productSchema')
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
        
        encryptedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name,
            email: email.toLowerCase(), 
            password: encryptedPassword,
        });
        const userRegister = await user.save()
        res.status(201).json(userRegister);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    }
};
  
const userLogin = async (req, res) => {
    try{
        const{email,password} = req.body;
        console.log('user mail',email)

        const user = await User.find({ email:email })
        console.log(user)

        if (user.length < 1) {
            return res.status(401).json({
                message: "Auth failed: Email not found probably",
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
                message: "Auth failed1",
            });
    }
		catch(err)  {
			res.status(500).json({
				error: err,
			});
		};
}

const addProduct = async(req, res) =>{
    try{
        const {productName, productDesc, productPrice,createdUser } = req.body;
        const product = await Product.create({
            productName,
            productDesc,
            productPrice,
            createdUser
        });
        const productDetails = await product.save()
        res.status(201).json(productDetails);

    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err,
        });
    }


}



  
  





  module.exports = {
    userRegister,
    userLogin,
    addProduct,
  }