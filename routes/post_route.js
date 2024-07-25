const express = require("express");
const route = express.Router();
const fetchuser = require('../middleware/fetchuser');
const {
  create_post,
  readAll_post,
  read_post,
  delete_post,
  update_post,
  like_post,
  add_cmt,
} = require("../controllers/postController");

// Create post Api :-  https://banao-nodejs-7a2o.onrender.com/api/createPost
route.post("/createPost",fetchuser, create_post);

// ReadAllPost post Api :-  https://banao-nodejs-7a2o.onrender.com/api/readAllPost
route.get("/readAllPost",fetchuser, readAll_post);

// Read Single post Api :-  https://banao-nodejs-7a2o.onrender.com/api/readPost/:id
route.get("/readPost/:id",fetchuser, read_post);

// Update post Api :-  https://banao-nodejs-7a2o.onrender.com/api/updatePost/:id
route.patch("/updatePost/:id",fetchuser, update_post);

// Delete post Api :-  https://banao-nodejs-7a2o.onrender.com/api/deletePost/:id
route.delete("/deletePost/:id",fetchuser, delete_post);

// Like post Api :-  https://banao-nodejs-7a2o.onrender.com/api/likePost/:id
route.post("/likePost/:id",fetchuser, like_post);

// Add comment on post Api :-  https://banao-nodejs-7a2o.onrender.com/api/addCmt/:id/comments
route.post("/addCmt/:id/comments",fetchuser, add_cmt);

module.exports = route;