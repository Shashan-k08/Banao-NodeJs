const express = require("express");
const route = express.Router();
const { register_user } = require("../controllers/userController");

route.post("/", register_user);

module.exports = route;
