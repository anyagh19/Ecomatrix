import { connectOutsideProcessingDb } from "@/db/dbConfig";
import { getFinalProductModel } from "@/models/finalProduct.model";
import { NextResponse } from "next/server";

export async function GET() {
    await connectOutsideProcessingDb()

    try {
        const finalProduct = await getFinalProductModel()
        const response = await finalProduct.find()
        if (!response) {
            return NextResponse.json({ message: "error in geting all final product" })
        }

        return NextResponse.json({success: true , message: "got tfinal products " , data: response})
    } catch (error) {
        return NextResponse.json({ message: "error in geting all final product" , error})
    }
}