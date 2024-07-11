const user_Model = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const register_user = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    const { username, email, password } = req.body;
    const ismail = await user_Model.findOne({
      email: email,
    });
    const isusername = await user_Model.findOne({
      username: username,
    });
    if (ismail || isusername) {
      res.status(400).json({
        message: "User already exist!",
      });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      const new_user = user_Model({
        username: username,
        password: hashedPass,
        email: email,
      });
      const save_user = await new_user.save();
      success = true;
      res.status(200).json({ success, message: "User Registered!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

const user_login = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    let user = await user_Model.findOne({ username });
    if (!user) {
      success = false;
      return res.status(400).json({ error: "User does not exist!" });
    }

    const passwordcheck = await bcrypt.compare(password, user.password);
    if (!passwordcheck) {
      success = false;
      return res.status(400).json({ success, error: "Incorrect Password" });
    }
    success = true;
    res.json({ success, message: "User logged in Successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

const forgot_pass = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await user_Model.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "We could not find user with given email" });
    }

    const resetToken = user.createResetPasswordToken();
    await user.save();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};
const reset_pass = async (req, res) => {};

module.exports = {
  register_user,
  user_login,
  forgot_pass,
};
