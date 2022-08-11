const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema({
  discount_name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Discount", DiscountSchema);
