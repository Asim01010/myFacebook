import React, { useState } from "react";
import { FaChevronDown, FaUser } from "react-icons/fa";
import { sidebar_data } from "../data/SidebarData";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="h-[90vh] p-2 bg-gray-100 overflow-y-scroll hide-scroll scroll-fb">
      <div className="flex gap-2 py-2 px-2 hover:bg-gray-200 rounded-md cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="w-[35px] h-[35px] bg-gray-200 border-2 border-gray-300 rounded-full flex items-center justify-center">
            <FaUser size={22} className="text-gray-500" />
          </div>
          <h2 className="font-semibold capitalize">
            {user.f_name} {user.l_name}
          </h2>
        </div>
      </div>
      <motion.ul
        transition={{ duration: 1, staggerChildren: 0.3 }}
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex flex-col "
      >
        {sidebar_data
          ?.slice(0, open ? sidebar_data?.length : 10)
          .map((item, index) => {
            return (
              <>
                <motion.div>
                  <div
                    key={index}
                    className="flex gap-2 font-semibold py-2 px-2 rounded-md hover:bg-gray-200 cursor-pointer"
                  >
                    <img src={item.icons} alt="" />
                    <h2>{item.heading}</h2>
                  </div>
                </motion.div>
              </>
            );
          })}
        <div
          onClick={() => setOpen(!open)}
          className="py-2 flex items-center px-2  gap-2 rounded-md hover:bg-gray-200 cursor-pointer"
        >
          <div className="flex items-center justify-center h-[35px] w-[35px] bg-gray-300/80 rounded-full">
            <FaChevronDown
              size={15}
              className={`transition-all duration-75 ${
                open ? "transform rotate-180" : "transform rotate-0"
              }`}
            />
          </div>
          <h2 className="font-semibold ">{open ? "See less" : "See more"}</h2>
        </div>
      </motion.ul>
    </div>
  );
};

export default Sidebar;
