const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.SignUp = async (req, res, next) => {
  const { phoneNumber, name, password, isAdmin } = req.body;
  const phoneNumberCheck = await UserModel.find({
    phoneNumber,
  });
  if (phoneNumberCheck.length !== 0) {
    return res.status(500).json({
      success: false,
      message: "phone number already exists!",
    });
  }
  const newUser = new UserModel({
    phoneNumber,
    name,
    password,
    isAdmin,
  });
  newUser
    .save()
    .then(async (n) => {
      return res.status(200).json({
        success: true,
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

exports.SignIn = (req, res, next) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password)
    return res.status(500).json({
      success: false,
      message: "Required values not provided!",
    });
  let HASH = process.env.JWT_HASH;
  UserModel.findOne({
    phoneNumber,
  })
    .then(async (user) => {
      if (user) {
        const check = await user.MatchPassword(password);

        if (!check) {
          return res.status(500).json({
            success: false,
            message: "Doesn't match error!",
          });
        }

        if (!HASH) {
          throw new Error("Hash not provided!");
        }
        const userData = user;
        const token = jwt.sign(
          {
            userData,
          },
          HASH,
          {
            expiresIn: "10h",
          }
        );
        return res.status(200).json({
          success: true,
          token,
          userData: userData,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Username does not exist!",
        });
      }
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error!",
      });
    });
};

exports.CheckedSignedIn = (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "User is signed in!",
  });
};

exports.GetAllUsers = (req, res, next) => {
  return UserModel.find({})
    .then((users) => {
      return res.status(200).json({
        success: true,
        users,
      });
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error!",
      });
    });
};

exports.GetUserDetails = (req, res, next) => {
  const { uid } = res.locals.uid;
  if (!uid)
    return res.status(500).json({
      success: false,
      message: "Required values not provided!",
    });
  return UserModel.findById(uid)
    .then((user) => {
      return res.status(200).json({
        success: true,
        user: user,
      });
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error!",
      });
    });
};
