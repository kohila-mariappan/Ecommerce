const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
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
},{timestamps: true}
)


module.exports = mongoose.model('Admin',adminSchema)
