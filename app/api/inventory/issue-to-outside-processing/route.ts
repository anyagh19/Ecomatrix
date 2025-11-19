import { connectOutsideProcessingDb } from "@/db/dbConfig";
import { getOutsideProcessingModel, outsideProcessingProduct } from "@/models/outsideProcessing.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    await connectOutsideProcessingDb();

    try {
        const { itemName, quantity } = await request.json();

        if (!itemName || quantity === undefined) {
            return NextResponse.json(
                { success: false, message: "itemName and quantity are required" },
                { status: 400 }
            );
        }

        const OutsideProcessing = await getOutsideProcessingModel();

        // Check if product exists
        let product = await OutsideProcessing.findOne({ itemName }) as outsideProcessingProduct;

        if (product) {
            // Update quantity
            product.quantity += quantity; // increment existing quantity
            await OutsideProcessing.updateOne({ _id: product._id }, { $set: { quantity: product.quantity } });

            return NextResponse.json({
                success: true,
                product,
                message: "Product quantity updated",
            });
        } else {
            // Create new product
            let product = await OutsideProcessing.create({ itemName, quantity });

            return NextResponse.json({
                success: true,
                product,
                message: "Product created and sent to outside processing",
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
