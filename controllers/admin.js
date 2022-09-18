const Admin = require('../models/adminSchema')
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const statusCode = require ('../utils/statusCode')
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

        encryptedPassword = await bcrypt.hash(password, salt);
        
        const admin = await Admin.create({
            name,
            email: email.toLowerCase(), 
            password: encryptedPassword,
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

        const user = await User.findOne({ email: email });
            if (!user){
                let message = "user with given email doesn't exist" + user
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
            statusCode.errorResponse(res,error)
        }
}
let passwordReset = async (req, res) => {
    try {
        const {userId,newPassword} = req.body

        const user = await User.findById(userId);
        if (!user)
        {
            let message = "invalid link or expired"
            statusCode.badRequestResponse(res,message)
        }
        else{

        const salt = await bcrypt.genSalt(12)
        console.log('salt',salt)

        encryptedPassword = await bcrypt.hash(newPassword, salt);
        user.password = encryptedPassword;
        await user.save();
        let message = "password reset sucessfully."
        statusCode.successResponse(res,message)
        }
    } catch (error) {
        statusCode.errorResponse(res,error)
    }
};


module.exports = {adminRegister,adminLogin,passwordlink,passwordReset} 