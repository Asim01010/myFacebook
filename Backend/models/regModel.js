import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    f_name: {
      type: String,
      required: [true, "Please enter all f_name"],
    },
    l_name: {
      type: String,
      required: [true, "Please enter all l_name"],
    },
    date: {
      type: Number,
      required: [true, "Please enter all date"],
    },
    month: {
      type: String,
      required: [true, "Please enter all month"],
    },
    year: {
      type: String,
      required: [true, "Please enter all year"],
    },
    email: {
      type: String,
      required: [true, "Please enter all email"],
    },
    password: {
      type: String,
      required: [true, "Please enter all password"],
    },
    gender: {
      type: String,
      required: [true, "Please enter all gender"],
    },
  },
  {
    timestamps: true,
  }
);

export const regUser = mongoose.model("register", userSchema);
