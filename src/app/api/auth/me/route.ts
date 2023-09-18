import { connect } from "@/db/connection";
import { isAuthenticated } from "@/helpers";
import { getAuth } from "@/helpers/getAuth";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (request: NextRequest) => {
  try {
    if (isAuthenticated(request)) {
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
      const user = await User.findOne({ _id: id }).select("-password");
      return NextResponse.json(
        { message: user, success: true },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Unauthorize",
        success: false,
      },
      { status: 403 }
    );
  } catch (error: any) {
    throw NextResponse.json({ error: error.message }, { status: 500 });
  }
};
