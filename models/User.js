const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: string,
    required: true,
  },
  email: {
    type: string,
    required: true,
  },
  password: {
    type: string,
    required: true,
  },
});

const User = mongoose.model("user", UserSchema);
User.createIndexes;
module.exports = User;
