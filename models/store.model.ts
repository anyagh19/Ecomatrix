import mongoose, { Schema, Document, models } from "mongoose";



export interface storeProductUpdateHistory {
    userName: string;
    date: Date;
    quantityAdded: number;
}

export interface storeProduct extends Document {
    _id : string;
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


const StoreProduct =models.StoreProduct ||  mongoose.model<storeProduct>("StoreProduct", storeProductSchema)
//const StoreProductUpdateHistory = mongoose.models.StoreProductUpdateHistory || mongoose.model<storeProductUpdateHistory>("StoreProductUpdateHistory", storeProductUpdateHistorySchema)

export { StoreProduct };