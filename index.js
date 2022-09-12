let express = require('express');
let app = express();
let mongoose = require('mongoose');
let dotenv = require('dotenv').config();
let bodyParser = require('body-parser')
console.log('start the project')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db connection

mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
	//useCreateIndex: true,
	useUnifiedTopology: true,
	})
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log('ERROR : ',err));

//Routes call

app.get('/', function(req,res){
    res.send('Hello world')
  })

 let authRoutes = require('./routes/auth.js')

app.post('/register',authRoutes)
app.post('/login',authRoutes)
app.post('/product/add', authRoutes)
app.post('/category/add',authRoutes)
app.get('/category/list',authRoutes)



//Server

app.listen(process.env.API_PORT);
console.log(`Users listening at http://localhost:${process.env.API_PORT}`)





// catch 404 and forward to error handler
app.use(function(req, res) {
    res.status(404).json({
      message: "No such route exists"
    })
  });
  
  // error handler
  app.use(function(err, req, res) {
    res.status(err.status || 500).json({
      message: "Error Message"
    })
  });


  module.exports = app;