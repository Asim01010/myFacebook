import { regUser } from "../models/regModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const generateOtp = () => {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10); // picks a digit between 0-9
  }
  return otp;
};

const otpSend = (email, newUser) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "masimqw4hd@gmail.com",
      pass: "wxuudyapmbegmiss",
    },
  });

  const option = {
    from: "masimqw4hd@gmail.com",
    to: email,
    subject: "OTP Verification",
    html: `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Generator - Facebook Style</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #e9ebee;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .otp-container {
      background: white;
      width: 100%;
      max-width: 400px;
      padding: 40px 30px;
      border-radius: 10px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .otp-header {
      color: #1877f2;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .otp-subtitle {
      font-size: 16px;
      color: #555;
      margin-bottom: 30px;
    }

    form input[type="email"] {
      width: 100%;
      padding: 12px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 15px;
    }

    form button {
      width: 100%;
      padding: 12px;
      background-color: #1877f2;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    form button:hover {
      background-color: #145dbf;
    }

    .footer-text {
      margin-top: 25px;
      font-size: 14px;
      color: #888;
    }
  </style>
</head>
<body>

  <div class="otp-container">
    <div class="otp-header">facebook</div>
    <div class="otp-subtitle">Enter your email to get an OTP</div>
    <div class="">${newUser.otp}</div>
 
    <div class="footer-text">We'll send a 6-digit OTP to your email</div>
  </div>

</body>
</html>

    `,
  };

  const sendmail = transport.sendMail(option, (error, info) => {
    if (error) {
      res.status(400);
      throw new Error(error.message);
    } else {
      console.log("mail sent");
    }
  });
};

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
    otp: generateOtp(),
  });

  otpSend(email, newUser);
  res.send(newUser);
};

// verify OTP

export const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  const { user_id } = req.params;

  // find the relevent user
  const findUser = await regUser.findById(user_id);

  if (!findUser) {
    res.status(404);
    throw new Error("user not found");
  }

  if (!otp) {
    res.status(400);
    throw new Error("please enter the otp");
  }
  if (findUser.otp == otp) {
    findUser.otp = null;
    await findUser.save();
    res.send(findUser);
  } else {
    res.status(401);
    throw new Error("invalid OTP");
  }
};
