import { connectAuthDb } from "@/db/dbConfig";
import { getUserModel, IUser } from "@/models/user.model";
import { Model } from "mongoose";

import { NextRequest, NextResponse } from "next/server";


const generateAccessAndRefreshToken = async (UserModel:Model<IUser>, userId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User does not exist");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

export async function POST(request: NextRequest) {
    await connectAuthDb();

    try {
        const body = await request.json();
        const { email, password } = body
        console.log(email, password)
        const User = await getUserModel()
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "No user found" }, { status: 401 });
        }

        const isPasswordValid = await (user).isPasswordCorrect(password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(User , user._id as string);

        
        // Remove password from response
        const userData = user.toObject();
        //console.log("user", userData)

        const res = NextResponse.json(
            {
                success: true,
                statusCode: 200,
                message: "User logged in successfully",
                data: userData,
            },

        );
        // ✅ Set cookies the right way
        res.cookies.set({
            name: "accessToken",
            value: accessToken,
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production" ? true : false,
            maxAge: 60 * 60, // 1 hour
        });

        res.cookies.set({
            name: "refreshToken",
            value: refreshToken,
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production" ? true : false,
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return res;
    } catch (error: unknown) {
        console.error("Error at sign-in:", error);

        let message = "Failed to sign in";
        if (error instanceof Error) message = error.message;

        return NextResponse.json({ error: message }, { status: 500 });
    }
}
