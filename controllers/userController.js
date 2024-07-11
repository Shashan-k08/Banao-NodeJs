const user_Model = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const register_user = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
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
      success = true;
      res.status(200).json({ success, message: " User Registered!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  register_user,
};
