const Admin = require('../models/adminSchema')
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const statusCode = require ('../utils/statusCode')
const tokenSchema = require('../models/tokenSchema')

const adminRegister = async (req, res) => {

    try {
        const {name, email, password } = req.body;
        
        if (!(email && password && name )) {
            let message = "All input is required";
            statusCode.badRequestResponse(res,message)
        }
        
        const oldAdminUser = await Admin.findOne({ email });
        
        if (oldAdminUser) {
            let message = "User Already Exist. Please Login";
            statusCode.dataResponse(res,message)
        }
        else{
            const salt = await bcrypt.genSalt(12)

            let encryptedPassword = await bcrypt.hash(password, salt);
        
        const adminUser = await Admin.create({
            name,
            email: email.toLowerCase(), 
            password: encryptedPassword,
            phone :req.body.phone,
            city : req.body.city,
            state : req.body.state,
            country:req.body.country,
            address :req.body.address
        });
        await adminUser.save()
        let message = "Successfully Registered"
        statusCode.successResponse(res,message)

        }
        
        
    } catch (err) {
        let message = 'invalid details'
        statusCode.errorResponse(res,message)
    }
};

const adminLogin = async (req, res) => {
    try{
        const{email,password} = req.body;

        const adminUser = await Admin.find({ email:email })

        if (adminUser.length < 1) {
            let message = "Auth failed: User not found,Please sign up"
            statusCode.authorisationErrorReponse(res,message)
        }
        else{
            if (adminUser && (await bcrypt.compare(password, adminUser[0].password))){
                //token generation
            const token = jwt.sign(
                {
                    userId: adminUser[0]._id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "3h",
                }
                );
                console.log('token',token)
                const userToken = await tokenSchema.create({
                    userId : user._id,
                    token : token
                    
                });
                await userToken.save()
                //console.log('user',userTokens)
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
            //console.log('data',data)
            statusCode.successResponseWithData(res,mesage,data)
            }
            else{
                let message = 'username or password was incorrect'
                statusCode.authorisationErrorReponse(res,message)
            }
        }
       
    }
		catch(err)  {
			let message = 'Auth failed: Incorrect email or pasword'
            statusCode.errorResponse(res,message)
		};
}

let passwordlink = async (req,res) =>{
    try {
        const {email} = req.body

        const adminUser = await Admin.findOne({ email: email });
        if (!adminUser){
            let message = " user with given email doesn't exist /n " + adminUser
            console.log(message,"message")
            statusCode.badRequestResponse(res,message)
        }
        else{
            const link = `${process.env.BASE_URL}/${user._id}`;
            console.log('link',link)
            await sendEmail(adminUser.email, "Password-reset", link);
            let message = "password reset link sent to your email account";
            statusCode.successResponse(res,message)
            }
    
         } catch (error) {
            let message = " Enter proper mail id"
            statusCode.errorResponse(res,message)
        }
}
let passwordReset = async (req, res) => {
    try {
        console.log(req.body)
        const {adminId,newPassword} = req.body

        const adminUser = await Admin.findById(adminId);
        console.log('user',adminUser)
        if (!adminUser) {
            let message = "invalid link or expired"
            statusCode.badRequestResponse(res,message)
        }
        else{
            const salt = await bcrypt.genSalt(12)
            console.log('salt',salt)
            const encryptedPassword = await bcrypt.hash(newPassword, salt);
            console.log('encryptedPassword',encryptedPassword)
            adminUser.password = encryptedPassword;
            newPwd = await adminUser.save()
            let message = "password reset sucessfully."
            statusCode.successResponse(res,message);
        }
    } catch (error) {
        let message = "user id is not valid"
        statusCode.errorResponse(res,message)
    }
};


module.exports = {adminRegister,adminLogin,passwordlink,passwordReset} 