const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const uri ="mongodb+srv://Shashan_k08:Shashanktiwari123456@cluster0.ikfvhoz.mongodb.net/Bloglift?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(uri)
    .then(() => console.log("Connect to Mongo Successfully"));
};

module.exports = connectToMongo;
