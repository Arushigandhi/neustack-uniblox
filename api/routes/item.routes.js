const express = require("express");
const {
  AddItem,
  GetAllItems,
  AddToCart,
  Checkout,
} = require("../controllers/item.controller");
const router = express.Router();
const CheckJWT = require("../middleware/jwt.middleware");

router.post("/add-item", CheckJWT, AddItem);
router.get("/get-all-items", CheckJWT, GetAllItems);

router.post("/add-to-cart", CheckJWT, AddToCart);
router.post("/checkout", CheckJWT, Checkout);

module.exports = router;
