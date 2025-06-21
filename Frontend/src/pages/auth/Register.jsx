import React, { useEffect, useRef, useState } from "react";
import { BiSolidHide } from "react-icons/bi";
import { FaCircleQuestion, FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [showText, setShowText] = useState(false);

  const [showEye, setShowEye] = useState(false);

  const [months] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  // lopp for year
  const GenerateYears = () => {
    let years = [];
    for (let i = 2025; i >= 1905; i--) {
      years.push(i);
    }
    return years;
  };
  // make state for every input
  const [formField, setFormField] = useState({
    email: "",
    password: "",
    f_name: "",
    l_name: "",
    date: "",
    month: "",
    year: "",
    gender: "",
  });

  const { email, password, f_name, l_name, date, month, year, gender } =
    formField;

  const btnHandle = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/reg-user", {
        f_name,
        l_name,
        date,
        month,
        year,
        gender,
        email,
        password,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (password.length > 0) {
      setShowEye(true);
    } else {
      setShowEye(false);
    }
  }, [password]);

  return (
    <>
      <div className="flex justify-center items-center my-10">
        <img
          src="https://cdn.worldvectorlogo.com/logos/facebook-5.svg"
          alt="facebook"
          width={220}
        />
      </div>
      <div className="shadow-xl rounded-md bg-white mx-auto xl:w-[30%] lg:w-[40%] md:w-[50%] sm:w-[90%] h-[50%]">
        <h1 className="text-2xl font-bold text-center ">
          Create a new account
        </h1>
        <p className="text-[15px] text-gray-500 text-center my-1">
          It's quick and easy.
        </p>
        <hr className="border-0 bg-gray-200 h-[1px]" />
        <div className="grid grid-cols-2 ">
          <input
            name="f_name"
            value={f_name}
            onChange={btnHandle}
            type="text"
            className="rounded-md border border-gray-300 outline-0 px-2 py-2 m-3 focus:border-blue-500 focus:border-2 "
            placeholder="First name"
          />
          <input
            name="l_name"
            value={l_name}
            onChange={btnHandle}
            type="text"
            className="rounded-md border border-gray-300 outline-0 px-2 py-2 m-3 focus:border-blue-500 focus:border-2"
            placeholder="Surname"
          />
        </div>
        <p className="text-[12px] text-gray-500   m-3 ">
          Date of birth <FaCircleQuestion className="inline" />
        </p>

        <div className="grid grid-cols-3 mx-3 gap-2">
          <select
            name="date"
            value={date}
            onChange={btnHandle}
            className="border border-gray-300 rounded-md py-2 focus:border-blue-500 focus:border-2"
          >
            {Array.from({ length: 30 }).map((_, index) => {
              const day = index + 1;
              return (
                <option key={day} value={day}>
                  {day}
                </option>
              );
            })}
          </select>

          <select
            name="month"
            value={month}
            onChange={btnHandle}
            className="border border-gray-300 rounded-md  py-2 focus:border-blue-500 focus:border-2 "
          >
            {months?.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
          <select
            name="year"
            value={year}
            onChange={btnHandle}
            className="border border-gray-300 rounded-md py-2 focus:border-blue-500 focus:border-2 "
          >
            {GenerateYears()?.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <p className="text-[12px] text-gray-500   m-3  ">
          Gender <FaCircleQuestion className="inline" />
        </p>

        <div className="grid grid-cols-3 gap-2 m-3 ">
          <div className="flex justify-between items-center border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:border-2">
            <label htmlFor="">Female</label>

            <input
              type="Radio"
              name="gender"
              value="Female"
              onChange={btnHandle}
            />
          </div>
          <div className="flex justify-between items-center border border-gray-300 rounded-md p-2">
            <label htmlFor="">Male</label>
            <input
              type="Radio"
              name="gender"
              value="Male"
              onChange={btnHandle}
            />
          </div>
          {/* <div className="flex justify-between items-center border border-gray-300 rounded-md p-2">
            <label htmlFor="">Custom</label>
            <input
              type="Radio"
              name="gender"
              value={"custom"}
              onChange={btnHandle}
            />
          </div> */}
        </div>
        {/* <div className="flex flex-col gap-2 m-3">
          <select
            name="custom"
            value={custom}
            onChange={btnHandle}
            type="text"
            className="rounded-md border border-gray-300 w-full p-2  outline-0 focus:border-2 focus:border-blue-500"
            placeholder="Mobile number or email address"
          />
          {[
            `She:"Wish her a happy birthday",He:"Wish him a happy birthday",They:"Wish them a happy birthday"`,
          ].map((item, index) => {
            return <option value=""></option>;
          })}
          <selec />
        </div> */}
        <div className="flex flex-col gap-2 m-3">
          <input
            name="email"
            value={email}
            onChange={btnHandle}
            type="text"
            className="rounded-md border border-gray-300 w-full p-2  outline-0 focus:border-2 focus:border-blue-500"
            placeholder="Mobile number or email address"
          />
          <div className="relative">
            <input
              name="password"
              value={password}
              onChange={btnHandle}
              type={!showText ? "text" : "password"}
              className="rounded-md border border-gray-300 w-full p-2  outline-0 focus:border-2 focus:border-blue-500"
              placeholder="New password"
            />

            {showText ? (
              <BiSolidHide
                onClick={() => setShowText(false)}
                className={`absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[20px]  ${
                  !showEye && "hidden"
                } `}
              />
            ) : (
              <FaEye
                onClick={() => setShowText(true)}
                className={`absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[20px] ${
                  !showEye && "hidden"
                } `}
              />
            )}
          </div>
        </div>
        <p className="m-3 text-[12px] text-gray-500 w-[90%]">
          People who use our service may have uploaded your contact information
          to Facebook.
          <a href="#" className="text-blue-500">
            Learn more.
          </a>
        </p>
        <p className="m-3 text-[12px] text-gray-500 w-[90%]">
          By clicking Sign Up, you agree to our Terms, Privacy Policy and
          Cookies Policy. You may receive SMS notifications from us and can opt
          out at any time.
        </p>

        <button
          onClick={handleSignup}
          className="text-[20px] font-bold bg-[#00A400] block mx-auto text-white rounded-md font-sans py-1 px-15"
        >
          Sign Up{" "}
        </button>

        <Link to={"/"}>
          <p className="text-center text-blue-500 font-semibold my-3 pb-3">
            Already have an account?
          </p>
        </Link>
      </div>
    </>
  );
};

export default Register;
