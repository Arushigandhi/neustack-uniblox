const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  quantity: {
    type: String,
  },
  amount: {
    type: String,
    default: 0,
  },
  discount_id: {
    type: String,
  },
  discount_value: {
    type: String,
  },
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
