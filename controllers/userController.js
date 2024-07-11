const user_Model = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const register_user = async (req, res) => {
  body("username", "Enter a valid name").isLength({ min: 3 });
  body("password", "Password must be of at least 5 charactors").isLength({
    min: 5,
  });
  try {
    const { name, email, password } = req.body;
    const ismail = await user_Model.findOne({
      email: email,
    });
    if (ismail) {
      res.status(400).json({
        message: "Email already present",
      });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      const new_user = user_Model({
        name: name,
        password: hashedPass,
        email: email,
      });
      const save_user = await new_user.save();
      res.status(200).json({
        message: " User Registered!",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};
