const express = require("express");
const {
  SignUp,
  CheckedSignedIn,
  SignIn,
  GetAllUsers,
  GetUserDetails,
} = require("../controllers/user.controller");
const router = express.Router();
const CheckJWT = require("../middleware/jwt.middleware");

router.post("/sign-up", SignUp);
router.get("/check-signed-in", CheckJWT, CheckedSignedIn);
router.post("/sign-in", SignIn);

module.exports = router;
