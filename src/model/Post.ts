import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    likes: [
      {
        user: {
          id: { type: String },
          name: { type: String },
          username: { type: String },
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

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
