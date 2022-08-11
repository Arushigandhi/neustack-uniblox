const express = require("express");
const { AddDiscount, GetAllItems } = require("../controllers/admin.controller");
const {
  GetAllUsers,
  GetUserDetails,
} = require("../controllers/user.controller");
const router = express.Router();
const CheckJWT = require("../middleware/jwt.middleware");

router.get("/get-all-users", CheckJWT, GetAllUsers);
router.get("/get-user-details", CheckJWT, GetUserDetails);

router.post("/add-discount", CheckJWT, AddDiscount);
router.get("/get-all-items", CheckJWT, GetAllItems);

module.exports = router;
