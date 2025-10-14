// app/api/user/current-user/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
 // adjust path to your db connection
import { getUserModel } from "@/models/user.model"; // adjust to your User model
import { connectAuthDb } from "@/db/dbConfig";

export async function GET(request: NextRequest) {
  try {
    // 1️⃣ Get token from cookies
    const token = request.cookies.get("accessToken")?.value;
    console.log('to',token)
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { _id: string };
    console.log("de",decoded)
    if (!decoded?._id) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // 3️⃣ Connect to DB
    await connectAuthDb();

    // 4️⃣ Fetch user from DB
    const User = await getUserModel()
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
