import { Schema, Connection } from "mongoose";
import { connectOutsideProcessingDb } from "@/db/dbConfig";

export interface FinalProduct {
  _id: string;
  name: string;
  requiredItems: {
    outsideId: string;       // relation to outsideProcessing product
    quantityNeeded: number;  // how many outside items needed to create this product
  }[];
  createdAt: string;
  updatedAt: string;
}

const FinalProductSchema = new Schema<FinalProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    requiredItems: [
      {
        outsideId: { type: String, required: true },
        quantityNeeded: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

let ProductModel: ReturnType<Connection["model"]> | null = null;

export const getFinalProductModel = async () => {
  const db = await connectOutsideProcessingDb();
  if (!ProductModel) {
    ProductModel =
      db.models.finalProduct ||
      db.model<FinalProduct>("finalProduct", FinalProductSchema);
  }
  return ProductModel;
};
