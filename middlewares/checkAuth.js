const jwt = require("jsonwebtoken");
const statusCode = require('../utils/statusCode')

//const config = process.env;

const verifyToken = (req, res, next) => {
  try{
    const authtoken = req.headers["authorization"]
  //console.log('authtoken',authtoken)
  const bearerToken = authtoken.split(' ')
  const token = bearerToken[1]
 
  if (!token) {
    let message = "A token is required for authentication"
    statusCode.badRequestResponse(res,message)
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET,);
    //console.log('decoded',decoded)
    const userId = decodedToken.userId;
    
    if(req.body.userId && req.body.userId !== userId){
      throw "invalid user ID"
    }
    else{
      next();
    }
    // let message = "Token Verified"
     //statusCode.successResponseWithData(res,message,req.user)
  } catch (err) { 
    statusCode.authorisationErrorReponse(res,err)
  }

  }catch(err){
    let message = "invalid token"
    statusCode.errorResponse(res,message)
  }
  
};

module.exports={verifyToken}