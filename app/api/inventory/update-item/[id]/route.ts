import {  connectInventoryDb } from "@/db/dbConfig";
import { getInventoryModel, storeProduct } from "@/models/store.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, context : { params: Promise<{ id: string }> }) {
    await connectInventoryDb();
    const resolvedParams = await context.params;
    const { id } = resolvedParams;

    try {
        const body = await request.json()
        // const {quantity , rate} = body

        const StoreProduct = await getInventoryModel();

        const updatedProduct = await StoreProduct.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        ) as storeProduct

        if (!updatedProduct) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        console.log("update eeror", error)
        return NextResponse.json({ error: error })
    }
}