import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { userReset, verifyUserOtp } from "../../features/users/userSlice";
import { useNavigate } from "react-router-dom";
const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isVerified, setIsVerified] = useState(false);
  const [isError, setIsError] = useState(false);
  const [resendTime, setResendTime] = useState(30);
  const inputRefs = useRef([]);

  // Countdown timer for resend OTP
  useEffect(() => {
    const timer =
      resendTime > 0 &&
      setInterval(() => {
        setResendTime(resendTime - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [resendTime]);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus to next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }

      setIsError(false);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, userLoading, userError, userSuccess, userMessage } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (userError) {
      console.log(userMessage);
    }
    if (userSuccess) {
      navigate("/home");
    }
    dispatch(userReset());
  }, [userError, userSuccess]);

  const verifyOtp = () => {
    const enteredOTP = otp.join("");

    const otpdata = {
      otp: enteredOTP,
      id: user?._id,
    };
    dispatch(verifyUserOtp(otpdata));
  };

  const resendOtp = () => {
    setResendTime(30);
    setOtp(Array(6).fill(""));
    setIsError(false);
    inputRefs.current[0].focus();
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <AnimatePresence>
        {isVerified ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-24 h-24 bg-green-100/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Verified!</h2>
            <p className="text-gray-600 mb-8">
              Your account has been successfully verified
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setIsVerified(false);
                setOtp(Array(6).fill(""));
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-green-200/50 transition-all duration-300"
            >
              Continue to Dashboard
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full"
          >
            <div className="text-center mb-8">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 bg-indigo-100/80 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Enter Verification Code
              </h1>
              <p className="text-gray-600">
                We've sent a 6-digit code to your email
              </p>
            </div>

            <motion.div
              animate={
                isError
                  ? {
                      x: [0, -10, 10, -10, 10, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex justify-center space-x-2 sm:space-x-3">
                {otp.map((digit, index) => (
                  <motion.input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength={1}
                    whileFocus={{ scale: 1.05 }}
                    className={`w-14 h-14 sm:w-16 sm:h-16 border-2 text-3xl text-center rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      isError
                        ? "border-red-500 bg-red-50/50"
                        : digit
                        ? "border-indigo-400 bg-indigo-50/50"
                        : "border-gray-200"
                    }`}
                  />
                ))}
              </div>
              {isError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-3 text-center"
                >
                  Invalid code. Please try again.
                </motion.p>
              )}
            </motion.div>

            <div className="space-y-5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={verifyOtp}
                disabled={otp.some((digit) => digit === "")}
                className={`w-full py-4 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                  otp.some((digit) => digit === "")
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-200/50"
                }`}
              >
                Verify Code
              </motion.button>

              <div className="text-center">
                <motion.button
                  whileHover={resendTime === 0 ? { scale: 1.05 } : {}}
                  whileTap={resendTime === 0 ? { scale: 0.95 } : {}}
                  onClick={resendOtp}
                  disabled={resendTime > 0}
                  className={`text-sm font-medium ${
                    resendTime > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-indigo-600 hover:text-indigo-800"
                  }`}
                >
                  Resend Code
                </motion.button>
                <p className="text-xs text-gray-500 mt-1">
                  {resendTime > 0
                    ? `Resend available in 0:${resendTime
                        .toString()
                        .padStart(2, "0")}`
                    : "Ready to resend"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OTPVerification;
