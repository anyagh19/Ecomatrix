import { connectInventoryDb } from "@/db/dbConfig";
import { getInventoryModel } from "@/models/store.model";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest , context: {params : Promise<{ id: string }>}) {
    await connectInventoryDb();
    const { id } = await context.params;
    try {
        const StoreProduct = await getInventoryModel();
        const product = await StoreProduct.findOne({_id: id});
        if (!product) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            )
        }
        return NextResponse.json({ success: true, data: product });
    } catch (error) {
        // console.error("Error while getting product:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}