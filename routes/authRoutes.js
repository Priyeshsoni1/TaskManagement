const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController");
const { login } = require("../controllers/authController");
const {
  validateLogin,
  validateRegister,
} = require("../validation/authValidator");

router.post("/register", validateRegister, register);

router.post("/login", validateLogin, login);

module.exports = router;
