import { connectOutsideProcessingDb } from "@/db/dbConfig";
import { getOutsideProcessingModel, outsideProcessingProduct } from "@/models/outsideProcessing.model";
import mongoose, { FilterQuery } from "mongoose";
import {  NextRequest, NextResponse } from "next/server";


export async function POST(request : NextRequest) {
    await connectOutsideProcessingDb()

    try {
        const body = await request.json()
        const {cursor} = body

        const limit = 2
        const query : FilterQuery<outsideProcessingProduct> = {}
        if(cursor){
            query._id ={$gt: new mongoose.Types.ObjectId(cursor)}
        }

        const outsideProcessing = await getOutsideProcessingModel()
        const response = await outsideProcessing.find(query).limit(limit)
        if(!response){
            return NextResponse.json({status: 401 , message: "error in getting outside product"})
        }
        return NextResponse.json({status: 200 ,
             success: true , 
             data: response ,
            NextCursor: response[response.length -1]._id
            })
    } catch (error) {
        // console.log(error)
        return NextResponse.json({error: error})
    }
}