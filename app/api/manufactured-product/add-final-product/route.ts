import { getManufacturedProduct, manufacturedProduct } from "@/models/manufacture.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { productName, productQuantity } = body;

        if (!productName || productQuantity == null) {
            return NextResponse.json(
                { success: false, message: "productName and productQuantity are required" },
                { status: 400 }
            );
        }

        const ManufacturedProduct = await getManufacturedProduct();

        // Check if product exists
        const existing = await ManufacturedProduct.findOne({ productName }) as manufacturedProduct;

        if (existing) {
            const newQuantity = existing.productQuantity + productQuantity;
            const updated = await ManufacturedProduct.findOneAndUpdate(
                { productName },
                { $set: { productQuantity: newQuantity } },
                { new: true } // 🔥 returns updated document
            );

            return NextResponse.json(
                {
                    success: true,
                    message: "Product updated successfully",
                    data: updated,
                },
                { status: 200 }
            );
        }

        // Create new product
        const created = await ManufacturedProduct.create({
            productName,
            productQuantity,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Product created successfully",
                data: created,
            },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Server error",
                error,
            },
            { status: 500 }
        );
    }
}
