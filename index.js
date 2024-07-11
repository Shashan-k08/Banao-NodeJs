const express = require("express");
const connectToMongo = require("./db");
const app = express();
var cookieParser = require("cookie-parser");
var cors = require("cors");

connectToMongo();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.listen(5002);
