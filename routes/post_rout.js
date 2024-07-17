const express = require("express");
const route = express.Router();

const {
  create_post,
  readAll_post,
  read_post,
  delete_post,
  update_post,
  like_post,
  add_cmt,
} = require("../controllers/postController");

route.post("/createPost", create_post);
route.get("/readAllPost", readAll_post);
route.get("/readPost/:id", read_post);
route.patch("updatePost/:id", update_post);
route.delete("deletePost/:id", delete_post);
route.post("likePost/:id", like_post);
route.post("addCmt/:id/comments", add_cmt);
