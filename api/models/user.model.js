const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  cart: {
    type: [mongoose.Types.ObjectId],
    required: false,
    default: [],
  },
  orders: {
    type: [[mongoose.Types.ObjectId]],
    required: false,
    default: [],
  },
  password: {
    type: String,
  },
  saleNumber: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.password) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.MatchPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

module.exports = mongoose.model("User", UserSchema);
