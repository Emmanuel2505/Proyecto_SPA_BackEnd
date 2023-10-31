const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AdministerSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    facebook: {
        type: String,
        required: false,
    },
    instagram: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
    colorLetter: {
        type: String,
        required: false,
    },
    mainImage: {
        type: String,
        required: false,
    },
    logo: {
        type: String,
        required: false,
    },
})

module.exports = model('Administer', AdministerSchema);