const DiscountModel = require("../models/discount.model");
const ItemModel = require("../models/items.model");
const PurchaseModel = require("../models/purchase.model");
const UserModel = require("../models/user.model");

exports.AddItem = async (req, res, next) => {
  const { name, description, itemPhoto, price, qty } = req.body;
  if (!name || !description || !price)
    return res.status(400).json({
      success: false,
      message: "Required values not provided!",
    });

  const newItem = new ItemModel({
    name,
    description,
    itemPhoto,
    price,
    qty,
  });

  newItem.save();

  return res.status(200).json({
    success: true,
    message: "Item added successfully",
  });
};

exports.GetAllItems = async (req, res, next) => {
  ItemModel.find()
    .then((items) => {
      return res.status(200).json({
        success: true,
        items,
      });
    })
    .catch((err) => {
      console.log("Error!");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err,
      });
    });
};

exports.AddToCart = async (req, res, next) => {
  const { item_id } = req.body;
  const uid = res.locals.uid;
  if (!item_id)
    return res.status(500).json({
      success: false,
      message: "Required values not provided!",
    });
  const item = await ItemModel.findById({
    _id: item_id,
  });
  if (!item)
    return res.status(500).json({
      success: false,
      message: "Item not found!",
    });
  const user = await UserModel.findById({
    _id: uid,
  });
  if (!user)
    return res.status(500).json({
      success: false,
      message: "User not found!",
    });
  user.cart.push(item);
  user.saleNumber += 1;
  await user
    .save()
    .then(async () => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log("Error");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error!",
      });
    });
};

exports.Checkout = async (req, res, next) => {
  const uid = res.locals.uid;
  if (!uid)
    return res.status(500).json({
      success: false,
      message: "Required values not provided!",
    });
  const user = await UserModel.findById({
    _id: uid,
  });
  user.orders.push(user.cart);
  user.cart = [];
  let totalPrice = 0;
  const discount = await DiscountModel.findById(req.body.discount_id);
  user.orders.forEach((order) => {
    order.forEach((item) => {
      totalPrice += item.price;
      const newPurchase = new PurchaseModel({
        name: item.name,
        item_id: item._id,
        quantity: item.qty,
        amount: item.price * item.qty,
        discount_id: discount._id,
        discount_value: discount.value,
      });
      newPurchase.save();
    });
  });
  if (user.saleNumber % 3 === 0 && discount) {
    const discount = await DiscountModel.findById(discount_id);
    totalPrice = totalPrice - totalPrice * discount.value;
  }
  await user
    .save()
    .then(async (n) => {
      return res.status(200).json({
        success: true,
        message: "Cart confirmed successfully",
        totalPrice,
      });
    })
    .catch((err) => {
      console.log("Error!");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error.",
      });
    });
};
