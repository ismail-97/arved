const mongoose = require('mongoose')
const validators = require('../utils/validators')

const departmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        faculty: {
            type: String,
            required: true,
            validate: v => validators.isFaculty(v)
        }
    }
)

module.exports = mongoose.model('Department', departmentSchema)