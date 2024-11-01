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

    const collection = await Collection.findById(params.id);

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("Collection_GET", error);
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

    let collection = await Collection.findById(params.id);

    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    collection = await Collection.findByIdAndUpdate(
      params.id,
      { title, description, image },
      // To return the updated object
      { new: true }
    );

    await collection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("CollectionId_POST", err);
    return new NextResponse("Internal error", { status: 500 });
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

    await Collection.findByIdAndDelete(params.id);

    await Product.updateMany(
      { collections: params.id },
      { $pull: { collections: params.id } }
    );

    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (error) {
    console.log("Collection_Delete", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
