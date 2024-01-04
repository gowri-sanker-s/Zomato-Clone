const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const contactModel = mongoose.model("contact", contactSchema)
module.exports = contactModel