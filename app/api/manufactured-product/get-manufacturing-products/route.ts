import { connectManufacturedProductDb } from "@/db/dbConfig";
import { getManufacturedProduct, manufacturedProduct } from "@/models/manufacture.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { FilterQuery } from "mongoose";

export async function POST(req: NextRequest) {
    await connectManufacturedProductDb();

    try {
        const { cursor } = await req.json();

        const query: FilterQuery<manufacturedProduct>  = {};
        const limit = 2;

        if (cursor) {
            query._id = { $gt: new mongoose.Types.ObjectId(cursor) };
        }

        const Model = await getManufacturedProduct();
        const res = await Model.find(query).limit(limit);

        if (res.length === 0) {
            return NextResponse.json({
                success: false,
                message: "No products found",
                data: [],
            });
        }

        return NextResponse.json({
            success: true,
            message: "Products fetched",
            data: res,
            nextCursor: res[res.length - 1]._id, // for pagination
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: error },
            { status: 500 }
        );
    }
}
