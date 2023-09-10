import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    likes: [
      {
        user: {
          id: { type: String },
          name: { type: String },
        },
      },
    ],
    comments: [
      {
        user: {
          id: { type: String },
          name: { type: String },
        },
        text: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.posts || mongoose.model("Post", PostSchema);
