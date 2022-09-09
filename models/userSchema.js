const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      max: 200
    },  email: {
      type: String,
      required: true,
      unique: true,
    },  password: {
      type: String,
      required: true,
      min: 8
    },
    // phone :{
    //     type : String,
    //     required : true,
    //     unique : true
    // },
    // city : {
    //     type: String,
    //   required: true,
    //   max: 200
    // },
    // state : {
    //     type: String,
    //   required: true,
    //   max: 200
    // },
    // country : {
    //     type: String,
    //   required: true,
    //   max: 200
    // },
    // address : {
    //     type: String,
    //   required: true,
    //   max: 300
    // }
  },{timestamps: true}
  )


  module.exports = mongoose.model('User',userSchema)
