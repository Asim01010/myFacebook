import React, { useEffect } from "react";
import AddPost from "./posts/AddPost";
import GetPost from "../ADDPOST/GetPost";
import { useDispatch, useSelector } from "react-redux";
import { getPostData, postRest } from "../../../features/post/postSlice";

const MainContent = () => {
  const dispatch = useDispatch();
  const { postLoading, postError, postSuccess, postMessage, post } =
    useSelector((state) => state.album);
  useEffect(() => {
    dispatch(getPostData());
    dispatch(postRest());
  }, []);
  return (
    <div>
      <AddPost />

      {post?.map((item, index) => {
        return <GetPost key={index} {...item} />;
      })}
    </div>
  );
};

export default MainContent;
