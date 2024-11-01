// import { auth } from "@clerk/nextjs/server";
import Collection from "@/lib/models/Collection";
import { connectToDatabase } from "@/lib/mongoose";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    await connectToDatabase();

    const { title, description, image } = await req.json();

    // The title is unique
    const existingCollection = await Collection.findOne({ title });

    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 });
    }

    if (!title || !image) {
      return new NextResponse("Title || Image are required", {
        status: 400,
      });
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
      // userId,
    });

    await newCollection.save();

    return NextResponse.json(newCollection, { status: 201 });
  } catch (error) {
    console.log("Collection_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const collections = await Collection.find().sort({ createdAt: "desc" });

    return NextResponse.json(collections, { status: 200 });
  } catch (error) {
    console.log("Collection_GET", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// export const dynamic = "force-dynamic";