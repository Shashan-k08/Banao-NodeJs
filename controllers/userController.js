const user_Model = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const sendEmail = require("../Utils/email");
const crypto = require("crypto");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const JWT_SECRET = process.env.JWT_SECRET;
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
      const data = {
        user: {
          id: new_user.id,
        },
      };
      const verificationtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res
        .status(200)
        .json({ success, verificationtoken, message: "User Registered!" });
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
    const data = {
      user: {
        id: user.id,
      },
    };
    const verificationtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({
      success,
      verificationtoken,
      message: "User logged in Successfully!",
    });
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
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/reset_pass/${resetToken}`;
    const message = `We have a received a password reset request.Please use the below link to rest your password \n\n ${resetUrl} \n\n This link is valid for 10 minutes.`;
    await sendEmail({
      email: user.email,
      subject: "Password change request received",
      message: message,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset link send to the user email Successfully!",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};
const reset_pass = async (req, res) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await user_Model.findOne({ passwordResetToken: token });

  if (!user) {
    return res.status(400).json({ error: "Token is Invalid or has expired!" });
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.save();
  res.status(200).json({
    status: "success",
    message: "Password updated Successfully!",
  });
};

module.exports = {
  register_user,
  user_login,
  forgot_pass,
  reset_pass,
};
