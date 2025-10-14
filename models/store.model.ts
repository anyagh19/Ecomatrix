import { connectInventoryDb } from "@/db/dbConfig";
import mongoose, { Schema, Document, models } from "mongoose";
import { Connection } from "mongoose";



export interface storeProductUpdateHistory {
    userName: string;
    date: Date;
    quantityAdded: number;
}

export interface storeProduct extends Document {
    _id: string;
    itemName: string;
    itemRate: number;
    itemQuantity: number;
    productUpdateHistory: storeProductUpdateHistory[];
    createdAt: Date;
    updatedAt: Date;
}

const storeProductUpdateHistorySchema: Schema<storeProductUpdateHistory> = new Schema({
    userName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    quantityAdded: {
        type: Number,
        required: true
    },
})

const storeProductSchema: Schema<storeProduct> = new Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemRate: {
        type: Number,
        required: true
    },
    itemQuantity: {
        type: Number,
        // required: true
    },
    productUpdateHistory: [storeProductUpdateHistorySchema]
},
    { timestamps: true })


let InventoryModel: ReturnType<Connection["model"]> | null = null;

export const getInventoryModel = async () => {
    const inventoryDb = await connectInventoryDb(); // ✅ call the function
    if (!InventoryModel) {
        InventoryModel =
            inventoryDb.models.storeProduct ||
            inventoryDb.model<storeProduct>("StoreProduct", storeProductSchema);
    }
    return InventoryModel;
};