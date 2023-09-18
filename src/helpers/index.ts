import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const isAuthenticated = (request: any) => {
  const token: string = request.cookies.get("token")?.value || "";
  return token ? true : false;
};
