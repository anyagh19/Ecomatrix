import {  connectInventoryDb } from "@/db/dbConfig";
import {getInventoryModel }from "@/models/store.model";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    await connectInventoryDb();

    try {
        const body = await request.json()
        const {itemName , itemRate , itemQuantity} = body
        if(!itemName || !itemRate || !itemQuantity) {
            return NextResponse.json(
                { success: false, message: "Please enter all required fields." },
                { status: 400 }
              );
        }

        const StoreProduct = await getInventoryModel();
        const createdProduct = await StoreProduct.create({
            itemName,
            itemRate,
            itemQuantity
        })

        if(!createdProduct){
            console.log("error in creating product")
        }

        return NextResponse.json({success: true, message: "product created", data: createdProduct , status: 200})
    } catch (error) {
        console.log("error while creating item", error)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}