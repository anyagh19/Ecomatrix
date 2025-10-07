import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
    console.log("current" , token)
  if (!token) return NextResponse.json({ user: null });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { _id: string };
    // Optionally, fetch user from DB if you want more details
    console.log("decode", decoded)
    return NextResponse.json({ user: decoded });
  } catch {
    return NextResponse.json({ user: null });
  }
}
