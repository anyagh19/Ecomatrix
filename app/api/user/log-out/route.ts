import { connectAuthDb } from "@/db/dbConfig";
import { NextResponse } from "next/server";

export async function POST() {
  await connectAuthDb();
  try {
    const response = NextResponse.json(
      { message: "Cookie cleared" },
      { status: 200 }
    );

    // Properly clear cookie
    response.cookies.set("accessToken", "", { path: "/", maxAge: 0 });
    response.cookies.set("refreshToken", "", { path: "/", maxAge: 0 });

    return response;
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
