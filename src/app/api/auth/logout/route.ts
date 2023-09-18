import { isAuthenticated } from "@/helpers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    if (isAuthenticated(request)) {
      const response = NextResponse.json({
        message: "Logout successfully",
        success: false,
      });

      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      return response;
    }

    return NextResponse.json(
      {
        message: "Unauthorize",
        success: false,
      },
      { status: 403 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error?.mesage }, { status: 500 });
  }
};
