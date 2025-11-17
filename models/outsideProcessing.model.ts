import { connectOutsideProcessingDb } from "@/db/dbConfig";
import { Connection, Schema } from "mongoose";

export interface outsideProcessingProduct {
    _id: string;
    itemName: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}

const OutsideProcessingProductScehma = new Schema<outsideProcessingProduct>(
    {
        itemName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)

let OutsideModel: ReturnType<Connection["model"]> | null = null

export const getOutsideProcessingModel = async () => {
    const ousideProcessingDb = await connectOutsideProcessingDb()
    if (!OutsideModel) {
        OutsideModel = ousideProcessingDb.models.Job || ousideProcessingDb.model<outsideProcessingProduct>("outsideProcessing", OutsideProcessingProductScehma);
    }
    return OutsideModel;
}