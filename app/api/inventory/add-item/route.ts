import { connectDb } from "@/db/dbConfig";
import { StoreProduct } from "@/models/store.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    await connectDb();

    try {
        const body = await request.json();
        const { itemName , userName , quantityAdded} = body

        if(!quantityAdded || !userName || !itemName){
            return NextResponse.json({message: "please enter quantity" , status: 502})
        }

        const product = await StoreProduct.findOne({itemName})

        if(!product){
            console.log("no product")
        }

        product.itemQuantity += quantityAdded;

        product.productUpdateHistory.push({
            userName,
            date: new Date(),
            quantityAdded,
        })

        await product.save()
        
        return NextResponse.json({
            success: true,
            message: "Product quantity updated successfully.",
            data: product,
          });
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "something went wrong" , status: 500})
    }
}