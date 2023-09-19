import { isAuthenticated } from "@/helpers";
import { getAuth } from "@/helpers/getAuth";
import Post from "@/model/Post";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
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

    const id = await getAuth(request);
    if (!id) {
      const response = NextResponse.json({
        message: "Authorization expired",
        success: false,
      });

      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      return response;
    }

    const user = await User.findById(id);
    const { comment, postId } = await request.json();

    const post = await Post.findById(postId);

    const newLike = {
      name: user?.name,
      id: user?._id,
      username: user?.username,
    };
    post.comments.unshift({ user: newLike, text: comment });
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
