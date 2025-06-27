import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import BasicModal from "./PostModal";

// Image URLs moved to constants for better maintainability
const POST_OPTIONS = [
  {
    icon: "https://static.xx.fbcdn.net/rsrc.php/v4/yr/r/c0dWho49-X3.png",
    text: "Live video",
  },
  {
    icon: "https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png",
    text: "Photo/video",
  },
  {
    icon: "https://static.xx.fbcdn.net/rsrc.php/v4/yd/r/Y4mYLVOhTwq.png",
    text: "Feeling/activity",
  },
];

const AddPost = () => {
  const { user } = useSelector((state) => state.auth);
  const [showPost, setShowPost] = useState(false);

  // Early return if no user (optional protection)
  if (!user) return null;

  return (
    <div className="w-[80%] mx-auto my-3">
      {/* Post Creation Card */}
      <div className="bg-white rounded-xl shadow-md p-4">
        {/* Post Input Trigger */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gray-200 border-2 border-gray-300 text-gray-500">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <FaUser size={18} />
            )}
          </div>
          <div className="w-full">
            <BasicModal />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-0 h-px bg-gray-300 my-2" />

        {/* Post Options */}
        <div className="grid grid-cols-3 gap-1">
          {POST_OPTIONS.map((option, index) => (
            <button
              key={index}
              className="flex items-center justify-center gap-2 p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
              onClick={() => setShowPost(true)}
            >
              <img
                src={option.icon}
                alt={option.text}
                className="h-5 w-5 object-contain"
              />
              <span className="text-sm font-medium">{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddPost;
