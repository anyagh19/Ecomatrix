
import { NextRequest, NextResponse } from "next/server";
import { uploadOnCloudinary } from "@/lib/cloudinary";
import path from "path";
import fs from "fs/promises";
import { connectAuthDb } from "@/db/dbConfig";
import { getUserModel } from "@/models/user.model";

const uploadDir = path.join(process.cwd(), "public/temp");

export async function POST(request: NextRequest) {
    await connectAuthDb();
    try {
        const formData = await request.formData();

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const role = formData.get("role") as string;
        const address = formData.get("address") as string;
        const phone = formData.get("phone") as string;
        const profileImage = formData.get("profileImage") as File;

        if (!profileImage) {
            return Response.json({ message: "Profile image is required" }, { status: 400 });
        }

        // check if user already exists
        const User = await getUserModel();
        const isUserExist = await User.findOne({ $or: [{ email }, { phone }] });
        if (isUserExist) {
            return Response.json({ message: "User already exists" }, { status: 400 });
        }

        // Convert File → Buffer
        const bytes = await profileImage.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save temporarily
        const tempFilePath = path.join(uploadDir, profileImage.name);
        await fs.writeFile(tempFilePath, buffer);

        // Upload to Cloudinary
        const cloudinaryUrl = await uploadOnCloudinary(tempFilePath);

        console.log(cloudinaryUrl)
        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role,
            address,
            phone,
            profileImage: cloudinaryUrl?.url,
        });

        return NextResponse.json({success: true, message: "User created successfully", user }, { status: 201 });
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
