import express from "express";
import { registeUser, verifyOTP } from "../controller/userController.js";

export const userRoutes = express.Router();

userRoutes.post("/reg-user", registeUser);
userRoutes.post("/verify-otp/:user_id", verifyOTP);
