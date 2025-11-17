import { connectOutsideProcessingDb } from "@/db/dbConfig";
import { getOutsideProcessingModel } from "@/models/outsideProcessing.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connectOutsideProcessingDb()
   

    try {
        const body = await request.json()
        const {itemName , quantity} = body

        const outsideProcessing = await getOutsideProcessingModel()
        const product = await outsideProcessing.create({
            itemName ,
            quantity
        })

        if(!product){
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({success: true , product: product , message: "product sent to outside"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error })
    }
}