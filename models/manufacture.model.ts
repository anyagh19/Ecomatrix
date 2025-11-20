import { connectManufacturedProductDb } from "@/db/dbConfig";
import { Connection, model, Schema } from "mongoose";


export interface manufacturedProduct {
    _id: string;
    productName: string;
    productQuantity: number;
}

const manufacturedProductSchema = new Schema<manufacturedProduct>(
    {
        productName: {
            type: String,
            required: true,
        },
        productQuantity:{
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

let manufacturedProductModel: ReturnType<Connection["model"]> | null = null;


export const getManufacturedProduct = async () => {
    const manufacturedProductDb = await connectManufacturedProductDb();
    if(!manufacturedProductModel){
        manufacturedProductModel = manufacturedProductDb.models.ManufacturedProduct || manufacturedProductDb.model<manufacturedProduct>("ManufacturedProduct" , manufacturedProductSchema)
    }

    return manufacturedProductModel;
}