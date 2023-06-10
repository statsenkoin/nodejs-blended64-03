// http://localhost:60000/api/v1/posts
// /api/v1/posts
// 1. Read posts
// 2. Add post
// 3. Get one posts
// 4. Update post
// 5. Delete post

const express = require("express");
const postsRoutes = express.Router();
const postsController = require("../controllers/PostsController");

postsRoutes.get("/posts", postsController.getAll);
postsRoutes.post(
  "/posts",
  (req, res, next) => {
    console.log("JOI");
    next();
  },
  postsController.add
);
postsRoutes.get("/posts/:id", postsController.getOne);
postsRoutes.patch("/posts/:id", postsController.update);
postsRoutes.delete("/posts/:id", postsController.remove);

module.exports = postsRoutes;
