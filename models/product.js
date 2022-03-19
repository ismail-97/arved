const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['article', 'project', 'conference paper', 'book chapter']
    },
    authors: {
        type: [String],
        required: true
    },
    publication_date: {
        type: Date,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    citations: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileID: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },   
})

productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.date = getFullDate(returnedObject.publication_date)
        delete returnedObject._id
        delete returnedObject.__v    
        delete returnedObject.user
    }
})

productSchema.plugin(uniqueValidator);

const getFullDate = (date) => {
    return date.getDate()
        + '-' + (date.getMonth() + 1)
        + '-' + date.getFullYear() 
}

module.exports = mongoose.model('Product', productSchema)