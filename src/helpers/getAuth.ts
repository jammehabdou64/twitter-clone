import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getAuth = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decode: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decode?.id;
  } catch (error: any) {
    console.log({ verify: error.message });
  }
};
