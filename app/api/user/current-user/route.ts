// app/api/user/current-user/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
 // adjust path to your db connection
import User from "@/models/user.model"; // adjust to your User model
import { connectDb } from "@/db/dbConfig";

export async function GET(request: NextRequest) {
  try {
    // 1️⃣ Get token from cookies
    const token = request.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { _id: string };
    if (!decoded?._id) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 3️⃣ Connect to DB
    await connectDb();

    // 4️⃣ Fetch user from DB
    const user = await User.findById(decoded._id).select("name email role");
    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    // 5️⃣ Return user
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Current user error:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
