import React from "react";
import { FaUser } from "react-icons/fa";
import { FaPersonRifle } from "react-icons/fa6";

const AccountSetting = () => {
  return (
    <>
      {/* <div className="min-h-screen bg-red-300 w-full "></div> */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-5 shadow-2xl shadow-gray-700  rounded-md absolute -translate-x-full top-10 left-10 "
      >
        <div className="p-2  rounded-md shadow-md shadow-gray-300  w-[300px]">
          <div className="flex items-center gap-1">
            <div className="bg-gray-200 flex items-center justify-center rounded-full h-[35px] w-[35px] border-2 border-gray-300">
              <FaUser size={22} className="text-gray-700" />
            </div>
            <h2>Muhammad Asim</h2>
          </div>
          <hr className="hr " />
          <div className="rounded-lg bg-gray-200 flex items-center justify-center p-2 hover:bg-gray-300">
            <FaPersonRifle className="text-center" />
            <h2>See all profiles</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSetting;
