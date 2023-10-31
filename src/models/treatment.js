const mongoose = require("mongoose");
const { Schema } = mongoose;

const TreatmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
  },
});

module.exports = mongoose.model("Treatment", TreatmentSchema);
