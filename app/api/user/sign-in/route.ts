import { connectDb } from "@/db/dbConfig";
import User from "@/models/user.model";
import { signInSchema } from "@/schemas/signin.schema";
import { NextRequest, NextResponse } from "next/server";

const generateAccessAndRefreshToken = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User does not exist");

    const accessToken = (user as any).generateAccessToken();
    const refreshToken = (user as any).generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

export async function POST(request: NextRequest) {
    await connectDb();

    try {
        const { email, password } = signInSchema.parse(await request.json());

        //for postman params
        //   const url = new URL(request.url);
        //   const email = url.searchParams.get('email');
        //   const password = url.searchParams.get('password');


        console.log(email, password)
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "No user found" }, { status: 401 });
        }

        const isPasswordValid = await (user as any).isPasswordCorrect(password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id as string);

        // Prepare cookies properly
        const cookies = [
            `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=3600`,
            `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}`, // 7 days
        ].join(',');

        // Remove password from response
        const userData = user.toObject();
        console.log("user", userData)

        return Response.json(
            {
                statusCode: 200,
                message: "User logged in successfully",
                data: userData,
            },
            {
                status: 200,
                headers: {
                    "Set-Cookie": cookies,
                },
            }
        );
    } catch (error: unknown) {
        console.error("Error at sign-in:", error);

        let message = "Failed to sign in";
        if (error instanceof Error) message = error.message;

        return NextResponse.json({ error: message }, { status: 500 });
    }
}
