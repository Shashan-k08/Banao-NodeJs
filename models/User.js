const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
});

UserSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  console.log(resetToken, this.passwordResetToken);
  return resetToken;
};

const User = mongoose.model("user", UserSchema);
User.createIndexes;
module.exports = User;
