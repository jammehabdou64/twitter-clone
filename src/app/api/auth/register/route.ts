import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/connection";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "Password sholud be minimum of 6 characters",
          success: false,
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "Email alreday exist", success: false },
        { status: 400 }
      );
    }

    const salt: string = await bcrypt.genSalt(10);
    const hashPassword: string = await bcrypt.hash(password, salt);

    const ramdom = (): string => {
      return `${Math.random() * 1000}`;
    };

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      username: `${name.replace(/\s/g, "-")}-${ramdom()}`,
    });

    const save = await newUser.save();
    if (save) {
      const response = NextResponse.json(
        { message: "User added succesfully", success: true },
        { status: 201 }
      );
      const tokenData = {
        id: user?._id.toString(),
        name: user?.name,
        email: user?.email,
      };

      const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });
      response.cookies.set("token", token, {
        httpOnly: true,
      });

      return response;
    }
    return NextResponse.json(
      { message: "User not added", success: true },
      { status: 40 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
