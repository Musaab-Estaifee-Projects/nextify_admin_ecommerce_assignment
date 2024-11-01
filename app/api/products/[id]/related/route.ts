import { NextRequest, NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import { connectToDatabase } from "@/lib/mongoose";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDatabase();

    // Find the product by its ID
    const product = await Product.findById(params.productId);

    // If the product is not found, return a 404 response
    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    // Fetch related products based on the same category or collections
    const relatedProducts = await Product.find({
      $or: [
        { category: product.category },
        { collections: { $in: product.collections } },
      ],
      _id: { $ne: product._id }, // Exclude the current product
    });

    // Return the related products in the response
    return NextResponse.json(relatedProducts, { status: 200 });
  } catch (err) {
    console.error("[related_GET]", err);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
