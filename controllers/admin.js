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
        
        const oldAdmin = await Admin.findOne({ email });
        
        if (oldAdmin) {
            let message = "User Already Exist. Please Login"
            statusCode.dataResponse(res,message)
        }
        
        const salt = await bcrypt.genSalt(12)
        console.log('salt',salt)

        let encryptedPassword = await bcrypt.hash(password, salt);
        
        const admin = await Admin.create({
            name,
            email: email.toLowerCase(), 
            password: encryptedPassword

        });
        const adminRegister = await admin.save()
        let message = "Admin Registered Successfully"
        statusCode.successResponse(res,message,adminRegister)
        } catch (err) {
        console.log(err);
        let message = "Error Message";
        statusCode.errorResponse(res,message)
    }
};

const adminLogin = async (req, res) => {
    try{
        const{email,password} = req.body;
        console.log('user mail',email)

        const admin = await Admin.find({ email:email })
        console.log(admin)

        if (admin.length < 1) {
            let message = "Auth failed: User not found,Please sign up";
            statusCode.authorisationErrorReponse(res,message)
        }

            if (admin && (await bcrypt.compare(password, admin[0].password))){
            const token = jwt.sign(
                {
                    adminId: admin[0]._id,
                    email: admin[0].email,
                    name: admin[0].name,
                    phone_number: admin[0].phone_number,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "3h",
                }
                );
                console.log(user[0])
                let message =  "Admin Auth successful"
                let adminData ={
                    adminDetails: {
                        adminId: admin[0]._id,
                        name: admin[0].name,
                        email: admin[0].email,
                        phone_number: admin[0].phone_number,
                    },
                    token: token
                }  
                statusCode.successResponseWithData(res,message,adminData) 
            }
           else{
            let message = "Auth failed: Incorrect email or pasword"
            statusCode.authorisationErrorReponse(re,message)

           }
            
    }
		catch(err)  {
            let message = "Error Message "
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