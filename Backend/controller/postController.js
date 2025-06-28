import { postModal } from "../models/postmodal.js";

export const postController = async (req, res) => {
  const { caption, background } = req.body;
  const { user_id } = req.params;

  if (!caption) {
    res.status(400);
    throw new Error("caption is not entered");
  }

  const newPost = await postModal.create({
    caption,
    // background,
    user_id,
  });
  res.send(newPost);
};

export const getPostController = async (req, res) => {
  const allPost = await postModal.find();
  res.send(allPost);
};
