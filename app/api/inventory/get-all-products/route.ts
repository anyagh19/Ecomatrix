import {  connectInventoryDb } from "@/db/dbConfig";
import { getInventoryModel } from "@/models/store.model";
import {  NextResponse } from "next/server";

export async function GET() {
    await connectInventoryDb();

    try {
        const StoreProduct = await getInventoryModel();
        const products = await StoreProduct.find()
        console.log('p',products)
        return NextResponse.json({message: 'got products', data: products})
    } catch (error) {
        console.log("error in getimg products", error)
        return NextResponse.json({message: "somethin wrong" , status: 500})
    }
}