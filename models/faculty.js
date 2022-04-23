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
facultySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        // delete returnedObject._id
    }
})
module.exports = mongoose.model('Faculty', facultySchema)