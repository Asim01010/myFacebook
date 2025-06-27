import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    background: {
      startColor: {
        type: String,
        default: "#fff",
      },
      endColor: {
        type: String,
        default: "#fff",
      },
      image: {
        type: String,
        default: "",
      },
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "regUser",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const postModal = mongoose.model("post", postSchema);
