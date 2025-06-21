import React, { useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import {
  FaAngleDown,
  FaFacebookMessenger,
  FaGamepad,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoNotifications } from "react-icons/io5";
import { RiMessengerFill } from "react-icons/ri";
import { SiBitbucket } from "react-icons/si";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import Slider from "@mui/material/Slider";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import { navbar_data } from "./data/NavbarData";
import { HiBell } from "react-icons/hi";
import Menu from "../rightside/Menu";
import AccountSetting from "../rightside/AccountSetting";

const Navbar = () => {
  const [focused, setFocused] = useState(false);
  const [menu, setMenu] = useState(false);
  const [accountset, setAccountSet] = useState(false);
  return (
    <>
      <nav className="flex justify-between items-center  py-1  w-full shadow-md bg-white">
        {/* left */}
        <div
          className={`flex items-center gap-1 transition-all duration-100 ${
            focused && "shadow-2xl shadow-gray-400  rounded-md  pb-2 "
          }  `}
        >
          <div
            className={`flex items-center  justify-center h-[40px] w-[40px] hover:bg-gray-200 rounded-full ${
              focused ? "block" : "hidden"
            }`}
          >
            <IoMdArrowBack
              size={20}
              className={`text-gray-500 transition-all duration-300  ${
                focused
                  ? "opacity-100 -translate-x-0"
                  : "opacity-0 translate-x-15"
              }`}
            />
          </div>
          <img
            src="/images/Facebook-Logosu.png"
            width={40}
            alt=""
            className={`transition-all duration-300  ${focused && "hidden"}`}
          />
          <div
            className={`bg-gray-200 rounded-full flex items-center px-3 gap-1 `}
          >
            <CiSearch
              size={20}
              className={`transition-all duration-300  ${focused && "hidden"} `}
            />
            <input
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              type="text"
              className={`border-0 outline-0 py-2 ${focused && "px-5"}`}
              placeholder="Search Facebook"
            />
          </div>
        </div>

        {/* mid */}

        <ul className="flex gap-2 unstyled  text-gray-500">
          {navbar_data?.map((item, index) => {
            return (
              <>
                <div key={index}>
                  <li className="relative px-10 py-2 group hover:bg-gray-200 rounded-xl cursor-pointer">
                    {item.icon}
                    <div className="absolute bg-black/60 rounded-md text-sm  text-white p-2 translate-y-[30%] -translate-x-[20%] transition-all duration-200 opacity-0 delay-150 group-hover:opacity-100 active:text-blue-500">
                      {item.title}
                    </div>
                  </li>
                </div>
              </>
            );
          })}
        </ul>

        {/* right */}

        <div className="flex gap-3 pe-5  text-gray-800">
          {/* grid */}

          <div
            onClick={() => setMenu(!menu)}
            className={`flex justify-center items-center bg-gray-300/70 hover:bg-gray-300/100 h-[40px] w-[40px] rounded-full cursor-pointer ${
              menu && "text-blue-500 bg-blue-100 hover:bg-blue-200"
            } `}
          >
            <CgMenuGridR size={25} />
          </div>
          {menu && <Menu />}

          {/* Messenger */}
          <div className="flex justify-center items-center bg-gray-300/70  hover:bg-gray-300/100 h-[40px] w-[40px] rounded-full cursor-pointer">
            <FaFacebookMessenger size={20} />
          </div>
          {/* bell */}
          <div className="flex justify-center items-center bg-gray-300/70  hover:bg-gray-300/100 h-[40px] w-[40px] rounded-full cursor-pointer">
            <HiBell size={20} />
          </div>
          {/* user */}
          <div
            onClick={() => setAccountSet(!accountset)}
            className="flex justify-center items-center bg-gray-300/70 group  hover:bg-gray-300/100 h-[40px] w-[40px] rounded-full cursor-pointer  relative border border-gray-400"
          >
            <FaUser size={22} className=" text-gray-600 " />
            <div className="bg-gray-200 h-[13px] w-[13px] absolute  rounded-full flex justify-center items-center text-gray-500 border-2 border-white translate-y-4 translate-x-3  ">
              <div className="absolute rounded-lg bg-black/80 translate-y-[80%] group-hover:opacity-100  -translate-x-2 text-[10px] text-white p-2 opacity-0 duration-100">
                Account
              </div>
              <FaAngleDown />
            </div>
            {accountset && <AccountSetting />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
