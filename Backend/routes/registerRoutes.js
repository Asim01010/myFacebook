import express from "express";
import { registeUser } from "../controller/userController.js";

export const userRoutes = express.Router();

userRoutes.post("/reg-user", registeUser);
