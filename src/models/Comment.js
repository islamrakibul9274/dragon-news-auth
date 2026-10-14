import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    articleId: {
      type: String,
      required: true,
      index: true,
    },
    authorName: {
      type: String,
      required: true,
      default: "Anonymous Reader",
    },
    authorEmail: {
      type: String,
      default: "",
    },
    authorAvatar: {
      type: String,
      default: "/assets/user.png",
    },
    content: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
