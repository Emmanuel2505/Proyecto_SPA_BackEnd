const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  detail: {
    type: String,
    required: false,
  },
  benefit: {
    type: String,
    required: false,
  },
  howToUse: {
    type: String,
    required: false,
  },
  moreInfo: {
    type: String,
    required: false,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    max: 300,
  },
  image: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
  },
});

module.exports = model('Product', ProductSchema);