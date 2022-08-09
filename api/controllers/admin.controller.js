const PurchaseModel = require("../models/purchase.model");
const DiscountModel = require("../models/discount.model");

exports.AddDiscount = async (req, res, next) => {
  const { discount_code, discount_value } = req.body;
  if (!discount_code || !discount_value)
    return res.status(400).json({
      success: false,
      message: "Required values not provided!",
    });

  const newDiscount = new DiscountModel({
    discount_code,
    discount_value,
  });

  newDiscount.save();

  return res.status(200).json({
    success: true,
    message: "Discount added successfully",
  });
};

exports.GetAllItems = async (req, res, next) => {
  PurchaseModel.find()
    .then((purchases) => {
      return res.status(200).json({
        success: true,
        purchases,
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
