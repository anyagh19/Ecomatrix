import { connectOutsideProcessingDb } from "@/db/dbConfig";
import { getFinalProductModel } from "@/models/finalProduct.model";
import { getOutsideProcessingModel } from "@/models/outsideProcessing.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connectOutsideProcessingDb()

    try {
        const body = await request.json()
        const { productName, requiredItems } = body

        const outsideProcessing = await getOutsideProcessingModel()
        const outsideProduct = await outsideProcessing.findOne()


        const ProductModel = await getFinalProductModel();

        const newProduct = await ProductModel.create({
            productName,
            requiredItems,
        });

        return NextResponse.json({
            status: 201,
            success: true,
            data: newProduct,
        });
    } catch (error) {
        return NextResponse.json({ error: error })
    }
}