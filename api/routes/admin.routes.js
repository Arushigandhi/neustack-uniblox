const express = require("express");
const {
  GetAllUsers,
  GetUserDetails,
} = require("../controllers/user.controller");
const router = express.Router();
const CheckJWT = require("../middleware/jwt.middleware");

router.get("/get-all-users", CheckJWT, GetAllUsers);
router.get("/get-user-details", CheckJWT, GetUserDetails);

module.exports = router;
