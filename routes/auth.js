const express = require('express');
//const checkAuth = require('../Middleware/checkAuth.middleware');
const userControllers = require('../controllers/auth');
const router = express.Router();

router.post('/register', userControllers.userRegister);
router.post('/login',userControllers.userLogin)
router.post('/add/product',userControllers.addProduct)

// router.post('/login', userControllers.userLogin);
// router.get('/me', checkAuth, userControllers.getMe);

module.exports = router






// app.post('v1/registration', (req, res) => {
//     controller.userRegistration(req, res)
//         .then(function (finalResult) {

//             console.log("Final response for /v1/registration ", finalResult);

//             res.send(finalResult);
//         })

//         .catch(function (e) {
//             console.log("Catch handler /v1/registration" + e);
//             res.send(e.message);
//         });

// });
//.post('/registration',controller.userRegistration)






//module.exports = app
