// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User',
//     {
//       user_name: {
//         type: DataTypes.STRING,
//         allownull: false,
//         validate: {
//           notempty: true
//         }
//       },
//       user_email: {
//         type: DataTypes.STRING,
//         allownull: false,
//         validate: {
//           notempty: true
//         }
//       },
//       user_password: {
//         type: DataTypes.STRING,
//         allownull: false,
//         validate: {
//           notempty: true
//         }

//       },
//       token: {
//         type: DataTypes.STRING,
//         allownull: false,
//         validate: {
//           notempty: true
//         }
//       },
//       phone: {
//         type: DataTypes.NUMBER,
//         allownull: false,
//         validate: {
//           notempty: true
//         }

//       },
//       city: {
//         type: DataTypes.STRING,
//         allownull: false,
//         validate: {
//           notempty: true
//         }

//       },
//       street: {
//         type: DataTypes.STRING,
//         allownull: false,
//         validate: {
//           notempty: true
//         }

//       },
//       country: {
//         type: DataTypes.STRING,
//         allownull: false,
//         validate: {
//           notempty: true
//         }

//       },
//       address: {
//         type: DataTypes.STRING,
//         allownull: false,
//         validate: {
//           notempty: true
//         }

//       }

//     }, { timestamps: true })
//   return User
// }

import { Schema, model } from 'mongoose'
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 200
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  token: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String,
    required: true,
    max: 200
  },
  state: {
    type: String,
    required: true,
    max: 200
  },
  country: {
    type: String,
    required: true,
    max: 200
  },
  address: {
    type: String,
    required: true,
    max: 300
  }
}, { timestamps: true }
)

export default model('User', userSchema)
