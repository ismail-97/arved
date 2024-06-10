const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const validator = require('validator')
const validators = require('../utils/validators')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function (val) {
        return validator.isAlpha(val, ['en-GB'], { ignore: ' ' })
      },
    },
    required: true,
  },
  surname: {
    type: String,
    validate: {
      validator: function (val) {
        return validator.isAlpha(val, ['en-GB'], { ignore: ' ' })
      },
    },
    required: true,
  },
  orcid: {
    type: String,
    validate: {
      validator: function (val) {
        return validator.isNumeric(val)
      },
    },
    unique: true,
    required: true,
  },
  title: {
    type: String,
    enum: [
      'Prof. Dr.',
      'Assoc. Prof. Dr.',
      'Assist. Prof. Dr.',
      'Dr.',
      'Inst.',
      'Res. Assist.',
    ],
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    // immutable: true,
    match: [
      /^\w+([\.-]?\w+)*@ankara.edu.tr$/,
      'Please fill a valid email address',
    ],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
    validate: (v) => validators.isFaculty(v),
  },
  department: {
    type: String,
    required: true,
    // validate: v => validators.isDepartment(v)
  },
  fields: {
    type: [String],
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superAdmin'],
    required: true,
  },
  status: {
    type: String,
    enum: ['approved', 'rejected', 'pending'],
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
    delete returnedObject.isVerified
  },
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
