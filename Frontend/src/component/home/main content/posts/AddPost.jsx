import React from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import UltraButton from "./GsapButton";

const AddPost = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className=" py-2 px-4 shadow-md rounded-xl bg-white my-3 w-[80%] mx-auto">
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center text-gray-500 h-[35px] w-[37px] rounded-full border-2 bg-gray-200 border-gray-300">
            <FaUser size={22} />
          </div>
          <div className="rounded-full w-full bg-gray-100 p-2 text-gray-600">
            Whats on your mind, {user.f_name}
          </div>
        </div>
        <hr className="my-3 border-0 h-[1px] bg-gray-300" />
        <div className="grid grid-cols-3 ">
          <div className="flex items-center justify-center gap-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v4/yr/r/c0dWho49-X3.png?_nc_eui2=AeEHYxvlMPtmGudhhL2uSt1xueRic5Ym8Wm55GJzlibxaSFea2sNdmxeD4T7pJM_lXtXKc82JgjZwFBpygQO1J_d"
              alt=""
            />
            <p>Live video</p>
          </div>
          <div className="flex items-center justify-center gap-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png?_nc_eui2=AeFtzo8gYrKPTUIoUvSKaGcEkBVQC4m7dx6QFVALibt3HkvrSsNUKu5heWgPm97Cq_Tr6PJlGrBtIKjugFg4jBU3"
              alt=""
            />
            <p>Photo/video</p>
          </div>
          <div className="flex items-center justify-center gap-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v4/yd/r/Y4mYLVOhTwq.png?_nc_eui2=AeF4yWa_3XCWClTc1AZ96d80fPQ6N5_OUfV89Do3n85R9a32bc8CNn2Qs5jH6vF1W9RlN0cAoZFTahWs9mhviRCL"
              alt=""
            />
            <p>Feeling/activity</p>
          </div>
        </div>
      </div>
      <UltraButton />
    </>
  );
};

export default AddPost;
