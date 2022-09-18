const User = require('../models/userSchema')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const tokenSchema = require('../models/tokenSchema')
const statusCode = require('../utils/statusCode')

const userRegister = async (req, res) => {

    try {
        const {name, email, password } = req.body;
        
        if (!(email && password && name )) {
            let message = "All input is required";
            statusCode.badRequestResponse(res,message)
        }
        
        const oldUser = await User.findOne({ email });
        
        if (oldUser) {
            let message = "User Already Exist. Please Login";
            statusCode.dataResponse(res,message)
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
        let message = "Successfully Registered"
        statusCode.successResponseWithData(res,message,userRegister)
    } catch (err) {
        let message = err
        statusCode.errorResponse(res,message)
    }
};

const userLogin = async (req, res) => {
    try{
        const{email,password} = req.body;
        console.log('user mail',email)

        const user = await User.find({ email:email })
        console.log(user)

        if (user.length < 1) {
            let message = "Auth failed: User not found,Please sign up"
            statusCode.authorisationErrorReponse(res,message)
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
                const userToken = await tokenSchema.create({
                    userId : user._id,
                    token : token
                    
                });
                const userTokens = await userToken.save()
                console.log('user',userTokens)
                let data = {
                    userDetails: {
                    userId: user[0]._id,
                    name: user[0].name,
                    email: user[0].email,
                    phone_number: user[0].phone_number
                },
                token: token,
            }
            let mesage  = "Successfully logged in"
            console.log('data',data)
            statusCode.successResponseWithData(res,mesage,data)
            }
           
            let message = "Auth failed: Incorrect email or pasword";
            statusCode.authorisationErrorReponse(res,message)
       
    }
		catch(err)  {
			let message = err
            statusCode.errorResponse(res,message)
		};
}
let passwordlink = async (req,res) =>{
    try {
        const {email} = req.body

        const user = await User.findOne({ email: email });
        if (!user){
            let message = " user with given email doesn't exist /n " + user
            statusCode.badRequestResponse(res,message)
        }
        else{
            const link = `${process.env.BASE_URL}/password-reset/${user._id}`;
            console.log('link',link)
            await sendEmail(user.email, "Password-reset", link);
            let message = "password reset link sent to your email account";
            statusCode.successResponse(res,message)
            }
    
         } catch (error) {
            let message = " Enter proper mail id"
            statusCode.errorResponse(res,msg)
        }
}
let passwordReset = async (req, res) => {
    try {
        const {userId,newPassword} = req.body

        const user = await User.findById(userId);
        if (!user) {
            let message = "invalid link or expired"
            statusCode.badRequestResponse(res,message)
        }

        const salt = await bcrypt.genSalt(12)
        console.log('salt',salt)

        encryptedPassword = await bcrypt.hash(newPassword, salt);
        user.password = encryptedPassword;
        await user.save();
        let message = "password reset sucessfully."
        statusCode.successResponse(res,message);
    } catch (error) {
        let message = "user id is not valid"
        statusCode.errorResponse(re,message)
    }
};

module.exports = {userRegister,passwordlink,userLogin,passwordReset} 