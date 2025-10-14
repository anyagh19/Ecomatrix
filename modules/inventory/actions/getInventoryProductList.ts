"use server";

import { connectInventoryDb } from "@/db/dbConfig";
import { StoreProduct } from "@/models/store.model";

export const getInventoryProduct = async () => {
  try {
    await connectInventoryDb(); // ensure DB connection
    const products = await StoreProduct.find();
    return products; // return the array directly
  } catch (error) {
    console.error("Error while getting products:", error);
    return []; // return empty array on error to avoid breaking UI
  }
};
