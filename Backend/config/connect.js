import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.DATA_URL);
  console.log(mongoose.connection.host);
};
