const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema({
  discount_code: {
    type: String,
    required: true,
  },
  discount_code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Discount", DiscountSchema);
