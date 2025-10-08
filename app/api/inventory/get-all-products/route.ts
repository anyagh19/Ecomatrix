import { connectDb } from "@/db/dbConfig";
import { StoreProduct } from "@/models/store.model";
import {  NextResponse } from "next/server";

export async function GET() {
    await connectDb();

    try {
        const products = await StoreProduct.find()
        return NextResponse.json({message: 'got products', data: products})
    } catch (error) {
        console.log("error in getimg products", error)
        return NextResponse.json({message: "somethin wrong" , status: 500})
    }
}