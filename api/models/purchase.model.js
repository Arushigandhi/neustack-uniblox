const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  discount_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  discount_value: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
