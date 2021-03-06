/* eslint-disable no-invalid-this */
const mongoose = require('mongoose')
const md5 = require('md5')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
      
  },
  createdDate: {
    type: Date,
    default: Date.now,
  }
  
})



UserSchema.pre('save', function (next) {
 
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)

      this.password = hash
      next()
    })
  })
})

module.exports = mongoose.model('User', UserSchema);
