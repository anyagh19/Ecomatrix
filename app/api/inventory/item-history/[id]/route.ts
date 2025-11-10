import {  connectInventoryDb } from "@/db/dbConfig"
import { getInventoryModel, storeProduct } from "@/models/store.model";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request : NextRequest ,  context: { params: Promise<{ id: string }> }
) {
    await connectInventoryDb();

    const { id } = await context.params
    try {
        const StoreProduct = await getInventoryModel();
        const product = await StoreProduct.findOne(
            { _id : id }
        ) as storeProduct
        console.log("p", product.productUpdateHistory)
        if (!product) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: product.productUpdateHistory });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "erro in history", status: 500 })
    }
}