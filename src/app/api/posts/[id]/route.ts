import { isAuthenticated } from "@/helpers";
import { NextRequest, NextResponse } from "next/server";

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
    // const { id } = await request.json();
    // const post = await Post.findById(id).populate(
    //   "author",
    //   "name email username"
    // );
    const req = await request.json();
    console.log(req);
    return NextResponse.json({
      message: "post",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.mesage }, { status: 500 });
  }
};
