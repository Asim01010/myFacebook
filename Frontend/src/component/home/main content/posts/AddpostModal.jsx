import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { ClockLoader } from "react-spinners";
import {
  FaGift,
  FaImages,
  FaSmile,
  FaTimes,
  FaUser,
  FaUserTag,
  FaMapMarkerAlt,
  FaEllipsisH,
  FaImage,
} from "react-icons/fa";
import { RiGroupFill } from "react-icons/ri";
import { GoSmiley } from "react-icons/go";
import { IoChevronBackSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
// import { ClockLoader } from "react-spinners";
import { colors } from "./postdata/Postdata";
import { addPostData, postRest } from "../../../../features/post/postSlice";

export default function BasicModal({ handleClose }) {
  const [selectedColor, setSelectedColor] = useState({
    startColor: "#fff",
    endColor: "#fff",
    image: "",
  });
  const [media, setMedia] = useState(false);
  const [mediaSelected, setMediaSelected] = useState(false);
  const [changed, setChanged] = useState(false);
  const [caption, setCaption] = useState("");
  const [show, setShow] = useState(true);
  const [openColor, setOpenColor] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { postError, postSuccess, postMessage } = useSelector(
    (state) => state.album
  );

  useEffect(() => {
    caption.length > 0 || mediaSelected ? setShow(false) : setShow(true);
  }, [caption, mediaSelected]);

  useEffect(() => {
    if (postError) {
      toast.error(postMessage);
    }
    if (postSuccess) {
      toast.success("Posted successfully");
      setCaption("");
      setOpenColor(false);
      handleClose(); // close modal correctly
    }
    dispatch(postRest());
  }, [postError, postSuccess]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setImage(file);
      setMediaSelected(true);
    }
  };

  const uploadImage = async () => {
    try {
      setImageLoading(true);
      const data = new FormData();

      data.append("upload_preset", image); // ✅ set your Cloudinary upload preset
      data.append("cloud_name", "dxfieyp9g"); // ✅

      // data.append("file", image);
      // data.append("upload_preset", "dxfieyp9g");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dxfieyp9g/image/upload",
        data
      );

      setImageLoading(false);
      setImage(null);
      setImagePreview(null);
      setMedia(false);
      setMediaSelected(false);

      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed");
      setImageLoading(false);
      return "";
    }
  };

  const handleAddPost = async () => {
    let postImage = "";

    if (image) {
      postImage = await uploadImage();
    }

    const postData = {
      caption,
      background: selectedColor,
      user_id: user?._id,
      postImage,
    };

    dispatch(addPostData(postData));
  };

  return (
    <div
      onClick={handleClose}
      className="flex h-screen justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="xl:w-[30%] h-[600px] min-w-[500px] hide-scrollbar overflow-y-scroll bg-white shadow-md rounded-md relative"
      >
        <h4 className="text-center p-4 text-xl font-bold">Create Post</h4>
        <hr />

        {/* User info */}
        <div className="flex items-center gap-3 p-4">
          <div className="w-[45px] h-[45px] bg-gray-200 border rounded-full flex justify-center items-center">
            <FaUser size={25} className="text-gray-600" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-md font-semibold capitalize">{user?.f_name}</h4>
            <div className="flex bg-gray-200 items-center px-1 rounded-sm gap-1">
              <RiGroupFill size={10} />
              <p className="text-sm font-semibold">Friends</p>
            </div>
          </div>
        </div>

        {/* Caption and Background */}
        <div
          style={{
            backgroundImage:
              selectedColor.startColor === ""
                ? `url(${selectedColor?.image})`
                : `linear-gradient(${selectedColor.startColor}, ${selectedColor.endColor})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className={`w-full ${
            changed ? "h-[350px]" : media ? "h-[30px]" : "h-[200px]"
          } px-4 pb-4 relative text-[1.5rem] transition-all duration-150 outline-0 my-3`}
        >
          {show && (
            <p className="absolute text-gray-600 pointer-events-none">
              What's on your mind?{" "}
              <span className="capitalize">{user?.f_name}</span>
            </p>
          )}
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder=""
            style={{
              resize: "none",
              background: "transparent",
              width: "100%",
              outline: "none",
              border: "none",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          />
        </div>

        {/* Media upload */}
        {media && (
          <div className="p-4">
            <input
              onChange={handleImageChange}
              type="file"
              className="hidden"
              name="image"
              id="media"
            />
            <label htmlFor="media">
              <div className="h-[350px] p-2 rounded-xl border">
                <div className="relative h-full w-full bg-gray-100 rounded-md flex flex-col items-center justify-center text-center cursor-pointer">
                  <button
                    onClick={() => {
                      setMedia(false);
                      setImagePreview(null);
                      setMediaSelected(false);
                    }}
                    className="absolute top-3 right-3 bg-white border rounded-full p-2"
                  >
                    <FaTimes className="text-gray-600 text-sm" />
                  </button>
                  {mediaSelected ? (
                    <img src={imagePreview} width={"100%"} alt="preview" />
                  ) : (
                    <>
                      <div className="bg-gray-200 p-4 rounded-full mb-4">
                        <FaImages className="text-gray-700 text-2xl" />
                      </div>
                      <p className="text-black font-medium text-lg">
                        Add photos/videos
                      </p>
                      <p className="text-gray-500 text-sm">or drag and drop</p>
                    </>
                  )}
                </div>
              </div>
            </label>
          </div>
        )}

        {/* Post Add Icons */}
        <div className="px-5">
          <div className="flex justify-between border border-gray-300 rounded-lg px-4 py-4 bg-white">
            <span className="text-black font-medium">Add to your post</span>
            <div className="flex items-center space-x-4">
              <FaImage
                onClick={() => setMedia(true)}
                className="text-green-500 text-xl cursor-pointer"
              />
              <FaUserTag className="text-blue-500 text-xl cursor-pointer" />
              <FaSmile className="text-yellow-500 text-xl cursor-pointer" />
              <FaMapMarkerAlt className="text-red-500 text-xl cursor-pointer" />
              <FaGift className="text-teal-500 text-xl cursor-pointer" />
              <FaEllipsisH className="text-gray-600 text-xl cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Background picker */}
        <div className="flex p-4 justify-between items-center">
          {openColor ? (
            <>
              <div
                onClick={() => setOpenColor(false)}
                className="cursor-pointer bg-gray-300 flex justify-center items-center h-[32px] w-[32px] rounded-lg"
              >
                <IoChevronBackSharp size={20} />
              </div>
              <motion.div
                className="flex gap-2 ml-2"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                {colors.map((item, index) => (
                  <motion.div
                    key={index}
                    onClick={() => {
                      setSelectedColor(
                        index === 8
                          ? {
                              startColor: "",
                              endColor: "",
                              image: item?.image,
                            }
                          : {
                              startColor: item?.startColor,
                              endColor: item?.endColor,
                              image: "",
                            }
                      );
                      setChanged(index !== 0);
                    }}
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                    }}
                    className="h-[32px] w-[32px] rounded-lg border border-gray-200 shadow-lg cursor-pointer"
                    style={{
                      background:
                        index === 8
                          ? `url(${item?.image})`
                          : `linear-gradient(to right,${item?.startColor},${item?.endColor})`,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
                    }}
                  />
                ))}
              </motion.div>
            </>
          ) : (
            <img
              onClick={() => setOpenColor(true)}
              className="cursor-pointer h-[32px] w-[32px]"
              src="/menu_icons/picker.png"
              alt="background picker"
            />
          )}
          <GoSmiley size={30} className="text-gray-700 cursor-pointer" />
        </div>

        {/* Post Button */}
        <div className="p-4">
          <Button
            onClick={handleAddPost}
            disabled={show || imageLoading}
            variant="contained"
            style={{
              background: show || imageLoading ? "#99a1af" : "",
            }}
            className="w-full"
          >
            {imageLoading ? (
              <ClockLoader size={25} color="white" />
            ) : (
              "Add Post"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
