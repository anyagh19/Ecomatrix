import { connectOutsideProcessingDb } from "@/db/dbConfig";
import { getOutsideProcessingModel } from "@/models/outsideProcessing.model";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function GET(request: NextRequest) {
    await connectOutsideProcessingDb()

    try {
        const outsideProcessing = await getOutsideProcessingModel()
        const response = await outsideProcessing.find()
        if(!response){
            return NextResponse.json({status: 401 , message: "error in getting outside product"})
        }
        return NextResponse.json({status: 200 , success: true , data: response})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error})
    }
}