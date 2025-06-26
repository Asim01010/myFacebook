import axios from "axios";

export const regUserService = async (userData) => {
  const response = await axios.post("http://localhost:5000/reg-user", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const verifyOtp = async (otpData) => {
  const response = await axios.post(
    `http://localhost:5000/verify-otp/${otpData?.id}`,
    otpData
  );
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axios.post(
    "http://localhost:5000/login-user",
    loginData
  );
  if (response) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
};
