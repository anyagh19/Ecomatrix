import { connectOutsideProcessingDb } from "@/db/dbConfig";
import { FinalProduct, getFinalProductModel } from "@/models/finalProduct.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connectOutsideProcessingDb();

    try {
        const body = await request.json()
        const {productName} = body

        const finalProductModel = await getFinalProductModel()
        const response = await finalProductModel.findOne({productName}) as FinalProduct
        if(!response){
            return NextResponse.json({message: "no product"})
        }

        return NextResponse.json({success: true , message: "found product ", status: 201 , data: response})
    } catch (error) {
        return NextResponse.json({error : error})
    }
}