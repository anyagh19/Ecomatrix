import { Document, Schema,  } from "mongoose";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    profileImage: string;
    role: string;
    isVerified: boolean;
    //verifyCode: string;
    verifyCodeExpiry: Date,
    refreshToken: string;
}

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        minlength: [8, "Email must be at least 8 characters long"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
    },
    address: {
        type: String,
        required: [true, "Address is Required"],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        unique: true,
        maxlength: [10, "Phone number must be 10 digits"],
    },
    profileImage: {
        type: String,
        required: [true, "Profile image is requird"],
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ["Admin", "Employee", "Worker"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    // verifyCode: {
    //     type: String,
    // },
    verifyCodeExpiry: {
        type: Date,
    },
    refreshToken: {
        type: String,
        default: null,
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }

    this.password = await bcryptjs.hash(this.password, 10)

    next()
})

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcryptjs.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
        expiresIn: ((process.env.ACCESS_TOKEN_EXPIRY as string) ||  '1h') as any
    })
}

userSchema.methods.generateRefreshToken = function(){
    //short lived accessed token
    return jwt.sign(
        {
            _id : this._id,

        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any
        }
    )
}

const User = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User" , userSchema);

export default User;