import { connectOutsideProcessingDb } from "@/db/dbConfig";
import { getOutsideProcessingModel } from "@/models/outsideProcessing.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connectOutsideProcessingDb();

    try {
        const body = await request.json();
        const { itemName, newQuantity } = body;

        const outsideModel = await getOutsideProcessingModel();

        const updated = await outsideModel.findOneAndUpdate(
            { itemName },     // match by itemName
            { $set: { quantity: newQuantity } },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            message: "Quantity updated",
            status: 200,
            data: updated
        });
    } catch (error) {
        return NextResponse.json({ error });
    }
}
