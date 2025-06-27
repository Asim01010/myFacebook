import axios from "axios";

export const postService = async (userpost) => {
  response = await axios.post(
    `http://localhost:5000/add-post${userpost?.user_id}`,
    postData
  );
  return response;
};
