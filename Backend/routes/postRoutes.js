import express from "express";
import {
  getPostController,
  postController,
} from "../controller/postController.js";

export const postRouter = express.Router();

postRouter.post("/add-post/:user_id", postController);
postRouter.get("/get-all-posts", getPostController);
