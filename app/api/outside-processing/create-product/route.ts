import { connectOutsideProcessingDb } from "@/db/dbConfig";
import { getFinalProductModel } from "@/models/finalProduct.model";
import { getOutsideProcessingModel } from "@/models/outsideProcessing.model";
import { NextRequest, NextResponse } from "next/server";

interface RequiredItem {
  itemName: string;
  quantityNeeded: number;
}

export async function POST(request: NextRequest) {
  await connectOutsideProcessingDb();

  try {
    const body = await request.json();

    const { productName, requiredItems } = body;

    if (!productName || !requiredItems || !requiredItems.length) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "productName and requiredItems are required",
      });
    }

    const outsideProcessing = await getOutsideProcessingModel();
    const ProductModel = await getFinalProductModel();

    const itemsWithIds = await Promise.all(
      requiredItems.map(async (item: RequiredItem) => {
        const outsideProduct = await outsideProcessing.findOne({
          itemName: item.itemName,
        });

        if (!outsideProduct) {
          throw new Error(`No product found with name: ${item.itemName}`);
        }

        return {
          outsideId: outsideProduct._id,
          quantityNeeded: item.quantityNeeded,
        };
      })
    );

    const productCheck = await ProductModel.findOne({ productName });
    if (productCheck) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Product already exists",
      });
    }

    const newProduct = await ProductModel.create({
      productName,
      requiredItems: itemsWithIds,
    });

    return NextResponse.json({
      status: 201,
      success: true,
      data: newProduct,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: error
    });
  }
}
