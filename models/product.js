const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['article', 'project', 'conference paper', 'book chapter'],
  },
  authors: {
    type: [String],
    required: true,
  },
  publication_date: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => {
        const currentYear = new Date().getFullYear()
        return value > 1900 && value <= currentYear
      },
      message: (props) =>
        `Publication date ${props.value} is not between 1900 and the current year.`,
    },
  },
  publisher: {
    type: String,
    required: true,
  },
  citations: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileID: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sciIndex: {
    type: String,
    required: true,
    enum: ['SCI', 'SCIE'],
  },
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.user
  },
})

productSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Product', productSchema)
