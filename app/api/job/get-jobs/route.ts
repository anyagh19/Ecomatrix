import { connectJobDb } from "@/db/dbConfig";
import { getJobModel } from "@/models/job.model";
import { NextResponse } from "next/server";

export async function GET() {
    await connectJobDb()

    try {
        const Job = await getJobModel()
        const res = await Job.find()

        return NextResponse.json({sucess: true , data: res})
    } catch (error) {
        NextResponse.json({message: "error in getting job" , status: 501 , error: error})
        
    }
}