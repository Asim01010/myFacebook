import { regUser } from "../models/regModel.js";
import bcrypt from "bcrypt";
export const registeUser = async (req, res) => {
  const { email, password, f_name, l_name, date, month, year, gender } =
    req.body;

  if (
    !email ||
    !password ||
    !f_name ||
    !l_name ||
    !date ||
    !month ||
    !year ||
    !gender
  ) {
    res.status(400);
    throw new Error("please enter all fields");
  }

  //   check if the user is already exist or not

  const checkUser = await regUser.findOne({ email });

  if (checkUser) {
    res.status(401);
    throw new Error("You are already exist");
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = await regUser.create({
    email,
    password: hashedPass,
    f_name,
    l_name,
    date,
    month,
    year,
    gender,
  });

  res.send(newUser);
};
