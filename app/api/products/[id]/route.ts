import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDatabase } from "@/lib/mongoose";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDatabase();

    const product = await Product.findById(params.id).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("Product_GET", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDatabase();

    const product = await Product.findById(params.id);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      cost,
    } = await req.json();

    if (!title || !media || !description || !category || !price || !cost) {
      return new NextResponse("Not enough data to create a new product", {
        status: 400,
      });
    }

    // For newly added collections
    // included in new data, but not included in the previous data
    const addedCollections = collections.filter(
      (collectionId: string) => !product.collections.includes(collectionId)
    );

    // included in previous data, but not included in the new data
    const removedCollections = product.collections.filter(
      (collectionId: string) => !collections.includes(collectionId)
    );

    // Update collections
    await Promise.all([
      // Update added collections with this product
      ...addedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $push: { products: product._id },
        })
      ),

      // Update removed collections without this product
      ...removedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      ),
    ]);

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        description,
        media,
        category,
        collections,
        tags,
        sizes,
        colors,
        price,
        cost,
      },
      { new: true }
    ).populate({ path: "collections", model: Collection });

    await updatedProduct.save();

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.log("ProductId_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDatabase();

    const product = await Product.findById(params.id);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    await Product.findByIdAndDelete(product._id);

    // Update collections, Promise.all to update all the collections
    await Promise.all(
      product.collections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      )
    );

    return new NextResponse(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.log("ProductId_DELETE", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
