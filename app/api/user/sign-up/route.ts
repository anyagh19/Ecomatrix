import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    try {
        
    } catch (error: any) {
            return Response.json({error: error.message} , {status: 500})
    }
}