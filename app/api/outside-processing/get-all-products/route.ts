import { connectOutsideProcessingDb } from "@/db/dbConfig";
import { getOutsideProcessingModel } from "@/models/outsideProcessing.model";
import {  NextResponse } from "next/server";


export async function GET() {
    await connectOutsideProcessingDb()

    try {
        const outsideProcessing = await getOutsideProcessingModel()
        const response = await outsideProcessing.find()
        if(!response){
            return NextResponse.json({status: 401 , message: "error in getting outside product"})
        }
        return NextResponse.json({status: 200 , success: true , data: response})
    } catch (error) {
        // console.log(error)
        return NextResponse.json({error: error})
    }
}