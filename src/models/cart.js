const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema({
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    quantity: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    dateSale: {
        type: Date,
        require: false,
    },
    stateSale: {
        type: Boolean,
        require: true,
    },
});

module.exports = model('Cart', CartSchema);