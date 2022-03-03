const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const facultySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        }
    }
)

facultySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Faculty', facultySchema)