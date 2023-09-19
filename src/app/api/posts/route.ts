import { connect } from "@/db/connection";
import { isAuthenticated } from "@/helpers";
import { getAuth } from "@/helpers/getAuth";
import Post from "@/model/Post";
import { NextRequest, NextResponse } from "next/server";

connect();
export const GET = async (request: NextRequest) => {
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
    const posts = await Post.find({})
      .populate("author", "name email username")
      .sort({ createdAt: "desc" });
    return NextResponse.json({
      message: posts,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.mesage }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  //

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
    const post = new Post();
    const req = await request.json();

    if (req.text) {
      post.text = req.text;
      post.author = await getAuth(request);
      const savedPost = await post.save();
      const newPost = await Post.findById(savedPost?._id.toString()).populate(
        "author",
        "name email username"
      );
      return savedPost
        ? NextResponse.json(
            { message: newPost, success: true },
            { status: 201 }
          )
        : NextResponse.json(
            { message: "Post not added", success: false },
            { status: 500 }
          );
    }
  } catch (error: any) {
    NextResponse.json({ error: error?.message }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
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
    const { id } = await request.json();
    const post = await Post.findById(id).populate(
      "author",
      "name email username"
    );

    return NextResponse.json({
      message: post,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.mesage }, { status: 500 });
  }
};
