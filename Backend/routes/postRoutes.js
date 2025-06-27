import express from "express";
import { postController } from "../controller/postController.js";

export const postRouter = express.Router();

postRouter.post("/add-post/:user_id", postController);
