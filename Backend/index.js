import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { userRoutes } from "./routes/registerRoutes.js";
import { errorHandler } from "./middleware/errormiddle.js";
import { connectDB } from "./config/connect.js";
import cors from "cors";
import { postRouter } from "./routes/postRoutes.js";

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", userRoutes);
app.use("/", postRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(
    `My first server is connected with port ${process.env.PORT.rainbow}`
  )
);
