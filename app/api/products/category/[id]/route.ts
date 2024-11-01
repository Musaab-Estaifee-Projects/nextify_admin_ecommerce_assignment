import Product from "@/lib/models/Product";
import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";


// GET request to retrieve all products by category
export const GET = async (
  req: NextRequest,
  { params }: { params: { category: string } }
) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Find products that match the specified category
    const products = await Product.find({ category: params.category });

    // If no products are found, return a 404 response
    if (products.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No products found for this category" }),
        { status: 404 }
      );
    }

    // Return the products in a JSON response with a 200 status code
    return new NextResponse(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching products by category:", err);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
