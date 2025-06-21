import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Social_data } from "./Social_data/Social_data";
import { create_data } from "./Social_data/Create_data";

const Menu = () => {
  return (
    <>
      <div className=" fixed top-0 bg-red-500 left-0 min-h-screen w-full"></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-50 rounded-xl shadow-xl px-5  absolute -translate-x-[68%] w-[40%] top-13  h-[90vh] overflow-y-auto overflow-hidden "
      >
        <div className="text-2xl font-bold py-3 sticky top-0 bg-gray-50 w-full z-10">
          Menu
        </div>
        <div className="grid md:grid-cols-3 gap-2 grid-cols-1    ">
          <div className="col-span-2 bg-white rounded-md p-3 flex flex-col justify-center items-center ">
            <div className="relative flex items-center p-2 rounded-full bg-gray-100 gap-1 w-full ">
              <BiSearch className=" text-gray-500 " size={20} />
              <input
                type="text"
                className="border-0 outline-0 "
                placeholder="Search menu"
              />
            </div>

            <ul className="flex flex-col unstyled my-5 gap-3 list-none w-full ">
              {Social_data?.map((item, index) => {
                return (
                  <div key={index} className="">
                    <li className="text-md font-semibold capitalize text-gray-800 ">
                      {item.title}
                    </li>
                    {/* nested list */}
                    {item?.list?.map((item2, index2) => {
                      return (
                        <div
                          key={index2}
                          className="flex gap-2 p-2 items-center hover:bg-gray-100 rounded-md cursor-pointer"
                        >
                          <img src={item2?.icons} width={30} alt="" />
                          <div className="flex flex-col  px-2">
                            <h5 className="font-semibold">{item2.heading}</h5>
                            <p className="text-[14px]">{item2.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                    {index !== Social_data?.length - 1 && <hr className="hr" />}
                  </div>
                );
              })}
            </ul>
          </div>

          <div className="col-span-1 bg-white p-3 shadow-md rounded-md w-[100%]  lg:h-[30%] sticky top-[56px]">
            <div className="text-xl font-bold">Create</div>
            <ul className=" h-[250px] pr-2">
              {create_data?.map((item, index) => (
                <li key={index} className="w-full">
                  <div className="flex items-center gap-3 my-3 rounded-md">
                    <span className="text-2xl rounded-full bg-gray-200 p-2">
                      {item.icons}
                    </span>
                    <h2 className="text-md font-semibold">{item.title}</h2>
                  </div>

                  {index === 3 && <hr className="w-full hr " />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
