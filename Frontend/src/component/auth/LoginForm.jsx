import { Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, Links, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserSlice, userReset } from "../../features/users/userSlice";
import toast from "react-hot-toast";
const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [name, setName] = useState({
    email: "",
    password: "",
  });

  const { email, password } = name;
  // const [showslash, setShowSlash] = useState(false);

  const btnHandle = (e) => {
    setName({
      ...name,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (password.length > 0) {
      setShowPass(true);
    } else {
      setShowPass(false);
    }
  }, [password]);

  const { user, userLoading, userError, userMessage, userSuccess } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginHandler = async () => {
    const loginData = {
      email,
      password,
    };

    dispatch(LoginUserSlice(loginData));
  };

  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
    }

    if (userSuccess) {
      navigate("/home");
    }
    dispatch(userReset);
  }, [userError]);

  return (
    <>
      <form className="flex gap-3 p-3 rounded-md flex-col items-center justify-center  shadow-lg bg-white ">
        <input
          onChange={btnHandle}
          name="email"
          value={email}
          type="text"
          className={`w-full p-3 rounded-sm outline-0 border border-gray-300 focus:border-blue-500 mx-20 `}
          placeholder="Email address or phone number"
        />
        <span className=" flex items-center justify-end w-full  ">
          <input
            onChange={btnHandle}
            name="password"
            value={password}
            type={showEye ? "text" : "password"}
            className={`w-full p-3 rounded-sm outline-0 border border-gray-300 focus:border-blue-500 `}
            placeholder="Password"
          />

          {showEye ? (
            <FaEye
              onClick={() => setShowEye(false)}
              className={`absolute mr-3 cursor-pointer ${
                !showPass && "hidden"
              }`}
            />
          ) : (
            <FaRegEyeSlash
              onClick={() => setShowEye(true)}
              className={`absolute mr-3 cursor-pointer ${
                !showPass && "hidden"
              }`}
              size={20}
            />
          )}
        </span>
        <Button
          onClick={loginHandler}
          variant="contained"
          className="w-full font-semibold p-3 "
        >
          Login
        </Button>

        <Link to={"/"} className="text-blue-500 hover:underline">
          {" "}
          Forget Password ?
        </Link>

        <hr />
        <Link
          to={"/Register"}
          className="w-[60%] bg-[#36A420] shadow-md rounded-md lowercase"
        >
          <Button
            className="w-full "
            style={{
              fontWeight: "semiBold",
              background: "#42B72A",
              color: "white",
              paddingBlockStart: "13px",
              borderRadius: "5px",
              textTransform: "capitalize ",
            }}
          >
            Create new account
          </Button>
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
