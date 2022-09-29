let express = require('express');
let app = express();
let dotenv = require('dotenv').config();
let bodyParser = require('body-parser')
console.log('start the project')
const path = require('path')
const db = require("./config/db")
db.connect();
const statusCode = require('./utils/statusCode')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static(path.resolve(__dirname, 'public')))


//Routes call

app.get('/', function(req,res){
    res.send('Hello world')
  })

const routes = require('./routes/index')
app.use('/',routes)

// const adminRoutes = require('./routes/adminRoutes')
// const userRoutes = require('./routes/userRoutes')
// const productRoutes = require('./routes/productRoutes')
// const productCategoryRoutes = require('./routes/productCategoryRoutes')


// app.use('/admin',adminRoutes)
// app.use('/user',userRoutes)
// app.use('/product',productRoutes)
// app.use('/productCategory',productCategoryRoutes)

// app.post('/category/add',authRoutes)
// app.get('/category/list',authRoutes)
// app.post('/upload/file',authRoutes)



//Server

app.listen(process.env.API_PORT);
console.log(`Users listening at http://localhost:${process.env.API_PORT}`)





// catch 404 and forward to error handler
app.use(function(req, res) {
     let message = " No such route exists"
     statusCode.notFoundResponse(res,message)
  });
  
  // error handler
  app.use(function(err, req, res) {
    let message =  "Error Message"
    statusCode.errorResponse(res,message)
  });


  module.exports = app;