import { connect } from "@/db/connection";
import { isAuthenticated } from "@/helpers";
import Post from "@/model/Post";
import { NextRequest, NextResponse } from "next/server";

connect();

export const PATCH = async (request: NextRequest) => {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        {
          message: "Unauthorize",
          success: false,
        },
        { status: 403 }
      );
    }

    const { postId, auth } = await request.json();

    const post = await Post.findById(postId);

    const index = post.likes?.findIndex(
      (like: any) => like?.user?.id === auth._id
    );

    if (index > -1) {
      post.likes.splice(index, 1);

      await post.save();

      const posts = await Post.find()
        .populate("author", "name email username")
        .sort({ createdAt: "desc" });

      return NextResponse.json({ message: posts, success: true });
    }

    const newLike = {
      name: auth?.name,
      id: auth?._id,
      username: auth?.username,
    };
    post.likes.unshift({ user: newLike });
    const saved = await post.save();

    if (saved) {
      const posts = await Post.find()

        .populate("author", "name email username")
        .sort({ createdAt: "desc" });

      return NextResponse.json({
        message: posts,
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
