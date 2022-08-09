const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
  },
  itemPhoto: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
