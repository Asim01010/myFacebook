import React from "react";
import AddPost from "./posts/AddPost";
import GetPost from "../ADDPOST/GetPost";

const MainContent = () => {
  return (
    <div>
      <AddPost />
      <GetPost />
    </div>
  );
};

export default MainContent;
