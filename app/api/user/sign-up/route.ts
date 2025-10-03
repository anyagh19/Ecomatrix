import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
    } catch (error: unknown) {
        let message = "Something went wrong";

        // Narrow unknown to Error
        if (error instanceof Error) {
            message = error.message;
        }
        return Response.json({ error: message }, { status: 500 })
    }
}