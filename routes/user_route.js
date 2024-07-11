const express = require("express");
const route = express.Router();
const { register_user, user_login,forgot_pass,reset_pass } = require("../controllers/userController");
const { body } = require("express-validator");

// register api:-  https://banao-nodejs-7a2o.onrender.com/api/register
route.post(
  "/register",
  [
    body("username", "Enter a valid username").isLength({ min: 3 }),
    body("password", "Password must be of at least 5 charactors").isLength({
      min: 5,
    }),
  ],
  register_user
);
// login api:-  https://banao-nodejs-7a2o.onrender.com/api/login
route.post(
  "/login",
  [
    body("username", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be of at least 5 charactors").isLength({
      min: 5,
    }),
  ],
  user_login
);
// forgot Password api:-  https://banao-nodejs-7a2o.onrender.com/api/forgot_pass
route.post('/forgot_pass',forgot_pass);
// reset Password api:-  https://banao-nodejs-7a2o.onrender.com/api/reset_pass/token
route.patch('/reset_pass/:token',reset_pass)

module.exports = route;
