const express = require("express");
const {
  AddItem,
  GetAllItems,
  AddToCart,
  Checkout,
  GetAllItemsFromCart,
  GetAllDiscounts,
} = require("../controllers/item.controller");
const router = express.Router();
const CheckJWT = require("../middleware/jwt.middleware");

router.post("/add-item", CheckJWT, AddItem);
router.get("/get-all-items", GetAllItems);
router.get("/get-all-cart-items", CheckJWT, GetAllItemsFromCart);

router.post("/add-to-cart", CheckJWT, AddToCart);
router.post("/checkout", CheckJWT, Checkout);

router.get("/get-all-discounts", GetAllDiscounts);

module.exports = router;
