import { connectOutsideProcessingDb } from "@/db/dbConfig";
import { getOutsideProcessingModel, outsideProcessingProduct } from "@/models/outsideProcessing.model";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function  POST(request: NextRequest) {
    await connectOutsideProcessingDb();

    try {
        const body = await request.json()
        const  {objectId} = body

        const outsideModel = await getOutsideProcessingModel()

        const response = await outsideModel.findById(objectId) as outsideProcessingProduct
        if(!response){
        return NextResponse.json({message: "no outside product"})
        }

        return NextResponse.json({success: true , message: "outside product found " , status: 200 , data: response})
    } catch (error) {
        return NextResponse.json({error})
    }
}