const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
console.log('start the project')
require('path')
const db = require('./config/db')
const statusCode = require('./utils/statusCode')
db.connect()
// db.authenticate()
//   .then(() => console.log('Database connected...'))
//   .catch(err => console.log('Error: ' + err))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.static(path.resolve(__dirname, 'public')))

// Routes call

app.get('/', function (_req, res) {
  res.send('Hello world')
})

const routes = require('./routes/index')
app.use('/', routes)

// Server

app.listen(process.env.API_PORT)
console.log(`Users listening at http://localhost:${process.env.API_PORT}`)

// catch 404 and forward to error handler
app.use(function (_req, res) {
  const message = ' No such route exists'
  statusCode.notFoundResponse(res, message)
})

// error handler
app.use(function (_err, _req, res) {
  const message = 'Error Message'
  statusCode.errorResponse(res, message)
})

module.exports = app
