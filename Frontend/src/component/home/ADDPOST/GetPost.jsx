import React from "react";
import { FaGlobe, FaUser } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { RxDotsHorizontal } from "react-icons/rx";
// import { useDispatch, useSelector } from "react-redux";
// import OptionMenu from "./OptionMenu.jsx";

const GetPosts = ({
  background,
  caption,
  _id,
  createdAt,
  postImage,
  comments,
  user_id,
}) => {
  // const { user } = useSelector((state) => state.auth);
  // const { post, postLoading, postError, postSuccess, postMessage } =
  //   useSelector((state) => state.album);
  // const dispatch = useDispatch();

  return (
    <div className="shadow-lg xl:w-[70%] mx-auto lg:w-[80%] md:w-[90%] w-[95%] bg-white rounded-md my-2">
      {/* Header */}
      <div className="flex p-3 justify-between items-center relative">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="w-[45px] h-[45px] bg-gray-200 border-gray-300 rounded-full border flex justify-center items-center">
              <FaUser size={25} className="text-gray-600" />
            </div>
          </div>
          <div>
            <h6 className="font-semibold text-sm">
              {user_id?.f_name} {user_id?.l_name}
            </h6>
            <div className="flex items-center gap-1">
              <div className="text-sm font-semibold text-gray-500">
                {new Date(createdAt).toLocaleDateString()}
              </div>
              <div className="text-sm h-[2px] w-[2px] rounded-full font-semibold bg-gray-500"></div>
              <div className="text-sm font-semibold text-gray-500">
                <FaGlobe />
              </div>
            </div>
          </div>
        </div>
        <div>
          <RxDotsHorizontal className="cursor-pointer relative" />
          {/* <OptionMenu /> */}
        </div>
      </div>

      {/* Caption */}
      <p className="text-gray-900 p-3 my-2 capitalize">{caption}</p>

      {/* Image or Background */}
      <div
        className="h-[400px] relative"
        style={{
          background: postImage
            ? `url(${postImage})`
            : background.image
            ? `url(${background.image})`
            : `linear-gradient(${background.startColor}, ${background.endColor})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Footer */}
      <div className="flex gap-2 p-3">
        <div className="flex justify-between w-full">
          <p className="text-gray-600 m-0">{comments?.length} comments</p>
        </div>
      </div>

      <hr className="bg-gray-300 h-[1px] border " />

      <div className="flex justify-between items-center p-3">
        <div className="flex gap-2 justify-center items-center w-full"></div>
        <div className="flex gap-2 justify-center items-center w-full"></div>
        <div className="flex gap-2 justify-center items-center w-full">
          <PiShareFat className="text-gray-600" />
          <h6 className="font-semibold text-sm text-gray-600">Share</h6>
        </div>
      </div>
    </div>
  );
};

export default GetPosts;
