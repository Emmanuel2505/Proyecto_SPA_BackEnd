const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  names: {
    type: String,
    required: true,
  },
  surnames: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  dni: {
    type: String,
    unique: true,
    required: true,
  },
  birth: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
