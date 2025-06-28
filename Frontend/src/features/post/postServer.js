import axios from "axios";

export const postService = async (userpost) => {
  const response = await axios.post(
    `http://localhost:5000/add-post/${userpost?.user_id}`,
    {
      caption: userpost.caption,
      background: userpost.background,
    }
  );
  return response.data; // return only data, not full response
};

export const getPostService = async () => {
  const response = await axios.get("http://localhost:5000/get-all-posts");
  return response.data;
};
