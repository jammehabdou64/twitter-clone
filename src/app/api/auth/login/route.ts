import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connect } from "@/db/connection";
import jwt from "jsonwebtoken";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 400 }
      );
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user?._id.toString(),
    };

    const response = NextResponse.json(
      { message: "Login successfully", success: true },
      { status: 200 }
    );

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error?.mesage }, { status: 500 });
  }
};
